import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AdminPanel } from "./AdminPanel";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const ACCESS_KEY = import.meta.env.VITE_ADMIN_ACCESS_KEY ?? "bdigital-admin";
const ACCESS_STORAGE_KEY = "bdigital-admin-access";

function useAdminAccess(searchParams: URLSearchParams) {
  const [authorized, setAuthorized] = useState(() => {
    if (typeof window === "undefined") return false;

    const stored = window.sessionStorage.getItem(ACCESS_STORAGE_KEY);
    return stored === "true";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const key = searchParams.get("key");
    if (key && key === ACCESS_KEY) {
      window.sessionStorage.setItem(ACCESS_STORAGE_KEY, "true");
      setAuthorized(true);
    }
  }, [searchParams]);

  const authorize = (value: string) => {
    if (value === ACCESS_KEY) {
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(ACCESS_STORAGE_KEY, "true");
      }
      setAuthorized(true);
      return true;
    }
    return false;
  };

  return useMemo(() => ({ authorized, authorize }), [authorized]);
}

export function AdminAccessGate() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { authorized, authorize } = useAdminAccess(searchParams);
  const [code, setCode] = useState(searchParams.get("key") ?? "");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const success = authorize(code.trim());

    if (!success) {
      setError("Netačan pristupni kod. Pokušajte ponovo.");
      return;
    }

    setError(null);
    setSearchParams((current) => {
      const updated = new URLSearchParams(current);
      updated.set("key", code.trim());
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
              />
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
            </div>
            <Button type="submit" className="w-full">
              Otključaj
            </Button>
            <p className="text-xs text-neutral-gray text-center">
              Savjet: dodajte <code>?key=vaš-kod</code> na link za direktan pristup.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
