import { getIronSession } from "iron-session";
import { authTokenKey } from "@/lib/utils/constants";
import { cookies } from "next/headers";
import { getSession } from "@/lib/server-actions/admin/user/auth-actions";

const page = async () => {
  const session = await getSession();
  /* 
  return <div>{session.username}</div>; */
};

export default page;
