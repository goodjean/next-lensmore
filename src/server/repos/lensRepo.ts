import mysql, { RowDataPacket } from "mysql2";
import dbConfig from "../../configs/db";
import {
  IBrands,
  IBrandsEntity,
  IDays,
  IDaysEntity,
  IBestLensItem,
  IBestLensItemEntity,
  ILensDetail,
  ILensDetailEntity,
} from "../type/lens";
import { IPromotion, IPromotionEntity } from "../type/promotion";
import { IHotKeywordEntity, IHotkeyword } from "../type/search";

const connection = mysql.createConnection(dbConfig); // 따로 파일 파기 //싱글톤
// mysql connection 싱글톤 // 구린 찜  알람 메세지 바꾸기 // 도커 vm
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

  getAllFilteredLensList(
    period: string[],
    color: number[],
    graphic: { min: number; max: number; isPositive: boolean }[],
    price: { min: number; max: number; isPositive: boolean }[],
    brand: number[]
  ): Promise<IBestLensItem[]> {
    return new Promise((resolve) => {
      if (!graphic[0].isPositive) {
        if (!price[0].isPositive) {
          connection.query<IBestLensItemEntity[]>(
            `SELECT id, name, price, img, reviewcount FROM lens WHERE period_classifi IN (${period.map(
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
              resolve(rows);
            }
          );
        } else {
          ///해야할것 graphic 소수점 고치기, 부정문 긍정문(posi, nega에 따른 between, not between, css, 원래 필터에 옮기기, brand페이지, 혹시 안되면 result페이지에 있는거 다 되돌리기)
          connection.query<IBestLensItemEntity[]>(
            `SELECT id, name, price, img FROM lens WHERE period_classifi IN (${period.map(
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
              resolve(rows);
            }
          );
        }
      } else if (!price[0].isPositive) {
        connection.query<IBestLensItemEntity[]>(
          `SELECT id, name, price, img FROM lens WHERE period_classifi IN (${period.map(
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
            resolve(rows);
          }
        );
      } else {
        connection.query<IBestLensItemEntity[]>(
          `SELECT id, name, price, img, reviewcount FROM lens WHERE period_classifi IN (${period.map(
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
            resolve(rows);
          }
        );
      }
    });
  }

  getFilteredLenslistByOffset(
    period: string[],
    color: number[],
    graphic: { min: number; max: number; isPositive: boolean }[],
    price: { min: number; max: number; isPositive: boolean }[],
    brand: number[],
    page: number,
    limit: number
  ): Promise<IBestLensItem[]> {
    return new Promise((resolve) => {
      if (!graphic[0].isPositive) {
        if (!price[0].isPositive) {
          connection.query<IBestLensItemEntity[]>(
            `SELECT id, name, price, img, reviewcount FROM lens WHERE period_classifi IN (${period.map(
              (p) => `"${p}"`
            )}) AND color_id IN (${color.map((c) => `"${c}"`)}) AND brand_id IN (${brand.map(
              (b) => `"${b}"`
            )}) AND price NOT BETWEEN cast(${price[0].min} as unsigned) AND cast(${
              price[0].max
            } as unsigned) AND lens.graphic NOT BETWEEN cast(${graphic[0].min} as unsigned) AND cast(${
              graphic[0].max
            } as unsigned) LIMIT ${limit} OFFSET ${(page - 1) * limit};`,
            (err, rows) => {
              if (err) throw err;
              resolve(rows);
            }
          );
        } else {
          ///해야할것 graphic 소수점 고치기, 부정문 긍정문(posi, nega에 따른 between, not between, css, 원래 필터에 옮기기, brand페이지, 혹시 안되면 result페이지에 있는거 다 되돌리기)
          connection.query<IBestLensItemEntity[]>(
            `SELECT id, name, price, img FROM lens WHERE period_classifi IN (${period.map(
              (p) => `"${p}"`
            )}) AND color_id IN (${color.map((c) => `"${c}"`)}) AND brand_id IN (${brand.map(
              (b) => `"${b}"`
            )}) AND price BETWEEN cast(${price[0].min} as unsigned) AND cast(${
              price[0].max
            } as unsigned) AND lens.graphic NOT BETWEEN cast(${graphic[0].min} as unsigned) AND cast(${
              graphic[0].max
            } as unsigned) LIMIT ${limit} OFFSET ${(page - 1) * limit};`,
            (err, rows) => {
              if (err) throw err;
              resolve(rows);
            }
          );
        }
      } else if (!price[0].isPositive) {
        connection.query<IBestLensItemEntity[]>(
          `SELECT id, name, price, img FROM lens WHERE period_classifi IN (${period.map(
            (p) => `"${p}"`
          )}) AND color_id IN (${color.map((c) => `"${c}"`)}) AND brand_id IN (${brand.map(
            (b) => `"${b}"`
          )}) AND price NOT BETWEEN cast(${price[0].min} as unsigned) AND cast(${
            price[0].max
          } as unsigned) AND lens.graphic BETWEEN cast(${graphic[0].min} as unsigned) AND cast(${
            graphic[0].max
          } as unsigned) LIMIT ${limit} OFFSET ${(page - 1) * limit};`,
          (err, rows) => {
            if (err) throw err;
            resolve(rows);
          }
        );
      } else {
        connection.query<IBestLensItemEntity[]>(
          `SELECT id, name, price, img, reviewcount FROM lens WHERE period_classifi IN (${period.map(
            (p) => `"${p}"`
          )}) AND color_id IN (${color.map((c) => `"${c}"`)}) AND brand_id IN (${brand.map(
            (b) => `"${b}"`
          )}) AND price BETWEEN cast(${price[0].min} as unsigned) AND cast(${
            price[0].max
          } as unsigned) AND lens.graphic BETWEEN cast(${graphic[0].min} as unsigned) AND cast(${
            graphic[0].max
          } as unsigned) LIMIT ${limit} OFFSET ${(page - 1) * limit};`,
          (err, rows) => {
            if (err) throw err;
            resolve(rows);
          }
        );
      }
    });
  }

  getLensitemListByKeywordByOffset(name: string, page: number, limit: number): Promise<IBestLensItem[]> {
    const query = "%" + name + "%";
    return new Promise((resolve) => {
      connection.query<IBestLensItemEntity[]>(
        `SELECT id, name, price, img, reviewcount FROM lens WHERE name LIKE ? LIMIT ${limit} OFFSET ${
          (page - 1) * limit
        };`,
        [query],
        (err, rows) => {
          if (err) throw err;
          resolve(rows);
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

  getLenslistByPeriodByOffset(period: string, page: number, limit: number): Promise<IBestLensItem[]> {
    return new Promise((resolve) => {
      connection.query<IBestLensItemEntity[]>(
        `SELECT id, name, price, img, reviewcount FROM lens WHERE period_classifi=? LIMIT ${limit} OFFSET ${
          (page - 1) * limit
        }`,
        [period],
        (err, rows) => {
          if (err) throw err;
          resolve(rows);
        }
      );
    });
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
