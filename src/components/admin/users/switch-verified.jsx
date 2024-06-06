"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import { verifiedUser } from "@/lib/server-actions/admin/user/post-data";

function SwitchVerified({ user }) {
  return (
    <p className="text-lg text-gray-700 mb-4 flex justify-between items-center">
      <strong>Verificado:</strong>
      <Switch
        className="ml-2"
        defaultChecked={user.isVerified}
        onClick={() => verifiedUser(user._id)}
      />
    </p>
  );
}

export default SwitchVerified;
