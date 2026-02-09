"use client";

import { useEffect, useState } from "react";
import { Subscription, getSubscriptions, toggleSubscriptionStatus } from "@/lib/admin-api/subscriptions";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchSubs = async () => {
      setLoading(true);
      try {
        const data = await getSubscriptions();
        setSubscriptions(data);
      } finally {
        setLoading(false);
      }
    };
    fetchSubs();
  }, []);

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    // Optimistic
    const newStatus = currentStatus === "active" ? "canceled" : "active";
    setSubscriptions(subs => subs.map(s => s.id === id ? { ...s, status: newStatus as any } : s));
    await toggleSubscriptionStatus(id);
  };

  const filteredSubs = filter === "all"
    ? subscriptions
    : subscriptions.filter(s => s.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Assinaturas</h2>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Gerenciar Planos</CardTitle>
            <div className="w-[180px]">
                <Select onValueChange={setFilter} defaultValue="all">
                    <SelectTrigger>
                        <SelectValue placeholder="Filtrar por Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="active">Ativos</SelectItem>
                        <SelectItem value="canceled">Cancelados</SelectItem>
                        <SelectItem value="expired">Expirados</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Plano</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Início</TableHead>
                  <TableHead>Fim</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                    <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">Carregando...</TableCell>
                    </TableRow>
                ) : filteredSubs.map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell>
                        <div className="font-medium">{sub.userName}</div>
                        <div className="text-sm text-muted-foreground">{sub.email}</div>
                    </TableCell>
                    <TableCell className="capitalize">{sub.plan}</TableCell>
                    <TableCell>{sub.amount}</TableCell>
                    <TableCell>
                      <Badge variant={sub.status === "active" ? "default" : "destructive"}>
                        {sub.status === "active" ? "Ativo" : sub.status === "canceled" ? "Cancelado" : "Expirado"}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(sub.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(sub.endDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                       <Button
                        variant={sub.status === "active" ? "destructive" : "outline"}
                        size="sm"
                        onClick={() => handleToggleStatus(sub.id, sub.status)}
                       >
                         {sub.status === "active" ? "Cancelar" : "Ativar"}
                       </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
