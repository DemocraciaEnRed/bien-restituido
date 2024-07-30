import EditUserForm from "@/components/admin/users/edit-user-form";
import React from "react";

function UserData({ user }) {
  return (
    <div className="flex justify-between">
      <p className="text-lg text-gray-700 mb-4">
        <strong>Información:</strong> {user.bio}
      </p>

      <div>
        <EditUserForm user={user} />
      </div>
    </div>
  );
}

export default UserData;
