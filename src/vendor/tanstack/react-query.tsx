import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type QueryKey = readonly unknown[] | string;

export interface QueryObserverResult<TData> {
  data?: TData;
  error?: unknown;
  status: "idle" | "loading" | "success" | "error";
  isLoading: boolean;
  refetch: () => Promise<void>;
}

export interface UseQueryOptions<TQueryFnData> {
  queryKey: QueryKey;
  queryFn: () => Promise<TQueryFnData>;
  enabled?: boolean;
  staleTime?: number;
  refetchInterval?: number;
}

interface QueryState<TData> {
  data?: TData;
  error?: unknown;
  status: "idle" | "loading" | "success" | "error";
  updatedAt?: number;
}

type Listener = () => void;

function serializeKey(key: QueryKey): string {
  return Array.isArray(key) ? JSON.stringify(key) : String(key);
}

export class QueryClient {
  private cache = new Map<string, QueryState<unknown>>();
  private listeners = new Map<string, Set<Listener>>();

  getState<TData>(key: QueryKey): QueryState<TData> | undefined {
    return this.cache.get(serializeKey(key)) as QueryState<TData> | undefined;
  }

  setState<TData>(key: QueryKey, state: QueryState<TData>) {
    const cacheKey = serializeKey(key);
    this.cache.set(cacheKey, state);
    const listeners = this.listeners.get(cacheKey);
    if (listeners) {
      listeners.forEach((listener) => listener());
    }
  }

  subscribe(key: QueryKey, listener: Listener) {
    const cacheKey = serializeKey(key);
    if (!this.listeners.has(cacheKey)) {
      this.listeners.set(cacheKey, new Set());
    }
    this.listeners.get(cacheKey)?.add(listener);

    return () => {
      this.listeners.get(cacheKey)?.delete(listener);
    };
  }

  invalidateQueries(key: QueryKey) {
    const cacheKey = serializeKey(key);
    const current = this.cache.get(cacheKey);
    if (current) {
      this.cache.set(cacheKey, { ...current, status: "idle" });
      this.listeners.get(cacheKey)?.forEach((listener) => listener());
    }
  }
}

const QueryClientContext = createContext<QueryClient | null>(null);

export function QueryClientProvider({ client, children }: { client: QueryClient; children: ReactNode }) {
  return <QueryClientContext.Provider value={client}>{children}</QueryClientContext.Provider>;
}

export function useQueryClient() {
  const client = useContext(QueryClientContext);
  if (!client) throw new Error("QueryClientProvider is missing");
  return client;
}

export function useQuery<TQueryFnData>(options: UseQueryOptions<TQueryFnData>): QueryObserverResult<TQueryFnData> {
  const { queryKey, queryFn, enabled = true, staleTime = 0, refetchInterval } = options;
  const client = useQueryClient();
  const cacheKey = useMemo(() => serializeKey(queryKey), [queryKey]);
  const [state, setState] = useState<QueryState<TQueryFnData>>(
    () => client.getState<TQueryFnData>(queryKey) ?? { status: "idle" },
  );

  const fetchRef = useRef<Promise<void> | null>(null);

  const runQuery = async () => {
    const current = client.getState<TQueryFnData>(queryKey);
    client.setState(queryKey, { ...(current ?? { data: undefined }), status: "loading" });
    try {
      const data = await queryFn();
      client.setState(queryKey, {
        data,
        status: "success",
        error: undefined,
        updatedAt: Date.now(),
      });
    } catch (error) {
      client.setState(queryKey, {
        data: current?.data,
        status: "error",
        error,
        updatedAt: Date.now(),
      });
    }
  };

  useEffect(() => {
    return client.subscribe(queryKey, () => {
      const next = client.getState<TQueryFnData>(queryKey);
      if (next) setState(next);
    });
  }, [client, queryKey]);

  useEffect(() => {
    const current = client.getState<TQueryFnData>(queryKey);
    const isStale =
      !current?.updatedAt || (staleTime > 0 && Date.now() - current.updatedAt > staleTime);

    if (!enabled) return;
    if (current?.status === "loading") return;
    if (!current?.data || isStale) {
      if (!fetchRef.current) {
        fetchRef.current = runQuery().finally(() => {
          fetchRef.current = null;
        });
      }
    }
  }, [client, queryKey, enabled, staleTime, queryFn]);

  useEffect(() => {
    if (!refetchInterval) return;
    const id = setInterval(() => {
      runQuery();
    }, refetchInterval);
    return () => clearInterval(id);
  }, [refetchInterval, cacheKey]);

  return {
    data: state.data,
    error: state.error,
    status: state.status,
    isLoading: state.status === "loading",
    refetch: runQuery,
  };
}
