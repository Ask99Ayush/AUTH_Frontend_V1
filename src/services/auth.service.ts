import api from "../lib/api";

type LoginReq = { email: string; password: string };
type RegisterReq = { name:string; email: string; password: string };

const login = async (payload: LoginReq) => {
  const res = await api.post("/api/auth/login", payload);
  // server returns { success, data: { token, user } }
  return res.data.data;
};

const register = async (payload: RegisterReq) => {
  const res = await api.post("/api/auth/register", payload);
  return res.data.data;
};

export default { login, register };
