import UserApi from "@/interfaces/userApi";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        id: { label: "아이디", type: "text", placeholder: "아이디를 입력해주세요" },
        password: { label: "패스워드", type: "password", placeholder: "비밀번호를 입력해주세요" },
      },

      async authorize(credentials, req) {
        const userApi = new UserApi();

        const res = await userApi.login(credentials?.id, credentials?.password);
        if (!res.error) {
          return { id: res.data.id, name: res.data.name, email: res.data.id };
        } else {
          throw new Error(res.error.message);
        }
      },
    }),
  ],

  jwt: {
    maxAge: 60 * 60,
  },

  secret: process.env.SECRET,
});
