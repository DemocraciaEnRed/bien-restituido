import { fetchUsers } from "@/lib/server-actions/admin/user/fetch-data";
import UserTable from "../../../components/admin/users/user-table";

async function Usuarios() {
  const users = await fetchUsers();

  return (
    <>
      <h1 className="text-3xl font-bold mr-5 mb-5">Usuarios</h1>
      {users && <UserTable users={users} />}
    </>
  );
}

export default Usuarios;
