import api from "./api";

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    interests: string[];
  };
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  interests: string[];
}

interface LoginPayload {
  email: string;
  password: string;
}

export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>("/auth/register", payload);
  return res.data;
}

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>("/auth/login", payload);
  return res.data;
}

