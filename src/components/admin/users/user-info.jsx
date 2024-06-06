import React from "react";

import UserRole from "./user-role";
import SwitchVerified from "./switch-verified";
import UserData from "./user-data";
import UserEmail from "./user-email";
import UserPassword from "./user-password";

function UserInfo({ user }) {
  return (
    <div className="bg-white shadow-md rounded-lg px-6 py-6 w-full mx-auto">
      <UserEmail user={user} />
      <UserData user={user} />
      <UserRole user={user} />
      <SwitchVerified user={user} />
      {user.lastLogin && (
        <p className="text-lg text-gray-700 mb-4">
          <strong>Última vez conectado:</strong> {user.lastLogin}
        </p>
      )}
      <UserPassword user={user} />
    </div>
  );
}

export default UserInfo;
