import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

const handler = async (req: any, res: any) => {
  try {
    return await NextAuth(req, res, authOptions)
  } catch (error) {
    console.error("NEXTAUTH CALLBACK ERROR:", error)
    throw error
  }
}

export { handler as GET, handler as POST }
