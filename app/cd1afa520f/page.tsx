"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Se já estiver autenticado, redireciona
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/cd1afa520f");
    }
  }, [status, router]);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const result = await signIn("google", {
      callbackUrl: "/cd1afa520f",
      redirect: false,
    });

    if (result?.error) {
      setError("Acesso negado.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
            <Lock className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold uppercase">
            Painel Administrativo
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          <Button
            onClick={handleLogin}
            className="w-full"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar com Google"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
