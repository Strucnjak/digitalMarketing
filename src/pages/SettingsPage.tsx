import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { useApiKey } from "../providers/ApiKeyProvider";
import { clearAuditLog, getAuditLog } from "../lib/audit";

export function SettingsPage() {
  const { apiKey, isRemembered, clearApiKey } = useApiKey();
  const navigate = useNavigate();
  const location = useLocation();
  const [logs, setLogs] = useState(() => getAuditLog());

  const handleClearKey = () => {
    clearApiKey();
  };

  const handleChangeKey = () => {
    navigate(`/login?returnTo=${encodeURIComponent(location.pathname)}`);
  };

  const handleClearLog = () => {
    clearAuditLog();
    setLogs([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-slate-600">Manage access and audit log.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stored API key</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1 text-sm">
            <p className="font-semibold">Key status</p>
            <p className="text-slate-600">{apiKey ? "Active" : "Not set"}</p>
            {apiKey && <Badge variant="outline">{isRemembered ? "Persisted" : "Session only"}</Badge>}
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={handleChangeKey}>
              Change key
            </Button>
            <Button variant="outline" onClick={handleClearKey}>
              Clear saved key
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Audit log</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600">Local-only audit events.</p>
            <Button size="sm" variant="outline" onClick={handleClearLog}>
              Clear audit log
            </Button>
          </div>
          {logs.length === 0 ? (
            <p className="text-sm text-slate-500">No audit events recorded.</p>
          ) : (
            <div className="max-h-96 space-y-2 overflow-y-auto">
              {logs.map((entry) => (
                <div key={entry.id} className="rounded-lg border border-slate-100 p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{entry.type}</Badge>
                    <span className="text-xs text-slate-500">{format(new Date(entry.timestamp), "PPpp")}</span>
                  </div>
                  <pre className="mt-2 whitespace-pre-wrap text-xs text-slate-700">{JSON.stringify(entry.payload, null, 2)}</pre>
                  <p className="mt-1 text-[11px] text-slate-500">{entry.userAgent}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
