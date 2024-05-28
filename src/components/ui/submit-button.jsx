"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./button";
import { Loader2 } from "lucide-react";

export function SubmitButton({ text }) {
  const status = useFormStatus();

  const handleClick = (event) => {
    if (status.pending) {
      event.preventDefault();
    }
  };
  return (
    <Button
      disabled={status.pending}
      type="submit"
      className="mt-4"
      onClick={handleClick}
    >
      {status.pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {text}
    </Button>
  );
}
