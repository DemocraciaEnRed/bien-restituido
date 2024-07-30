import { getSession } from "@/lib/server-actions/admin/user/auth-actions";

const page = async () => {
  const session = await getSession();
  /* 
  return <div>{session.username}</div>; */
};

export default page;
