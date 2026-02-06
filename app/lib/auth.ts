import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const secretKey = process.env.JWT_SECRET || "super_secret_jwt_key_lingala_go_12345";
    const secret = new TextEncoder().encode(secretKey);
    const { payload } = await jwtVerify(token, secret);
    
    return {
       userId: payload.userId as string,
       email: payload.email as string,
       role: payload.role as string
    };
  } catch (error) {
    return null;
  }
}
