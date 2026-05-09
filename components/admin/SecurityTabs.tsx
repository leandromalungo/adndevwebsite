"use client";

import { useState } from "react";

type SecurityMetrics = {
  failed24h: number;
  failed7d: number;
  loginSuccess7d: number;
  failureRate24h: number;
  suspiciousIps: Array<{ ip: string; total: number }>;
  highRiskAccounts: Array<{ email: string; total: number }>;
  suspiciousSignupIps: Array<{ ip: string; total: number }>;
  signup24h: number;
  adminAccess24h: number;
  adminAccess7d: number;
  alertLevel: string;
  securityEvents: Array<{
    type: string;
    timestamp: string;
    email: string;
    ip: string;
    description: string;
  }>;
  totalEvents: number;
};

type Tab = "overview" | "ratelimits" | "attacks";

export function SecurityTabs({ metrics }: { metrics: SecurityMetrics }) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const rateLimitEvents = metrics.securityEvents.filter(
    (e) => e.type === "login_failed"
  );

  const attackTypes = new Map<string, number>();
  for (const event of rateLimitEvents) {
    const type = event.type === "login_failed" ? "Brute Force Login" : "Unknown";
    attackTypes.set(type, (attackTypes.get(type) ?? 0) + 1);
  }

  const attacksByIp = new Map<string, number>();
  for (const event of rateLimitEvents) {
    attacksByIp.set(event.ip, (attacksByIp.get(event.ip) ?? 0) + 1);
  }

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition ${
            activeTab === "overview"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Visão Geral
        </button>
        <button
          onClick={() => setActiveTab("ratelimits")}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition ${
            activeTab === "ratelimits"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Controle de Rate Limits
        </button>
        <button
          onClick={() => setActiveTab("attacks")}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition ${
            activeTab === "attacks"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Controle de Ataques
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <p className="text-xs text-gray-500">Falhas de login (24h)</p>
                <p
                  className={`mt-1 text-2xl font-semibold ${
                    metrics.failed24h >= 20
                      ? "text-red-700"
                      : "text-gray-900"
                  }`}
                >
                  {metrics.failed24h}
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <p className="text-xs text-gray-500">Falhas de login (7d)</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {metrics.failed7d}
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <p className="text-xs text-gray-500">Taxa de falha (24h)</p>
                <p
                  className={`mt-1 text-2xl font-semibold ${
                    metrics.failureRate24h >= 40
                      ? "text-red-700"
                      : "text-gray-900"
                  }`}
                >
                  {metrics.failureRate24h}%
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <p className="text-xs text-gray-500">IPs suspeitos</p>
                <p
                  className={`mt-1 text-2xl font-semibold ${
                    metrics.suspiciousIps.length > 5
                      ? "text-red-700"
                      : "text-gray-900"
                  }`}
                >
                  {metrics.suspiciousIps.length}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Rate Limits Tab */}
        {activeTab === "ratelimits" && (
          <div className="space-y-6">
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Bloqueios por Rate Limit (24h)
              </h3>
              <div className="space-y-3">
                {rateLimitEvents.length > 0 ? (
                  rateLimitEvents.slice(0, 10).map((event, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-lg border border-orange-100 bg-orange-50 px-3 py-3 text-sm"
                    >
                      <div className="flex-1">
                        <p className="font-mono font-semibold text-orange-900">
                          {event.email}
                        </p>
                        <p className="text-xs text-orange-700 mt-1">
                          IP: {event.ip}
                        </p>
                        <p className="text-xs text-orange-600 mt-0.5">
                          Quando:{" "}
                          {new Date(event.timestamp).toLocaleString("pt-BR")}
                        </p>
                      </div>
                      <div className="ml-3 rounded-full bg-orange-200 px-3 py-1 text-xs font-semibold text-orange-700">
                        Bloqueado
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    Sem bloqueios por rate limit no momento.
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Resumo de Rate Limits
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">
                    Bloqueios por Login (24h)
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-orange-700">
                    {rateLimitEvents.filter(
                      (e) =>
                        new Date(e.timestamp).getTime() >=
                        Date.now() - 24 * 60 * 60 * 1000
                    ).length}
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">
                    IPs Únicos Bloqueados (24h)
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-orange-700">
                    {new Set(
                      rateLimitEvents
                        .filter(
                          (e) =>
                            new Date(e.timestamp).getTime() >=
                            Date.now() - 24 * 60 * 60 * 1000
                        )
                        .map((e) => e.ip)
                    ).size}
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">
                    Emails Únicos Bloqueados (24h)
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-orange-700">
                    {new Set(
                      rateLimitEvents
                        .filter(
                          (e) =>
                            new Date(e.timestamp).getTime() >=
                            Date.now() - 24 * 60 * 60 * 1000
                        )
                        .map((e) => e.email)
                    ).size}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                IPs com Mais Bloqueios
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {Array.from(attacksByIp.entries())
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 10)
                  .map(([ip, count]) => (
                    <div
                      key={ip}
                      className="flex items-center justify-between rounded-lg border border-orange-100 bg-orange-50 px-3 py-2 text-sm"
                    >
                      <span className="font-mono text-orange-900">{ip}</span>
                      <span className="ml-2 rounded-full bg-orange-200 px-2 py-0.5 text-xs font-semibold text-orange-700">
                        {count} bloqueios
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Attacks Tab */}
        {activeTab === "attacks" && (
          <div className="space-y-6">
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Tipos de Ataques Detectados
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {Array.from(attackTypes.entries()).map(([type, count]) => (
                  <div
                    key={type}
                    className="rounded-lg border border-red-100 bg-red-50 p-3"
                  >
                    <p className="text-sm font-semibold text-red-900">{type}</p>
                    <p className="mt-1 text-2xl font-bold text-red-700">
                      {count}
                    </p>
                    <p className="text-xs text-red-600 mt-1">
                      tentativas detectadas
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Detalhes dos Ataques
              </h3>
              <div className="max-h-96 overflow-auto">
                <table className="w-full min-w-[700px] text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-gray-500">
                      <th className="py-2 pr-3 font-medium">Quando</th>
                      <th className="py-2 pr-3 font-medium">Email Alvo</th>
                      <th className="py-2 pr-3 font-medium">IP do Atacante</th>
                      <th className="py-2 pr-3 font-medium">Tipo de Ataque</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rateLimitEvents.length > 0 ? (
                      rateLimitEvents.slice(0, 20).map((event, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-red-100 bg-red-50/30"
                        >
                          <td className="py-2.5 pr-3 text-gray-700">
                            {new Date(event.timestamp).toLocaleString("pt-BR")}
                          </td>
                          <td className="py-2.5 pr-3 font-mono text-gray-900">
                            {event.email}
                          </td>
                          <td className="py-2.5 pr-3 font-mono text-gray-700">
                            {event.ip}
                          </td>
                          <td className="py-2.5 pr-3">
                            <span className="inline-flex rounded-full bg-red-200 px-2 py-0.5 text-xs font-semibold text-red-700">
                              Brute Force
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="py-3 text-gray-500" colSpan={4}>
                          Sem ataques registados.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Localizações de Ataque (IPs)
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {metrics.suspiciousIps.length > 0 ? (
                  metrics.suspiciousIps.map((item) => (
                    <div
                      key={item.ip}
                      className="flex items-center justify-between rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm"
                    >
                      <div className="flex-1">
                        <span className="font-mono font-semibold text-red-900">
                          {item.ip}
                        </span>
                      </div>
                      <span className="ml-2 rounded-full bg-red-200 px-2 py-0.5 text-xs font-semibold text-red-700">
                        {item.total} tentativas
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    Nenhuma localização de ataque registada.
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-lg border border-red-200 bg-red-50 p-4 md:p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-red-900 mb-3">
                Resumo de Ataques
              </h3>
              <ul className="space-y-2 text-sm text-red-800">
                <li>
                  Total de Tentativas de Ataque (24h): {rateLimitEvents.length}
                </li>
                <li>
                  IPs Únicos de Ataque: {metrics.suspiciousIps.length}
                </li>
                <li>
                  Contas Alvo (24h):{" "}
                  {
                    metrics.highRiskAccounts.filter(
                      (a) =>
                        rateLimitEvents.some(
                          (e) =>
                            e.email === a.email &&
                            new Date(e.timestamp).getTime() >=
                              Date.now() - 24 * 60 * 60 * 1000
                        )
                    ).length
                  }
                </li>
                <li>
                  Taxa de Falha: {metrics.failureRate24h}%
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
