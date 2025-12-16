import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AdminPanel } from "./AdminPanel";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { clearAdminAccess, hasAdminAccess, persistAdminAccess } from "../utils/adminAccess";

const ACCESS_KEY = import.meta.env.VITE_ADMIN_ACCESS_KEY ?? "bdigital-admin";

function normalizeKey(value: string | null) {
  return value?.trim() ?? "";
}

function useAdminAccess(searchParams: URLSearchParams) {
  const [authorized, setAuthorized] = useState(() => {
    return hasAdminAccess();
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const key = normalizeKey(searchParams.get("key"));
    if (key && key === ACCESS_KEY) {
      persistAdminAccess();
      setAuthorized(true);
    }
  }, [searchParams]);

  const authorize = useCallback((value: string) => {
    if (value === ACCESS_KEY) {
      persistAdminAccess();
      setAuthorized(true);
      return true;
    }
    return false;
  }, []);

  const revokeAuthorization = useCallback(() => {
    clearAdminAccess();
    setAuthorized(false);
  }, []);

  return useMemo(
    () => ({
      authorized,
      authorize,
      revokeAuthorization,
    }),
    [authorize, authorized, revokeAuthorization],
  );
}

export function AdminAccessGate() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { authorized, authorize, revokeAuthorization } = useAdminAccess(searchParams);
  const [code, setCode] = useState(searchParams.get("key") ?? "");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const sanitizedCode = normalizeKey(code);
    const success = authorize(sanitizedCode);

    if (!success) {
      setError("Netačan pristupni kod. Pokušajte ponovo.");
      return;
    }

    setError(null);
    setSearchParams((current) => {
      const updated = new URLSearchParams(current);
      updated.delete("key");
      return updated;
    });
  };

  const handleClear = () => {
    revokeAuthorization();
    setCode("");
    setSearchParams((current) => {
      const updated = new URLSearchParams(current);
      updated.delete("key");
      return updated;
    });
  };

  if (authorized) {
    return <AdminPanel />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4">
      <Card className="max-w-md w-full shadow-lg border-slate-200">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-bdigital-navy">Admin pristup</CardTitle>
          <p className="text-sm text-neutral-gray text-center">
            Unesite pristupni kod da otvorite admin panel.
          </p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="admin-code">Pristupni kod</Label>
              <Input
                id="admin-code"
                type="password"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                autoComplete="off"
                placeholder="Unesite kod"
                required
                minLength={6}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "admin-code-error" : undefined}
              />
              {error ? (
                <p id="admin-code-error" className="text-sm text-red-600" aria-live="polite">
                  {error}
                </p>
              ) : null}
            </div>
            <Button type="submit" className="w-full">
              Otključaj
            </Button>
            <p className="text-xs text-neutral-gray text-center">
              Savjet: dodajte <code>?key=vaš-kod</code> na link za direktan pristup.
            </p>
            <Button type="button" variant="ghost" className="w-full" onClick={handleClear}>
              Očisti memorisani pristup
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
