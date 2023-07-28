import mysql from "mysql2";
import dbConfig from "../../configs/db";
import { IAddLikeEntity, ILikeId, ILikeIdEntity } from "../type/wishlist";

const connection = mysql.createConnection(dbConfig);

export default class LikeTableRepo {
  getLikeIdListByUserId(userId: string): Promise<ILikeId[]> {
    return new Promise((resolve) => {
      connection.query<ILikeIdEntity[]>(`SELECT like_id from like_table WHERE user_id=?`, [userId], (err, rows) => {
        if (err) throw err;
        resolve(rows);
      });
    });
  }
  addLike(userId: string, lensId: number): Promise<string> {
    return new Promise((resolve) => {
      connection.query<IAddLikeEntity[]>(
        `INSERT INTO like_table(user_id, like_id) VALUES("${userId}", "${lensId}")`,
        (err, rows) => {
          if (err) throw err;
          resolve("add");
        }
      );
    });
  }

  cancelLike(userId: string, lensId: number): Promise<string> {
    return new Promise((resolve) => {
      connection.query<IAddLikeEntity[]>(
        `DELETE from like_table WHERE user_id=? AND like_id=?`,
        [userId, lensId],
        (err, rows) => {
          if (err) throw err;
          resolve("cancel");
        }
      );
    });
  }

  deleteAllWishlist(userId: string): Promise<boolean> {
    return new Promise((resolve) => {
      connection.query(`DELETE from like_table WHERE user_id=?`, [userId], (err, rows) => {
        if (err) throw err;
        resolve(true);
      });
    });
  }
}
