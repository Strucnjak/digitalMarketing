import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { format, formatDistanceToNow } from "date-fns";
import { getServiceInquiries } from "../lib/api";
import { useApiKey } from "../providers/ApiKeyProvider";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Skeleton } from "../components/ui/skeleton";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../components/ui/sheet";
import { Badge } from "../components/ui/badge";
import { Search } from "lucide-react";
import type { ServiceInquiry } from "../types/admin";
import { logAuditEvent } from "../lib/audit";
import { useSimpleQuery } from "../hooks/useSimpleQuery";

function normalizeList(value?: string[] | string) {
  if (!value) return [] as string[];
  if (Array.isArray(value)) return value.map(String);
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return value.split(",").map((v) => v.trim());
  }
}

export function ServiceInquiriesPage() {
  const { apiKey } = useApiKey();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState<ServiceInquiry | null>(null);

  const query = useSimpleQuery<ServiceInquiry[]>({
    queryKey: ["service-inquiries", apiKey],
    queryFn: () => getServiceInquiries(apiKey ?? ""),
    enabled: Boolean(apiKey),
  });

  const filters = {
    selectedService: searchParams.get("selectedService") ?? "",
    selectedPackage: searchParams.get("selectedPackage") ?? "",
    budget: searchParams.get("budget") ?? "",
    timeline: searchParams.get("timeline") ?? "",
    newsletter: searchParams.get("newsletter") ?? "",
    q: searchParams.get("q") ?? "",
    from: searchParams.get("from"),
    to: searchParams.get("to"),
    page: Number(searchParams.get("page") ?? "1"),
    pageSize: Number(searchParams.get("pageSize") ?? "25"),
  };

  const filtered = useMemo(() => {
    return (query.data ?? []).filter((item: ServiceInquiry) => {
      const createdAt = new Date(item.createdAt).getTime();
      const matchesFrom = filters.from ? createdAt >= new Date(filters.from).getTime() : true;
      const matchesTo = filters.to ? createdAt <= new Date(filters.to).getTime() : true;
      const matchesService = filters.selectedService
        ? (item.selectedService ?? "").toLowerCase() === filters.selectedService.toLowerCase()
        : true;
      const matchesPackage = filters.selectedPackage
        ? (item.selectedPackage ?? "").toLowerCase() === filters.selectedPackage.toLowerCase()
        : true;
      const matchesBudget = filters.budget ? (item.budget ?? "").toLowerCase().includes(filters.budget.toLowerCase()) : true;
      const matchesTimeline = filters.timeline
        ? (item.timeline ?? "").toLowerCase().includes(filters.timeline.toLowerCase())
        : true;
      const matchesNewsletter = filters.newsletter
        ? String(Boolean(item.newsletter)) === filters.newsletter
        : true;
      const text = `${item.currentSituation ?? ""} ${item.projectGoals ?? ""}`.toLowerCase();
      const matchesSearch = filters.q ? text.includes(filters.q.toLowerCase()) : true;
      return (
        matchesFrom &&
        matchesTo &&
        matchesService &&
        matchesPackage &&
        matchesBudget &&
        matchesTimeline &&
        matchesNewsletter &&
        matchesSearch
      );
    });
  }, [
    filters.budget,
    filters.from,
    filters.newsletter,
    filters.q,
    filters.selectedPackage,
    filters.selectedService,
    filters.timeline,
    filters.to,
    query.data,
  ]);

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
    setSearchParams(next);
    logAuditEvent("table_filter_change", { route: "/service-inquiries", key, value });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Service inquiries</h1>
          <p className="text-sm text-slate-600">Package and service leads.</p>
        </div>
      </div>

      <Card>
        <CardHeader className="space-y-3">
          <CardTitle className="text-base">Filters</CardTitle>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search situation or goals"
                value={filters.q}
                onChange={(e) => updateParam("q", e.target.value)}
                className="pl-9"
              />
            </div>
            <Input
              placeholder="Selected service"
              value={filters.selectedService}
              onChange={(e) => updateParam("selectedService", e.target.value)}
            />
            <Input
              placeholder="Selected package"
              value={filters.selectedPackage}
              onChange={(e) => updateParam("selectedPackage", e.target.value)}
            />
            <Input
              placeholder="Budget"
              value={filters.budget}
              onChange={(e) => updateParam("budget", e.target.value)}
            />
            <Input
              placeholder="Timeline"
              value={filters.timeline}
              onChange={(e) => updateParam("timeline", e.target.value)}
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
              <AlertDescription>Failed to load service inquiries.</AlertDescription>
            </Alert>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Package</TableHead>
                    <TableHead>Project types</TableHead>
                    <TableHead>Additional services</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Timeline</TableHead>
                    <TableHead>Newsletter</TableHead>
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
                        logAuditEvent("detail_open", { route: "/service-inquiries", id: row.id });
                      }}
                    >
                      <TableCell className="font-medium">{row.fullName}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.selectedService ?? "—"}</TableCell>
                      <TableCell>{row.selectedPackage ?? "—"}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {normalizeList(row.projectTypes).map((chip) => (
                            <Badge key={chip} variant="outline">
                              {chip}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {normalizeList(row.additionalServices).map((chip) => (
                            <Badge key={chip} variant="outline">
                              {chip}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{row.budget ?? "—"}</TableCell>
                      <TableCell>{row.timeline ?? "—"}</TableCell>
                      <TableCell>{row.newsletter ? <Badge>Yes</Badge> : <Badge variant="secondary">No</Badge>}</TableCell>
                      <TableCell title={format(new Date(row.createdAt), "PPpp")}>{formatDistanceToNow(new Date(row.createdAt))}</TableCell>
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
        <SheetContent className="w-[420px] sm:w-[520px]">
          <SheetHeader>
            <SheetTitle>{selected?.fullName}</SheetTitle>
            <p className="text-sm text-slate-600">{selected?.email}</p>
          </SheetHeader>
          <div className="mt-4 space-y-3 text-sm">
            <div>
              <p className="font-semibold">Current situation</p>
              <p className="text-slate-700">{selected?.currentSituation ?? "—"}</p>
            </div>
            <div>
              <p className="font-semibold">Project goals</p>
              <p className="text-slate-700">{selected?.projectGoals ?? "—"}</p>
            </div>
            <div>
              <p className="font-semibold">Target audience</p>
              <p className="text-slate-700">{selected?.targetAudience ?? "—"}</p>
            </div>
            <div>
              <p className="font-semibold">Additional info</p>
              <p className="text-slate-700">{selected?.additionalInfo ?? "—"}</p>
            </div>
            <div>
              <p className="font-semibold">How did you hear</p>
              <p className="text-slate-700">{selected?.howDidYouHear ?? "—"}</p>
            </div>
            <div>
              <p className="font-semibold">Project types</p>
              <div className="flex flex-wrap gap-1">
                {normalizeList(selected?.projectTypes).map((chip) => (
                  <Badge key={chip} variant="outline">
                    {chip}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="font-semibold">Additional services</p>
              <div className="flex flex-wrap gap-1">
                {normalizeList(selected?.additionalServices).map((chip) => (
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
