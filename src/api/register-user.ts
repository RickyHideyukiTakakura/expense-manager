import { api } from "@/lib/axios";

export interface RegisterUserBody {
  name: string;
  email: string;
}

export async function registerUser({ name, email }: RegisterUserBody) {
  await api.post("/users", { name, email });
}
