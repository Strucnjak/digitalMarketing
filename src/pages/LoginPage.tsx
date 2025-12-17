import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { toast } from "sonner";
import { getDatabaseStatus } from "../lib/api";
import { logAuditEvent } from "../lib/audit";
import { useApiKey } from "../providers/apiKey";

export function LoginPage() {
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [remember, setRemember] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setApiKey } = useApiKey();
  const params = new URLSearchParams(location.search);
  const returnTo = params.get("returnTo") ?? "/";

  useEffect(() => {
    setIsValid(false);
    setError(null);
  }, [apiKeyInput]);

  const handleValidate = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getDatabaseStatus(apiKeyInput.trim());
      if (result.status === "ok") {
        setIsValid(true);
        toast.success("API key validated");
        logAuditEvent("login_success", { route: location.pathname });
      } else {
        setError(result.message ?? "Database error");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to validate";
      if (message.includes("Unauthorized")) {
        setError("Invalid API key");
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    setApiKey(apiKeyInput.trim(), remember);
    navigate(returnTo);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Admin access</CardTitle>
          <CardDescription>Enter your API key to continue.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">API key</Label>
            <div className="flex items-center gap-2">
              <Input
                id="api-key"
                type={showKey ? "text" : "password"}
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="********"
                className="flex-1"
                autoComplete="off"
              />
              <Button variant="outline" type="button" onClick={() => setShowKey((v) => !v)}>
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" checked={remember} onCheckedChange={(val) => setRemember(Boolean(val))} />
              <Label htmlFor="remember">Remember this key on this device</Label>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Validation failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col gap-2">
            <Button disabled={!apiKeyInput || loading} onClick={handleValidate} className="w-full">
              Validate
            </Button>
            <Button disabled={!isValid} onClick={handleContinue} className="w-full" variant="secondary" aria-label="Continue to dashboard">
              Continue to Dashboard
            </Button>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-slate-100 p-3 text-sm text-slate-600">
            <ShieldCheck className="h-4 w-4" />
            <p>Your key is only used in this browser. No data is stored on the server.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
