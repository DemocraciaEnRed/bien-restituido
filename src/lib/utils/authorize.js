"use server"
import { verifySession } from "./sessions";
import { userRoles } from "./constants";
import { User } from "@/lib/models";

export async function isAdmin(userId) {
  const session = await verifySession()
  const user = await User.findById(session._id)
  if (user.role !== userRoles.ADMIN) {
    throw { status: 401, message: 'JWT - Unauthorized Access - User does not have the required role' }
  }
}