import { cookies } from "next/headers";
import { authTokenKey, userRoles } from "./constants";
import { decrypt } from "./sessions";
import { redirect } from "next/navigation";
import { User } from "@/lib/models";

export async function isAuthotized() {
  const session = cookies().get(authTokenKey)?.value;
  if (!session) return null
  const session1 = await decrypt(session)
  const user = await User.findById(session1._id)
  if (user.role !== userRoles.ADMIN) {
    redirect('/')
  }
}