import { RowDataPacket } from "mysql2";

export interface ILoginResponse {
  id: string;
  name: string;
}

export interface IRegisterUserEntity extends RowDataPacket {
  user_id: string;
  password: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface IRegisterUser {
  user_id: string;
  password: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface IFoundUserEntity extends RowDataPacket {
  user_id: string;
}

export interface IFoundUser {
  user_id: string;
}

export interface ILoginUserEntity extends RowDataPacket {
  user_id: string;
  password: string;
  name: string;
}

export interface ILoginUser {
  user_id: string;
  password: string;
  name: string;
}

export interface IUserIdEntity extends RowDataPacket {
  user_id: string;
}

export interface IUserId {
  user_id: string;
}

export interface IUserWishlist {
  wishlist: string;
}

export interface IUserWishlistEntity extends RowDataPacket {
  wishlist: string;
}
