"use client";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { changeEmailUser } from "@/lib/server-actions/admin/user/post-data";
import { SubmitButton } from "@/components/ui/submit-button";
import { Checkbox } from "@/components/ui/checkbox";

function UserEmail({ user }) {
  const [modalOpen, setModalOpen] = useState(false);

  const [formState, submitAction] = useFormState(changeEmailUser, "");
  useEffect(() => {
    if (formState && formState.status === 200) setModalOpen(false);
  }, [formState]);

  return (
    <div className="text-lg text-gray-700 mb-4 flex justify-between">
      <div>
        <strong>email:</strong> {user.email}{" "}
      </div>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Cambiar email</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cambiar email del usuario</DialogTitle>
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
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="my-3">
                <Checkbox id="forceVerified" name="forceVerified" />
                <Label className="mx-3" htmlFor="forceVerified">
                  Dar la cuenta por verificada
                </Label>
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

export default UserEmail;
