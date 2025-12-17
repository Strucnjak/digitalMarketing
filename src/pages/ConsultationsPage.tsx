import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format, formatDistanceToNow } from "date-fns";
import { getConsultations } from "../lib/api";
import { useApiKey } from "../providers/ApiKeyProvider";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Skeleton } from "../components/ui/skeleton";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../components/ui/sheet";
import { Badge } from "../components/ui/badge";
import { CalendarRange, Search, SlidersHorizontal } from "lucide-react";
import type { Consultation } from "../types/admin";
import { logAuditEvent } from "../lib/audit";

function parseServices(value?: string) {
  if (!value) return [] as string[];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

export function ConsultationsPage() {
  const { apiKey } = useApiKey();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState<Consultation | null>(null);

  const query = useQuery({
    queryKey: ["consultations", apiKey],
    queryFn: () => getConsultations(apiKey ?? ""),
    enabled: Boolean(apiKey),
  });

  const filters = {
    preferredContact: searchParams.get("preferredContact") ?? "",
    newsletter: searchParams.get("newsletter") ?? "",
    q: searchParams.get("q") ?? "",
    from: searchParams.get("from"),
    to: searchParams.get("to"),
    page: Number(searchParams.get("page") ?? "1"),
    pageSize: Number(searchParams.get("pageSize") ?? "25"),
  };

  const filtered = useMemo(() => {
    return (query.data ?? []).filter((item) => {
      const createdAt = new Date(item.createdAt).getTime();
      const matchesFrom = filters.from ? createdAt >= new Date(filters.from).getTime() : true;
      const matchesTo = filters.to ? createdAt <= new Date(filters.to).getTime() : true;
      const matchesContact = filters.preferredContact
        ? (item.preferredContact ?? "").toLowerCase() === filters.preferredContact.toLowerCase()
        : true;
      const matchesNewsletter = filters.newsletter
        ? String(Boolean(item.newsletter)) === filters.newsletter
        : true;
      const text = `${item.goals ?? ""} ${item.challenges ?? ""}`.toLowerCase();
      const matchesSearch = filters.q ? text.includes(filters.q.toLowerCase()) : true;
      return matchesFrom && matchesTo && matchesContact && matchesNewsletter && matchesSearch;
    });
  }, [filters.from, filters.newsletter, filters.preferredContact, filters.q, filters.to, query.data]);

  const sorted = useMemo(
    () => [...filtered].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [filtered],
  );

  const totalPages = Math.max(1, Math.ceil(sorted.length / filters.pageSize));
  const currentPage = Math.min(filters.page, totalPages);
  const paged = sorted.slice((currentPage - 1) * filters.pageSize, currentPage * filters.pageSize);

  const updateParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(searchParams.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next, { replace: true });
    logAuditEvent("table_filter_change", { route: "/consultations", key, value });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Consultations</h1>
          <p className="text-sm text-slate-600">Discovery call submissions.</p>
        </div>
      </div>

      <Card>
        <CardHeader className="space-y-3">
          <CardTitle className="text-base">Filters</CardTitle>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search goals or challenges"
                value={filters.q}
                onChange={(e) => updateParam("q", e.target.value)}
                className="pl-9"
              />
            </div>
            <Input
              placeholder="Preferred contact"
              value={filters.preferredContact}
              onChange={(e) => updateParam("preferredContact", e.target.value)}
            />
            <select
              value={filters.newsletter}
              onChange={(e) => updateParam("newsletter", e.target.value || null)}
              className="h-11 rounded-md border border-slate-200 bg-white px-3 text-sm"
            >
              <option value="">Newsletter?</option>
              <option value="true">Subscribed</option>
              <option value="false">Not subscribed</option>
            </select>
            <div className="flex gap-2">
              <Input
                type="date"
                value={filters.from ?? ""}
                onChange={(e) => updateParam("from", e.target.value || null)}
                className="flex-1"
              />
              <Input
                type="date"
                value={filters.to ?? ""}
                onChange={(e) => updateParam("to", e.target.value || null)}
                className="flex-1"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {query.isLoading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, idx) => (
                <Skeleton key={idx} className="h-12 w-full" />
              ))}
            </div>
          ) : query.error ? (
            <Alert variant="destructive">
              <AlertDescription>Failed to load consultations.</AlertDescription>
            </Alert>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Preferred</TableHead>
                    <TableHead>Newsletter</TableHead>
                    <TableHead>Services</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paged.map((row) => (
                    <TableRow
                      key={row.id}
                      className="cursor-pointer hover:bg-slate-50"
                      onClick={() => {
                        setSelected(row);
                        logAuditEvent("detail_open", { route: "/consultations", id: row.id });
                      }}
                    >
                      <TableCell className="font-medium">{row.fullName}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.company ?? "—"}</TableCell>
                      <TableCell>{row.preferredContact ?? "—"}</TableCell>
                      <TableCell>{row.newsletter ? <Badge>Yes</Badge> : <Badge variant="secondary">No</Badge>}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {parseServices(row.interestedServices).map((chip) => (
                            <Badge key={chip} variant="outline">
                              {chip}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell title={format(new Date(row.createdAt), "PPpp")}>
                        <span className="text-sm">{formatDistanceToNow(new Date(row.createdAt))}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between text-sm text-slate-600">
        <div>
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex gap-2">
          <Button disabled={currentPage === 1} variant="outline" size="sm" onClick={() => updateParam("page", String(currentPage - 1))}>
            Previous
          </Button>
          <Button
            disabled={currentPage === totalPages}
            variant="outline"
            size="sm"
            onClick={() => updateParam("page", String(currentPage + 1))}
          >
            Next
          </Button>
        </div>
      </div>

      <Sheet open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="w-[420px] sm:w-[480px]">
          <SheetHeader>
            <SheetTitle>{selected?.fullName}</SheetTitle>
            <p className="text-sm text-slate-600">{selected?.email}</p>
          </SheetHeader>
          <div className="mt-4 space-y-3 text-sm">
            <div>
              <p className="font-semibold">Goals</p>
              <p className="text-slate-700">{selected?.goals ?? "—"}</p>
            </div>
            <div>
              <p className="font-semibold">Challenges</p>
              <p className="text-slate-700">{selected?.challenges ?? "—"}</p>
            </div>
            <div>
              <p className="font-semibold">Additional info</p>
              <p className="text-slate-700">{selected?.additionalInfo ?? "—"}</p>
            </div>
            <div>
              <p className="font-semibold">Interested services</p>
              <div className="flex flex-wrap gap-1">
                {parseServices(selected?.interestedServices).map((chip) => (
                  <Badge key={chip} variant="outline">
                    {chip}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
