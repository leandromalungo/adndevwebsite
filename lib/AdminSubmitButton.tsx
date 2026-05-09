"use client";

import { useFormStatus } from "react-dom";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminSubmitButtonProps {
  label?: string;
  loadingLabel?: string;
}

export function AdminSubmitButton({ 
  label = "Publicar Agora", 
  loadingLabel = "A processar publicação..." 
}: AdminSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full gap-2 font-bold">
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {loadingLabel}
        </>
      ) : (
        <>
          <Send className="h-4 w-4" />
          {label}
        </>
      )}
    </Button>
  );
}