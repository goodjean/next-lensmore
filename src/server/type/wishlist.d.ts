import { RowDataPacket } from "mysql2";

export interface ILikeId {
  like_id: number;
}
export interface ILikeIdEntity extends RowDataPacket {
  like_id: number;
}
export interface IAddLike {
  id: number;
  user_id: string;
  like_id: number;
}
export interface IAddLikeEntity extends RowDataPacket {
  id: number;
  user_id: string;
  like_id: number;
}
