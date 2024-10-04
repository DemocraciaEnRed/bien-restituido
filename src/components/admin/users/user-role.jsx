"use client";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { userRoles } from "@/lib/utils/constants";
import { changeRoleUser } from "@/lib/actions/admin/user/post-data";
import { SubmitButton } from "@/components/ui/submit-button";

function UserRole({ user }) {
  const [modalOpen, setModalOpen] = useState(false);

  const [formState, submitAction] = useFormState(changeRoleUser, "");
  useEffect(() => {
    if (formState && formState.status === 200) setModalOpen(false);
  }, [formState]);

  return (
    <div className="text-lg text-gray-700 mb-4 flex justify-between">
      <div>
        <strong>Rol:</strong> {user.role}
      </div>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Cambiar rol</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cambiar rol del usuario</DialogTitle>
          </DialogHeader>
          <div>
            <form action={submitAction}>
              <Input
                id="userId"
                name="userId"
                type="text"
                required
                className="hidden"
                defaultValue={user._id}
              />
              <div>
                <Label htmlFor="role" className="text-right">
                  Rol
                </Label>
                <Select name="role">
                  <SelectTrigger>
                    <SelectValue placeholder={user.role} />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(userRoles).map((rol) => (
                      <SelectItem key={rol} value={rol}>
                        {rol}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {formState && formState.status !== 200 && (
                <div className="text-red-500">
                  <p>{JSON.parse(formState).message}</p>
                </div>
              )}
              <div className="text-right">
                <SubmitButton text="guardar" />
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UserRole;
