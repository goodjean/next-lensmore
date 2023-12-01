import axios from "@/server/api/axios";
import { ICommonResponse } from "@/server/errs/erro";
// import axios from "axios";

export default class UserApi {
  async registerUser(
    id: string | undefined,
    pw: string | undefined,
    name: string | undefined
  ): Promise<ICommonResponse> {
    const res = await axios.post("/api/auth/signup", { id, pw, name });
    return res.data.result;
  }

  async login(id: string | undefined, pw: string | undefined): Promise<ICommonResponse> {
    const res = await axios.post("/api/auth/login", { id, pw });
    return res.data.result;
  }

  async getUserId(name: string | undefined | null) {
    try {
      const res = await axios({
        method: "post",
        url: "/auth/mypage",
        data: {
          name,
        },
      });
      return res.data.result;
    } catch (error) {
      throw error;
    }
  }
}
//이거 원인 무엇?
