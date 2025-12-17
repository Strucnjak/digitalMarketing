import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { format, formatDistanceToNow } from "date-fns";
import { getContactMessages } from "../lib/api";
import { useApiKey } from "../providers/apiKey";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Skeleton } from "../components/ui/skeleton";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { CopyButton } from "../components/admin/CopyButton";
import { CalendarRange, Download, Search } from "lucide-react";
import { toast } from "sonner";
import { logAuditEvent } from "../lib/audit";
import type { ContactMessage } from "../types/admin";
import { useSimpleQuery } from "../hooks/useSimpleQuery";

const REVIEW_KEY = "contact_reviewed";

export function ContactMessagesPage() {
  const { apiKey } = useApiKey();
  const [searchParams, setSearchParams] = useSearchParams();
  const [expanded, setExpanded] = useState<ContactMessage | null>(null);
  const [reviewed, setReviewed] = useState<Record<string, boolean>>(() => {
    if (typeof localStorage === "undefined") return {};
    try {
      return JSON.parse(localStorage.getItem(REVIEW_KEY) ?? "{}") as Record<string, boolean>;
    } catch {
      return {};
    }
  });

  const query = useSimpleQuery<ContactMessage[]>({
    queryKey: ["contact-messages", apiKey],
    queryFn: () => getContactMessages(apiKey ?? ""),
    enabled: Boolean(apiKey),
  });

  const filters = {
    q: searchParams.get("q") ?? "",
    from: searchParams.get("from"),
    to: searchParams.get("to"),
    sort: searchParams.get("sort") ?? "createdAt",
    dir: searchParams.get("dir") ?? "desc",
    page: Number(searchParams.get("page") ?? "1"),
    pageSize: Number(searchParams.get("pageSize") ?? "25"),
  };

  const filtered = useMemo(() => {
    const items = query.data ?? [];
    return items.filter((item: ContactMessage) => {
      const createdAt = new Date(item.createdAt).getTime();
      const matchesFrom = filters.from ? createdAt >= new Date(filters.from).getTime() : true;
      const matchesTo = filters.to ? createdAt <= new Date(filters.to).getTime() : true;
      const text = `${item.name} ${item.email} ${item.company ?? ""} ${item.message}`.toLowerCase();
      const matchesSearch = filters.q ? text.includes(filters.q.toLowerCase()) : true;
      return matchesFrom && matchesTo && matchesSearch;
    });
  }, [filters.from, filters.q, filters.to, query.data]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const base = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return filters.dir === "asc" ? -base : base;
    });
  }, [filtered, filters.dir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / filters.pageSize));
  const currentPage = Math.min(filters.page, totalPages);
  const paged = sorted.slice((currentPage - 1) * filters.pageSize, currentPage * filters.pageSize);

  useEffect(() => {
    if (typeof localStorage === "undefined") return;
    localStorage.setItem(REVIEW_KEY, JSON.stringify(reviewed));
  }, [reviewed]);

  const updateParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(searchParams.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
    logAuditEvent("table_filter_change", { route: "/contact-messages", key, value });
  };

  const handleExport = () => {
    const encode = (value: string) => `"${value.replace(/"/g, '""')}"`;
    const headers = ["id", "name", "email", "company", "phone", "message", "createdAt"].map(encode).join(",");
    const rows = sorted
      .map((item) =>
        [item.id, item.name, item.email, item.company ?? "", item.phone ?? "", item.message, item.createdAt]
          .map((value) => encode(String(value)))
          .join(",")
      )
      .join("\n");
    const csv = `${headers}\n${rows}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "contact-messages.csv";
    link.click();
    logAuditEvent("export_csv", { route: "/contact-messages", total: sorted.length });
    toast.success("Export ready");
  };

  const toggleReviewed = (id: string) => {
    setReviewed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Contact messages</h1>
          <p className="text-sm text-slate-600">All contact form submissions.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => query.refetch()}>
            Refresh
          </Button>
          <Button variant="secondary" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="space-y-3">
          <CardTitle className="text-base">Filters</CardTitle>
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative w-full md:max-w-xs">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search name, email, company, message"
                value={filters.q}
                onChange={(e) => updateParam("q", e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex flex-1 flex-wrap gap-2 text-sm text-slate-600">
              <label className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2">
                <CalendarRange className="h-4 w-4 text-slate-400" />
                <span>From</span>
                <Input type="date" value={filters.from ?? ""} onChange={(e) => updateParam("from", e.target.value || null)} className="w-[160px]" />
              </label>
              <label className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2">
                <CalendarRange className="h-4 w-4 text-slate-400" />
                <span>To</span>
                <Input type="date" value={filters.to ?? ""} onChange={(e) => updateParam("to", e.target.value || null)} className="w-[160px]" />
              </label>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {query.isLoading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, idx) => (
                <Skeleton key={idx} className="h-12 w-full" />
              ))}
            </div>
          ) : query.error ? (
            <Alert variant="destructive">
              <AlertDescription>Failed to load messages. Please retry.</AlertDescription>
              <Button className="mt-3" size="sm" onClick={() => query.refetch()}>
                Retry
              </Button>
            </Alert>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paged.map((row: ContactMessage) => (
                    <TableRow key={row.id} className="hover:bg-slate-50">
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <a href={`mailto:${row.email}`} className="text-blue-600 underline">
                            {row.email}
                          </a>
                          <CopyButton value={row.email} />
                        </div>
                      </TableCell>
                      <TableCell>{row.company ?? "—"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {row.phone ? (
                            <a href={`tel:${row.phone}`} className="text-blue-600 underline">
                              {row.phone}
                            </a>
                          ) : (
                            "—"
                          )}
                          {row.phone && <CopyButton value={row.phone} />}
                        </div>
                      </TableCell>
                      <TableCell>
                        <button
                          className="line-clamp-2 text-left text-sm text-slate-700 underline"
                          onClick={() => {
                            setExpanded(row);
                            logAuditEvent("detail_open", { route: "/contact-messages", id: row.id });
                          }}
                        >
                          {row.message}
                        </button>
                      </TableCell>
                      <TableCell title={format(new Date(row.createdAt), "PPpp")}>
                        <div className="text-sm">{formatDistanceToNow(new Date(row.createdAt))}</div>
                        <div className="text-xs text-slate-500">{format(new Date(row.createdAt), "PP p")}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant={reviewed[row.id] ? "secondary" : "outline"} size="sm" onClick={() => toggleReviewed(row.id)}>
                          {reviewed[row.id] ? "Reviewed" : "Mark reviewed"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
            <div>
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => updateParam("page", String(currentPage - 1))}>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => updateParam("page", String(currentPage + 1))}>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={Boolean(expanded)} onOpenChange={() => setExpanded(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message from {expanded?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 text-sm">
            <p className="text-slate-500">{expanded?.email}</p>
            <p>{expanded?.message}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
