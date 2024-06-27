import { api } from "@/lib/axios";

export interface GetProfileResponse {
  user: { id: string; email: string; name: string };
}

export async function getProfile() {
  const response = await api.get<GetProfileResponse>("/me");

  return response.data;
}
