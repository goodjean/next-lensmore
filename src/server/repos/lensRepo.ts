import { RowDataPacket } from "mysql2/promise";
import MysqlConnection from "../db/mysqlConnection";
// import mysql from "mysql2";
// import dbConfig from "../../configs/db";
import {
  IBrands,
  IBrandsEntity,
  IDays,
  IDaysEntity,
  IBestLensItem,
  IBestLensItemEntity,
  ILensDetail,
  ILensDetailEntity,
  ILensItemAndCountResult,
} from "../type/lens";
import { IPromotion, IPromotionEntity } from "../type/promotion";
import { IHotKeywordEntity, IHotkeyword } from "../type/search";

const connection = MysqlConnection.getConnection();
// const connection = mysql.createConnection(dbConfig); // 따로 파일 파기 //싱글톤
// // mysql connection 싱글톤 // 구린 찜  알람 메세지 바꾸기 // 도커 vm
export default class LensRepo {
  convertLensDetailPageEntityToDomainModel(lensDetailPageEntity: ILensDetailEntity[]): ILensDetail[] {
    return lensDetailPageEntity.map((ld) => ({
      id: ld.id,
      name: ld.name,
      color: ld.color,
      color_img: ld.color_img,
      price: ld.price,
      graphic: ld.graphic,
      detail_img: ld.detail_img,
      eye_thumbnail: ld.eye_thumbnail,
      model_thumbnail: ld.model_thumbnail,
      period: ld.period,
      reviewcount: ld.reviewcount,
      page_url: ld.page_url,
      brand: ld.ko_name,
    }));
  }

  getLensBrandList(): Promise<IBrands[]> {
    return new Promise((resolve) => {
      connection.query<IBrandsEntity[]>(`SELECT * FROM brands`, (err, rows) => {
        if (err) throw err;
        resolve(rows);
      });
    });
  }

  getLensDayList(): Promise<IDays[]> {
    return new Promise((resolve) => {
      connection.query<IDaysEntity[]>(`SELECT * FROM days`, (err, rows) => {
        if (err) throw err;
        resolve(rows);
      });
    });
  }

  getPromotionProductByPeriod(period: string): Promise<IPromotion[]> {
    return new Promise((resolve) => {
      connection.query<IPromotionEntity[]>(
        `SELECT id, name, model_thumbnail, period_classifi FROM lens WHERE period_classifi=?;`,
        [period],
        (err, rows) => {
          if (err) throw err;
          resolve(rows);
        }
      );
    });
  }

  getLenslistByPeriodAndBrand(period: string, brandId: number): Promise<IBestLensItem[]> {
    return new Promise((resolve) => {
      connection.query<IBestLensItemEntity[]>(
        `SELECT id, name, price, img, reviewcount FROM lens WHERE period_classifi=? AND brand_id=?;`,
        [period, brandId],
        (err, rows) => {
          if (err) throw err;
          resolve(rows);
        }
      );
    });
  }

  getHotSearchKeywords(): Promise<IHotkeyword[]> {
    return new Promise((resolve) => {
      connection.query<IHotKeywordEntity[]>("SELECT id, name, reviewcount FROM lens;", (err, rows) => {
        if (err) throw err;
        resolve(rows);
      });
    });
  }

  getLensDetailById(id: number): Promise<ILensDetail[]> {
    return new Promise((resolve) => {
      connection.query<ILensDetailEntity[]>(
        `SELECT lens.id, name, color, color_img, price, graphic, detail_img, eye_thumbnail, model_thumbnail, period, reviewcount, page_url, ko_name FROM lens LEFT JOIN brands ON lens.brand_id = brands.id WHERE lens.id=${id};`,
        (err, rows) => {
          if (err) throw err;
          resolve(this.convertLensDetailPageEntityToDomainModel(rows));
        }
      );
    });
  }

  // getListCountAndFilteredLenslistByOffset(
  //   period: string[],
  //   color: number[],
  //   graphic: { min: number; max: number; isPositive: boolean }[],
  //   price: { min: number; max: number; isPositive: boolean }[],
  //   brand: number[],
  //   page: number,
  //   size: number
  // ): Promise<ILensItemAndCountResult> {
  //   console.time("Query Execution Time Sequentially");
  //   return new Promise((resolve) => {
  //     if (!graphic[0].isPositive) {
  //       if (!price[0].isPositive) {
  //         connection.query<IBestLensItemEntity[]>(
  //           `SELECT id, name, price, img, reviewcount FROM lens WHERE period_classifi IN (${period.map(
  //             (p) => `"${p}"`
  //           )}) AND color_id IN (${color.map((c) => `"${c}"`)}) AND brand_id IN (${brand.map(
  //             (b) => `"${b}"`
  //           )}) AND price NOT BETWEEN cast(${price[0].min} as unsigned) AND cast(${
  //             price[0].max
  //           } as unsigned) AND lens.graphic NOT BETWEEN cast(${graphic[0].min} as unsigned) AND cast(${
  //             graphic[0].max
  //           } as unsigned) LIMIT ${size} OFFSET ${(page - 1) * size};`,
  //           (err, lensItems) => {
  //             if (err) throw err;

  //             connection.query<IBestLensItemEntity[]>(
  //               `SELECT COUNT(*) FROM lens WHERE period_classifi IN (${period.map(
  //                 (p) => `"${p}"`
  //               )}) AND color_id IN (${color.map((c) => `"${c}"`)}) AND brand_id IN (${brand.map(
  //                 (b) => `"${b}"`
  //               )}) AND price NOT BETWEEN cast(${price[0].min} as unsigned) AND cast(${
  //                 price[0].max
  //               } as unsigned) AND lens.graphic NOT BETWEEN cast(${graphic[0].min} as unsigned) AND cast(${
  //                 graphic[0].max
  //               } as unsigned);`,
  //               (err, rows) => {
  //                 if (err) throw err;

  //                 const totalCount = rows[0]["COUNT(*)"];

  //                 resolve({ lensItems, totalCount });
  //               }
  //             );
  //           }
  //         );
  //       } else {
  //         ///해야할것 graphic 소수점 고치기, 부정문 긍정문(posi, nega에 따른 between, not between, css, 원래 필터에 옮기기, brand페이지, 혹시 안되면 result페이지에 있는거 다 되돌리기)
  //         connection.query<IBestLensItemEntity[]>(
  //           `SELECT id, name, price, img FROM lens WHERE period_classifi IN (${period.map(
  //             (p) => `"${p}"`
  //           )}) AND color_id IN (${color.map((c) => `"${c}"`)}) AND brand_id IN (${brand.map(
  //             (b) => `"${b}"`
  //           )}) AND price BETWEEN cast(${price[0].min} as unsigned) AND cast(${
  //             price[0].max
  //           } as unsigned) AND lens.graphic NOT BETWEEN cast(${graphic[0].min} as unsigned) AND cast(${
  //             graphic[0].max
  //           } as unsigned) LIMIT ${size} OFFSET ${(page - 1) * size};`,
  //           (err, lensItems) => {
  //             if (err) throw err;

  //             connection.query<IBestLensItemEntity[]>(
  //               `SELECT COUNT(*) FROM lens WHERE period_classifi IN (${period.map(
  //                 (p) => `"${p}"`
  //               )}) AND color_id IN (${color.map((c) => `"${c}"`)}) AND brand_id IN (${brand.map(
  //                 (b) => `"${b}"`
  //               )}) AND price BETWEEN cast(${price[0].min} as unsigned) AND cast(${
  //                 price[0].max
  //               } as unsigned) AND lens.graphic NOT BETWEEN cast(${graphic[0].min} as unsigned) AND cast(${
  //                 graphic[0].max
  //               } as unsigned);`,
  //               (err, rows) => {
  //                 if (err) throw err;

  //                 const totalCount = rows[0]["COUNT(*)"];

  //                 resolve({ lensItems, totalCount });
  //               }
  //             );
  //           }
  //         );
  //       }
  //     } else if (!price[0].isPositive) {
  //       connection.query<IBestLensItemEntity[]>(
  //         `SELECT id, name, price, img FROM lens WHERE period_classifi IN (${period.map(
  //           (p) => `"${p}"`
  //         )}) AND color_id IN (${color.map((c) => `"${c}"`)}) AND brand_id IN (${brand.map(
  //           (b) => `"${b}"`
  //         )}) AND price NOT BETWEEN cast(${price[0].min} as unsigned) AND cast(${
  //           price[0].max
  //         } as unsigned) AND lens.graphic BETWEEN cast(${graphic[0].min} as unsigned) AND cast(${
  //           graphic[0].max
  //         } as unsigned) LIMIT ${size} OFFSET ${(page - 1) * size};`,
  //         (err, lensItems) => {
  //           if (err) throw err;

  //           connection.query<IBestLensItemEntity[]>(
  //             `SELECT COUNT(*) FROM lens WHERE period_classifi IN (${period.map(
  //               (p) => `"${p}"`
  //             )}) AND color_id IN (${color.map((c) => `"${c}"`)}) AND brand_id IN (${brand.map(
  //               (b) => `"${b}"`
  //             )}) AND price NOT BETWEEN cast(${price[0].min} as unsigned) AND cast(${
  //               price[0].max
  //             } as unsigned) AND lens.graphic BETWEEN cast(${graphic[0].min} as unsigned) AND cast(${
  //               graphic[0].max
  //             } as unsigned);`,
  //             (err, rows) => {
  //               if (err) throw err;

  //               const totalCount = rows[0]["COUNT(*)"];

  //               resolve({ lensItems, totalCount });
  //             }
  //           );
  //         }
  //       );
  //     } else {
  //       connection.query<IBestLensItemEntity[]>(
  //         `SELECT id, name, price, img, reviewcount FROM lens WHERE period_classifi IN (${period.map(
  //           (p) => `"${p}"`
  //         )}) AND color_id IN (${color.map((c) => `"${c}"`)}) AND brand_id IN (${brand.map(
  //           (b) => `"${b}"`
  //         )}) AND price BETWEEN cast(${price[0].min} as unsigned) AND cast(${
  //           price[0].max
  //         } as unsigned) AND lens.graphic BETWEEN cast(${graphic[0].min} as unsigned) AND cast(${
  //           graphic[0].max
  //         } as unsigned) LIMIT ${size} OFFSET ${(page - 1) * size};`,
  //         (err, lensItems) => {
  //           if (err) throw err;

  //           connection.query<IBestLensItemEntity[]>(
  //             `SELECT COUNT(*) FROM lens WHERE period_classifi IN (${period.map(
  //               (p) => `"${p}"`
  //             )}) AND color_id IN (${color.map((c) => `"${c}"`)}) AND brand_id IN (${brand.map(
  //               (b) => `"${b}"`
  //             )}) AND price BETWEEN cast(${price[0].min} as unsigned) AND cast(${
  //               price[0].max
  //             } as unsigned) AND lens.graphic BETWEEN cast(${graphic[0].min} as unsigned) AND cast(${
  //               graphic[0].max
  //             } as unsigned);`,
  //             (err, rows) => {
  //               if (err) throw err;

  //               const totalCount = rows[0]["COUNT(*)"];
  //               console.timeEnd("Query Execution Time Sequentially");

  //               resolve({ lensItems, totalCount });
  //             }
  //           );
  //         }
  //       );
  //     }
  //   });
  // }
  async getListCountAndFilteredLenslistByOffset(
    period: string[],
    color: number[],
    graphic: { min: number; max: number; isPositive: boolean }[],
    price: { min: number; max: number; isPositive: boolean }[],
    brand: number[],
    page: number,
    size: number
  ): Promise<ILensItemAndCountResult> {
    const getLensItemsByNN = () => {
      return new Promise<IBestLensItemEntity[]>((resolve) =>
        connection.query<IBestLensItemEntity[]>(
          `SELECT id, name, price, img, reviewcount FROM lens WHERE period_classifi IN (${period.map(
            (p) => `"${p}"`
          )}) AND color_id IN (${color.map((c) => `"${c}"`)}) AND brand_id IN (${brand.map(
            (b) => `"${b}"`
          )}) AND price NOT BETWEEN cast(${price[0].min} as unsigned) AND cast(${
            price[0].max
          } as unsigned) AND lens.graphic NOT BETWEEN cast(${graphic[0].min} as unsigned) AND cast(${
            graphic[0].max
          } as unsigned) LIMIT ${size} OFFSET ${(page - 1) * size};`,
          (err, lensItems) => {
            if (err) throw err;
            resolve(lensItems);
          }
        )
      );
    };

    const getTotalCountByNN = () => {
      return new Promise<number>((resolve) =>
        connection.query<IBestLensItemEntity[]>(
          `SELECT COUNT(*) FROM lens WHERE period_classifi IN (${period.map(
            (p) => `"${p}"`
          )}) AND color_id IN (${color.map((c) => `"${c}"`)}) AND brand_id IN (${brand.map(
            (b) => `"${b}"`
          )}) AND price NOT BETWEEN cast(${price[0].min} as unsigned) AND cast(${
            price[0].max
          } as unsigned) AND lens.graphic NOT BETWEEN cast(${graphic[0].min} as unsigned) AND cast(${
            graphic[0].max
          } as unsigned);`,
          (err, rows) => {
            if (err) throw err;
            resolve(rows[0]["COUNT(*)"]);
          }
        )
      );
    };

    const getLensItemsByPN = () => {
      return new Promise<IBestLensItemEntity[]>((resolve) =>
        connection.query<IBestLensItemEntity[]>(
          `SELECT id, name, price, img FROM lens WHERE period_classifi IN (${period.map(
            (p) => `"${p}"`
          )}) AND color_id IN (${color.map((c) => `"${c}"`)}) AND brand_id IN (${brand.map(
            (b) => `"${b}"`
          )}) AND price BETWEEN cast(${price[0].min} as unsigned) AND cast(${
            price[0].max
          } as unsigned) AND lens.graphic NOT BETWEEN cast(${graphic[0].min} as unsigned) AND cast(${
            graphic[0].max
          } as unsigned) LIMIT ${size} OFFSET ${(page - 1) * size};`,
          (err, lensItems) => {
            if (err) throw err;
            resolve(lensItems);
          }
        )
      );
    };
    const getTotalCountByPN = () => {
      return new Promise<number>((resolve) =>
        connection.query<IBestLensItemEntity[]>(
          `SELECT COUNT(*) FROM lens WHERE period_classifi IN (${period.map(
            (p) => `"${p}"`
          )}) AND color_id IN (${color.map((c) => `"${c}"`)}) AND brand_id IN (${brand.map(
            (b) => `"${b}"`
          )}) AND price BETWEEN cast(${price[0].min} as unsigned) AND cast(${
            price[0].max
          } as unsigned) AND lens.graphic NOT BETWEEN cast(${graphic[0].min} as unsigned) AND cast(${
            graphic[0].max
          } as unsigned);`,
          (err, rows) => {
            if (err) throw err;

            resolve(rows[0]["COUNT(*)"]);
          }
        )
      );
    };
    const getLensItemsByNP = () => {
      return new Promise<IBestLensItemEntity[]>((resolve) =>
        connection.query<IBestLensItemEntity[]>(
          `SELECT id, name, price, img FROM lens WHERE period_classifi IN (${period.map(
            (p) => `"${p}"`
          )}) AND color_id IN (${color.map((c) => `"${c}"`)}) AND brand_id IN (${brand.map(
            (b) => `"${b}"`
          )}) AND price NOT BETWEEN cast(${price[0].min} as unsigned) AND cast(${
            price[0].max
          } as unsigned) AND lens.graphic BETWEEN cast(${graphic[0].min} as unsigned) AND cast(${
            graphic[0].max
          } as unsigned) LIMIT ${size} OFFSET ${(page - 1) * size};`,
          (err, lensItems) => {
            if (err) throw err;
            resolve(lensItems);
          }
        )
      );
    };
    const getTotalCountByNP = () => {
      return new Promise<number>((resolve) =>
        connection.query<IBestLensItemEntity[]>(
          `SELECT COUNT(*) FROM lens WHERE period_classifi IN (${period.map(
            (p) => `"${p}"`
          )}) AND color_id IN (${color.map((c) => `"${c}"`)}) AND brand_id IN (${brand.map(
            (b) => `"${b}"`
          )}) AND price NOT BETWEEN cast(${price[0].min} as unsigned) AND cast(${
            price[0].max
          } as unsigned) AND lens.graphic BETWEEN cast(${graphic[0].min} as unsigned) AND cast(${
            graphic[0].max
          } as unsigned);`,
          (err, rows) => {
            if (err) throw err;

            resolve(rows[0]["COUNT(*)"]);
          }
        )
      );
    };

    const getLensItemsByPP = () => {
      return new Promise<IBestLensItemEntity[]>((resolve) =>
        connection.query<IBestLensItemEntity[]>(
          `SELECT id, name, price, img, reviewcount FROM lens WHERE period_classifi IN (${period.map(
            (p) => `"${p}"`
          )}) AND color_id IN (${color.map((c) => `"${c}"`)}) AND brand_id IN (${brand.map(
            (b) => `"${b}"`
          )}) AND price BETWEEN cast(${price[0].min} as unsigned) AND cast(${
            price[0].max
          } as unsigned) AND lens.graphic BETWEEN cast(${graphic[0].min} as unsigned) AND cast(${
            graphic[0].max
          } as unsigned) LIMIT ${size} OFFSET ${(page - 1) * size};`,
          (err, lensItems) => {
            if (err) throw err;
            resolve(lensItems);
          }
        )
      );
    };

    const getTotalCountByPP = () => {
      return new Promise<number>((resolve) =>
        connection.query<IBestLensItemEntity[]>(
          `SELECT COUNT(*) FROM lens WHERE period_classifi IN (${period.map(
            (p) => `"${p}"`
          )}) AND color_id IN (${color.map((c) => `"${c}"`)}) AND brand_id IN (${brand.map(
            (b) => `"${b}"`
          )}) AND price BETWEEN cast(${price[0].min} as unsigned) AND cast(${
            price[0].max
          } as unsigned) AND lens.graphic BETWEEN cast(${graphic[0].min} as unsigned) AND cast(${
            graphic[0].max
          } as unsigned);`,
          (err, rows) => {
            if (err) throw err;

            resolve(rows[0]["COUNT(*)"]);
          }
        )
      );
    };

    if (!graphic[0].isPositive) {
      if (!price[0].isPositive) {
        console.time("Query Execution Time");
        const [lensItems, totalCount] = await Promise.all([getLensItemsByNN(), getTotalCountByNN()]);
        console.timeEnd("Query Execution Time");
        return { lensItems, totalCount };
        //nn
      } else {
        ///해야할것 graphic 소수점 고치기, 부정문 긍정문(posi, nega에 따른 between, not between, css, 원래 필터에 옮기기, brand페이지, 혹시 안되면 result페이지에 있는거 다 되돌리기)
        //pn
        console.time("Query Execution Time");
        const [lensItems, totalCount] = await Promise.all([getLensItemsByPN(), getTotalCountByPN()]);
        console.timeEnd("Query Execution Time");
        return { lensItems, totalCount };
      }
    } else if (!price[0].isPositive) {
      //np
      console.time("Query Execution Time");
      const [lensItems, totalCount] = await Promise.all([getLensItemsByNP(), getTotalCountByNP()]);
      console.timeEnd("Query Execution Time");
      return { lensItems, totalCount };
    } else {
      //pp
      console.time("Query Execution Time");
      const [lensItems, totalCount] = await Promise.all([getLensItemsByPP(), getTotalCountByPP()]);
      console.timeEnd("Query Execution Time");
      return { lensItems, totalCount };
    }
  }

  getListCountAndLensitemListByKeywordByOffset(
    name: string,
    page: number,
    size: number
  ): Promise<ILensItemAndCountResult> {
    //promise all
    const query = "%" + name + "%";
    return new Promise((resolve) => {
      connection.query<IBestLensItemEntity[]>(
        `SELECT id, name, price, img, reviewcount FROM lens WHERE name LIKE ? LIMIT ${size} OFFSET ${
          (page - 1) * size
        };`,
        [query],
        (err, lensItems) => {
          if (err) throw err;

          connection.query(`SELECT COUNT(*) FROM lens WHERE name LIKE ?`, [query], (err, rows: RowDataPacket[]) => {
            if (err) throw err;

            const totalCount = rows[0]["COUNT(*)"];

            resolve({ lensItems, totalCount });
          });
        }
      );
    });
  }

  getLensAllCountByKeyword(name: string): Promise<number> {
    const query = "%" + name + "%";
    return new Promise((resolve) => {
      connection.query(`SELECT COUNT(*) FROM lens WHERE name LIKE ?`, [query], (err, rows: RowDataPacket[]) => {
        if (err) throw err;
        resolve(rows[0]["COUNT(*)"]);
      });
    });
  }

  getLensWishlist(wishlistId: number[]): Promise<IBestLensItem[]> {
    return new Promise((resolve) => {
      if (wishlistId.length > 0) {
        connection.query<IBestLensItemEntity[]>(
          `SELECT id, name, price, img, reviewcount FROM lens WHERE id IN (${wishlistId.map((w) => `"${w}"`)})`,
          (err, rows) => {
            if (err) throw err;
            resolve(rows);
          }
        );
      } else {
        resolve([]);
      }
    });
  }

  async getListCountAndLenslistByPeriodByOffset(
    period: string,
    page: number,
    size: number
  ): Promise<ILensItemAndCountResult> {
    const getLensItems = () => {
      return new Promise<IBestLensItemEntity[]>((resolve) => {
        connection.query<IBestLensItemEntity[]>(
          `SELECT id, name, price, img, reviewcount FROM lens WHERE period_classifi=? LIMIT ${size} OFFSET ${
            (page - 1) * size
          }`,
          [period],
          (err, lensItems) => {
            if (err) throw err;
            resolve(lensItems);
          }
        );
      });
    };

    const getTotalCount = () => {
      return new Promise<number>((resolve) => {
        connection.query(
          `SELECT COUNT(*) FROM lens WHERE period_classifi=?`,
          [period],
          (err, rows: RowDataPacket[]) => {
            if (err) throw err;
            resolve(rows[0]["COUNT(*)"]);
          }
        );
      });
    };

    try {
      console.time("Query Execution Time");

      const [lensItems, totalCount] = await Promise.all([
        getLensItems(),
        getTotalCount(),
        // getLensItems(),
        // getLensItems(),
        // getLensItems(),
      ]);
      // const lensItems = await getLensItems();
      // const totalCount = await getTotalCount();
      // const lensItems1 = await getLensItems();
      // const lensItems2 = await getLensItems();
      // const lensItems3 = await getLensItems();

      console.timeEnd("Query Execution Time");

      return { lensItems, totalCount };
    } catch (error) {
      throw error;
    }
  }

  getLenslistByPeriod(period: string): Promise<number> {
    return new Promise((resolve) => {
      connection.query(`SELECT COUNT(*) FROM lens WHERE period_classifi=?`, [period], (err, rows: RowDataPacket[]) => {
        if (err) throw err;
        resolve(rows[0]["COUNT(*)"]);
      });
    });
  }
}
