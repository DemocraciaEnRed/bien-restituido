import { verifySession } from "@/lib/utils/sessions";

const page = async () => {
  const session = await verifySession();
  /* 
  return <div>{session.username}</div>; */
};

export default page;
