"use client";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { editUser } from "@/lib/server-actions/admin/user/post-data";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function EditUserForm({ user }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [formMessage, submitAction] = useFormState(editUser, "");

  useEffect(() => {
    if (formMessage && formMessage.status === 200) setModalOpen(false);
  }, [formMessage]);

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Cambiar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Datos del usuario</DialogTitle>
        </DialogHeader>
        <form action={submitAction} className="px-6">
          <div>
            <Input
              id="userId"
              name="userId"
              type="text"
              required
              className="hidden"
              defaultValue={user._id}
            />
            <Label htmlFor="username">Nombre de usuario</Label>
            <Input
              id="username"
              name="username"
              type="text"
              required
              defaultValue={user.username}
            />
          </div>
          <div>
            <Label htmlFor="bio">biografia de usuario</Label>
            <Textarea
              id="bio"
              name="bio"
              type="textarea"
              required
              defaultValue={user.bio}
            />
          </div>
          {formMessage && formMessage.status !== 200 && (
            <div className="text-red-500">
              <p>{JSON.parse(formMessage).formMessage}</p>
            </div>
          )}
          <div className="text-right">
            <SubmitButton text="Enviar" />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditUserForm;
