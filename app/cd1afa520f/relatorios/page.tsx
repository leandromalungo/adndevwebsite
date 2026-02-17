"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Calendar, TrendingUp, Users, CreditCard, Activity } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function RelatoriosPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<"weekly" | "monthly">(
    "monthly"
  );

  const [metrics, setMetrics] = useState<any>(null);
  const [loadingMetrics, setLoadingMetrics] = useState(true);

  // 1. CAMADA: Monitoramento Real-Time (SaaS Dashboard)
  useEffect(() => {
    async function fetchMetrics() {
      try {
        const res = await fetch("/api/cd1afa520f/metrics", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("admin_token")}` // Ajustar conforme o sistema de auth real
          }
        });
        const data = await res.json();
        setMetrics(data);
      } catch (error) {
        console.error("Failed to fetch metrics", error);
      } finally {
        setLoadingMetrics(false);
      }
    }
    fetchMetrics();
  }, []);

  // Dados simulados ... [mantendo o resto conforme original]
  const userRegistrations = {
    weekly: [
      { period: "Semana 1 - Fev 2026", count: 45 },
      { period: "Semana 2 - Fev 2026", count: 52 },
      { period: "Semana 3 - Fev 2026", count: 38 },
    ],
    monthly: [
      { period: "Janeiro 2026", count: 234 },
      { period: "Dezembro 2025", count: 198 },
      { period: "Novembro 2025", count: 176 },
    ],
  };

  const systemLogs = [
    {
      id: "1",
      timestamp: "2026-02-14 19:30:00",
      level: "info",
      message: "Usuário admin@adndeveloper.com fez login",
    },
    {
      id: "2",
      timestamp: "2026-02-14 18:45:00",
      level: "warning",
      message: "Tentativa de login falhada para user@example.com",
    },
    {
      id: "3",
      timestamp: "2026-02-14 17:20:00",
      level: "info",
      message: "Nova assinatura criada: sub_12345",
    },
  ];

  const newsletters = [
    {
      id: "1",
      title: "Novidades de Fevereiro",
      sentDate: "2026-02-10",
      recipients: 1234,
      status: "sent" as const,
    },
    {
      id: "2",
      title: "Atualização de Cursos",
      sentDate: "2026-02-05",
      recipients: 1180,
      status: "sent" as const,
    },
    {
      id: "3",
      title: "Eventos da Semana",
      sentDate: null,
      recipients: 0,
      status: "pending" as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Relatórios & Métricas SaaS</h1>
        <p className="text-muted-foreground">
          Monitoramento em tempo real do ecossistema ADN Premium
        </p>
      </div>

      {/* Grid de Metricas SaaS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MRR (Recorrência Mensal)</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loadingMetrics ? "..." : `R$ ${metrics?.totalMRR?.toFixed(2) || "0,00"}`}
            </div>
            <p className="text-xs text-muted-foreground">+12.5% em relação ao mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assinantes Ativos</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loadingMetrics ? "..." : metrics?.totalSubscribers || 0}
            </div>
            <p className="text-xs text-muted-foreground">Base total de membros pagantes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Churn Rate (Cancelamentos)</CardTitle>
            <Activity className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loadingMetrics ? "..." : `${(metrics?.churnRate || 0).toFixed(1)}%`}
            </div>
            <p className="text-xs text-muted-foreground">Taxa de evasão mensal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">LTV Estimado (Lifetime Value)</CardTitle>
            <CreditCard className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loadingMetrics ? "..." : `R$ ${metrics?.lifetimeValue?.toFixed(2) || "0,00"}`}
            </div>
            <p className="text-xs text-muted-foreground">Valor médio gerado por cliente</p>
          </CardContent>
        </Card>
      </div>

      {/* Relatório de Cadastros */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Cadastros de Usuários</CardTitle>
          <div className="flex gap-2">
            <Button
              variant={selectedPeriod === "weekly" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod("weekly")}
            >
              Semanal
            </Button>
            <Button
              variant={selectedPeriod === "monthly" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod("monthly")}
            >
              Mensal
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Período</TableHead>
                <TableHead className="text-right">Cadastros</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userRegistrations[selectedPeriod].map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.period}</TableCell>
                  <TableCell className="text-right">{item.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Logs do Sistema */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Logs do Sistema</CardTitle>
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Filtrar por Data
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Nível</TableHead>
                <TableHead>Mensagem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {systemLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-sm">
                    {log.timestamp}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={log.level === "warning" ? "destructive" : "default"}
                    >
                      {log.level}
                    </Badge>
                  </TableCell>
                  <TableCell>{log.message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Relatório de Newsletters */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Newsletters</CardTitle>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Data de Envio</TableHead>
                <TableHead>Destinatários</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newsletters.map((newsletter) => (
                <TableRow key={newsletter.id}>
                  <TableCell className="font-medium">
                    {newsletter.title}
                  </TableCell>
                  <TableCell>
                    {newsletter.sentDate || "Não enviada"}
                  </TableCell>
                  <TableCell>{newsletter.recipients}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        newsletter.status === "sent" ? "default" : "secondary"
                      }
                    >
                      {newsletter.status === "sent" ? "Enviada" : "Pendente"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
