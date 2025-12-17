import { Database, Mail, MessagesSquare, Sparkles } from "lucide-react";
import { useMemo } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getContactMessages, getConsultations, getDatabaseStatus, getServiceInquiries } from "../lib/api";
import { useApiKey } from "../providers/ApiKeyProvider";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Skeleton } from "../components/ui/skeleton";
import { Alert, AlertDescription } from "../components/ui/alert";
function StatusPill({ status }: { status: "ok" | "error" | "loading" }) {
  const color = status === "ok" ? "bg-green-100 text-green-700" : status === "loading" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700";
  const label = status === "ok" ? "Connected" : status === "loading" ? "Checking" : "Error";
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${color}`}>{label}</span>;
}

function SummaryTile({ label, value, icon: Icon }: { label: string; value: number; icon: React.ElementType }) {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between pb-2">
        <CardTitle className="text-sm text-slate-500">{label}</CardTitle>
        <Icon className="h-4 w-4 text-slate-400" />
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
}

export function DashboardPage() {
  const { apiKey } = useApiKey();
  const statusQuery = useQuery({
    queryKey: ["database-status", apiKey],
    queryFn: () => getDatabaseStatus(apiKey ?? ""),
    enabled: Boolean(apiKey),
    staleTime: 60_000,
    refetchInterval: 60_000,
  });

  const contactQuery = useQuery({
    queryKey: ["contact-messages", apiKey],
    queryFn: () => getContactMessages(apiKey ?? ""),
    enabled: Boolean(apiKey),
  });
  const consultationQuery = useQuery({
    queryKey: ["consultations", apiKey],
    queryFn: () => getConsultations(apiKey ?? ""),
    enabled: Boolean(apiKey),
  });
  const serviceInquiryQuery = useQuery({
    queryKey: ["service-inquiries", apiKey],
    queryFn: () => getServiceInquiries(apiKey ?? ""),
    enabled: Boolean(apiKey),
  });

  const recentItems = useMemo(() => {
    const normalized: { id: string; name: string; type: string; createdAt: string }[] = [];
    (contactQuery.data ?? []).forEach((item) =>
      normalized.push({ id: item.id, name: item.name, type: "Contact", createdAt: item.createdAt }),
    );
    (consultationQuery.data ?? []).forEach((item) =>
      normalized.push({ id: item.id, name: item.fullName, type: "Consultation", createdAt: item.createdAt }),
    );
    (serviceInquiryQuery.data ?? []).forEach((item) =>
      normalized.push({ id: item.id, name: item.fullName, type: "Service inquiry", createdAt: item.createdAt }),
    );
    return normalized.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
  }, [contactQuery.data, consultationQuery.data, serviceInquiryQuery.data]);

  const anyError = Boolean(contactQuery.error || consultationQuery.error || serviceInquiryQuery.error);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-slate-600">Overview of inbound requests.</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700">
            <Database className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500">Database connectivity</p>
            <div className="flex items-center gap-2">
              <StatusPill
                status={statusQuery.isLoading ? "loading" : statusQuery.data?.status === "ok" ? "ok" : "error"}
              />
              {statusQuery.data?.message && (
                <span className="text-xs text-slate-500">{statusQuery.data.message}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryTile label="Contact messages" value={contactQuery.data?.length ?? 0} icon={Mail} />
        <SummaryTile label="Consultations" value={consultationQuery.data?.length ?? 0} icon={MessagesSquare} />
        <SummaryTile label="Service inquiries" value={serviceInquiryQuery.data?.length ?? 0} icon={Sparkles} />
        <SummaryTile label="Total" value={(contactQuery.data?.length ?? 0) + (consultationQuery.data?.length ?? 0) + (serviceInquiryQuery.data?.length ?? 0)} icon={Database} />
      </div>

      {anyError && (
        <Alert variant="destructive">
          <AlertDescription>Unable to load all data. Please retry later.</AlertDescription>
        </Alert>
      )}

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Recent activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {contactQuery.isLoading || consultationQuery.isLoading || serviceInquiryQuery.isLoading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, idx) => (
                <Skeleton key={idx} className="h-10 w-full" />
              ))}
            </div>
          ) : recentItems.length === 0 ? (
            <p className="text-sm text-slate-500">No recent activity.</p>
          ) : (
            <ul className="space-y-2">
              {recentItems.map((item) => (
                <li key={item.id} className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">{item.type}</Badge>
                    <div>
                      <p className="font-medium leading-tight">{item.name}</p>
                      <p className="text-xs text-slate-500" title={format(new Date(item.createdAt), "PPpp")}>
                        {formatDistanceToNow(new Date(item.createdAt))}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
