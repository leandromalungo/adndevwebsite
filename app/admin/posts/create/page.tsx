"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function CreatePostPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Nova Postagem</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalhes da Postagem</CardTitle>
          <CardDescription>
            Preencha os campos abaixo para criar um novo conteúdo.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Título</Label>
            <Input id="title" placeholder="Ex: O futuro da tecnologia..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="subject">Assunto</Label>
              <Input id="subject" placeholder="Ex: Desenvolvimento Web" />
            </div>
            <div className="grid gap-2">
               <Label htmlFor="country">País</Label>
               <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um país" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="br">Brasil</SelectItem>
                  <SelectItem value="pt">Portugal</SelectItem>
                  <SelectItem value="ao">Angola</SelectItem>
                  <SelectItem value="mz">Moçambique</SelectItem>
                  <SelectItem value="cv">Cabo Verde</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
             <Label htmlFor="type">Tipo de Conteúdo</Label>
             <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="article">Artigo</SelectItem>
                <SelectItem value="tutorial">Tutorial</SelectItem>
                <SelectItem value="news">Notícia</SelectItem>
                <SelectItem value="video">Vídeo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="content">Conteúdo</Label>
            <Textarea
              id="content"
              placeholder="Escreva o conteúdo aqui..."
              className="min-h-[200px]"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image">Imagem de Capa</Label>
            <Input id="image" type="file" />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button variant="outline">Cancelar</Button>
            <Button>Publicar Conteúdo</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
