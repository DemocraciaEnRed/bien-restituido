import React from "react";
import { fetchUserById } from "@/lib/server-actions/admin/user/fetch-data";
import UserInfo from "../_components/user/user-info";

async function User({ params: { id } }) {
  const user = await fetchUserById(id);
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center my-8">
        <span className="text-4xl font-bold text-gray-800">
          Usuario {user.username}
        </span>
      </div>
      <UserInfo user={user} />
    </div>
  );
}

export default User;
