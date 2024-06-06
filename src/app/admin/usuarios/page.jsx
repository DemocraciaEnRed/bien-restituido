import { fetchUsers } from "@/lib/server-actions/admin/user/fetch-data";
import UserTable from "./_components/user/user-table";

async function Usuarios() {
  const users = await fetchUsers();
  return (
    <>
      <div className="text-center">
        <h1 className="text-4xl">Usuarios</h1>
      </div>
      <UserTable users={users} />
    </>
  );
}

export default Usuarios;
