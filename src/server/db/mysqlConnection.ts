import mysql from "mysql2";
import dbConfig from "../../configs/db";

class MysqlConnection {
  private static instance: mysql.Connection;

  private constructor() {
    //외부 생성막기
  }

  static getConnection(): mysql.Connection {
    if (!MysqlConnection.instance) {
      MysqlConnection.instance = mysql.createConnection(dbConfig);
    }

    return MysqlConnection.instance;
  }
}

export default MysqlConnection;
