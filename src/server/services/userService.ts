import { hashPassword, verifyPassword } from "lib/auth";
import { ApiInstance, CommonError } from "../errs/error";
import UserRepo from "../repos/userRepo";
import { ILoginResponse, IUserId } from "../type/user";

export default class UserService {
  userRepo = new UserRepo();

  async registerUser(id: string, pw: string, name: string): Promise<boolean> {
    const userExisted = await this.userRepo.findRegisteredUser(id);

    if (userExisted) {
      throw new CommonError(409, "CONFLICT_EXCEPTION", "이미 존재하는 아이디입니다");
    }

    const hashedPw = await hashPassword(pw);

    const result = await this.userRepo.registerUser(id, hashedPw, name);
    if (result) {
      return true;
    } else {
      throw new CommonError(500, "KNOWN_EXCEPTION", "회원등록 실패");
    }
  }

  async login(id: string, pw: string): Promise<ILoginResponse> {
    const user = await this.userRepo.login(id);

    if (!user) {
      throw new CommonError(404, "NOTFOUND_EXCEPTION", "유저 아이디를 찾을 수 없습니다");
    }

    const isValid = await verifyPassword(pw, user.password);

    if (!isValid) {
      throw new CommonError(400, "BADPARAMETER_EXCEPTION", "잘못된 비밀번호 입니다");
    }

    return { id: user.user_id, name: user.name };
  }

  async getUserId(name: string): Promise<IUserId> {
    const res = await this.userRepo.getUserId(name);
    if (!res) {
      throw new ApiInstance(404, "not found 발생띠service");
    }

    return res;
  }
}
