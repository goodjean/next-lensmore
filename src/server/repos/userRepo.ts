import mysql, { OkPacket, RowDataPacket } from "mysql2";
import dbConfig from "../../configs/db";
import {
  IFoundUser,
  IFoundUserEntity,
  ILoginUser,
  ILoginUserEntity,
  IRegisterUser,
  IRegisterUserEntity,
  IUserId,
  IUserIdEntity,
} from "../type/user";

const connection = mysql.createConnection(dbConfig);

export default class UserRepo {
  registerUser(id: string, pw: string, name: string): Promise<IRegisterUser[]> {
    return new Promise((resolve) => {
      connection.query<IRegisterUserEntity[]>(
        `INSERT INTO user(user_id, password, name, created_at, updated_at) VALUES("${id}", "${pw}", "${name}", now(), now());`,
        (err, rows) => {
          if (err) throw err;
          resolve(rows);
        }
      );
    });
  }

  findRegisteredUser(id: string): Promise<IFoundUser> {
    return new Promise((resolve) => {
      connection.query<IFoundUserEntity[]>(`SELECT user_id FROM user WHERE user_id=?`, [id], (err, rows) => {
        if (err) throw err;
        resolve(rows[0]);
      });
    });
  }

  login(id: string): Promise<ILoginUser> {
    return new Promise((resolve) => {
      connection.query<ILoginUserEntity[]>(
        "SELECT user_id, password, name FROM user WHERE user_id=?",
        [id],
        (err, rows) => {
          if (err) throw err;
          resolve(rows[0]);
        }
      );
    });
  }

  getUserId(name: string): Promise<IUserId> {
    return new Promise((resolve) => {
      connection.query<IUserIdEntity[]>("SELECT user_id FROM user WHERE name=?", [name], (err, rows) => {
        if (err) throw err;
        resolve(rows[0]);
      });
    });
  }
}
