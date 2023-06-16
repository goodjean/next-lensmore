import { RowDataPacket } from "mysql2";

export interface IHotkeyword {
  id: number;
  name: string;
  reviewcount: number;
}
export interface IHotKeywordEntity extends RowDataPacket {
  id: number;
  name: string;
  reviewcount: number;
}
