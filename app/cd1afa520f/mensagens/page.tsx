// app/cd1afa520f/mensagens/page.tsx
// Página de envio de mensagens (Email e Telegram)

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sanitizeText, sanitizeUrl, isSafeString } from "@/lib/security";
import Image from "next/image";

export default function MensagensPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    link: "",
    image: null as File | null,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Erro",
          description: "A imagem deve ter no máximo 5MB",
          variant: "destructive",
        });
        return;
      }

      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, image: null });
    setImagePreview(null);
  };

  const handleSubmit = async (type: "email" | "telegram") => {
    // Validação básica
    if (!formData.title || !formData.subject) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    // Validação de segurança
    if (!isSafeString(formData.title) || !isSafeString(formData.subject)) {
      toast({
        title: "Erro",
        description: "Conteúdo inválido detectado",
        variant: "destructive",
      });
      return;
    }

    setLoading(true); // Keep as boolean, as `loading` state is boolean

    try {
      // Sanitiza dados antes de enviar
      const sanitizedData = {
        title: sanitizeText(formData.title),
        subject: sanitizeText(formData.subject),
        link: formData.link ? sanitizeUrl(formData.link) : "",
        // Image will be sent separately if it exists, not directly in JSON
        type, // Renamed from channel to type
      };

      const formDataToSend = new FormData();
      formDataToSend.append("title", sanitizedData.title);
      formDataToSend.append("subject", sanitizedData.subject);
      formDataToSend.append("link", sanitizedData.link);
      formDataToSend.append("channel", sanitizedData.type); // Use 'channel' for backend compatibility
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const response = await fetch("/api/cd1afa520f/messages/send", {
        method: "POST",
        body: formDataToSend, // Send as FormData for file upload
      });

      if (response.ok) {
        toast({
          title: "Sucesso!",
          description: `Mensagem enviada via ${type === "email" ? "Email" : "Telegram"}`,
        });
        // Limpa o formulário
        setFormData({ title: "", subject: "", link: "", image: null });
        setImagePreview(null);
      } else {
        const error = await response.json();
        throw new Error(error.message || "Erro ao enviar mensagem");
      }
    } catch (error) {
      toast({
        title: "Erro",
        description:
          error instanceof Error ? error.message : "Erro ao enviar mensagem",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mensagens</h1>
        <p className="text-muted-foreground">
          Envie mensagens para os usuários via Email ou Telegram
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Nova Mensagem</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Título */}
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              placeholder="Digite o título da mensagem"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {/* Assunto */}
          <div className="space-y-2">
            <Label htmlFor="subject">Assunto *</Label>
            <Textarea
              id="subject"
              placeholder="Digite o assunto da mensagem"
              rows={4}
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
            />
          </div>

          {/* Upload de Imagem */}
          <div className="space-y-2">
            <Label htmlFor="image">Imagem (opcional)</Label>
            {imagePreview ? (
              <div className="relative inline-block">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={300}
                  height={200}
                  className="rounded border border-border object-cover"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute -right-2 -top-2"
                  onClick={removeImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById("image")?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Selecionar Imagem
                </Button>
                <span className="text-sm text-muted-foreground">
                  Máximo 5MB
                </span>
              </div>
            )}
          </div>

          {/* Link */}
          <div className="space-y-2">
            <Label htmlFor="link">Link (opcional)</Label>
            <Input
              id="link"
              type="url"
              placeholder="https://exemplo.com"
              value={formData.link}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
              }
            />
          </div>

          {/* Botões de Envio */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={() => handleSubmit("email")}
              disabled={loading}
              className="flex-1"
            >
              <Mail className="mr-2 h-4 w-4" />
              {loading ? "Enviando..." : "Enviar por Email"}
            </Button>
            <Button
              onClick={() => handleSubmit("telegram")}
              disabled={loading}
              variant="outline"
              className="flex-1"
            >
              <Send className="mr-2 h-4 w-4" />
              {loading ? "Enviando..." : "Enviar por Telegram"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
