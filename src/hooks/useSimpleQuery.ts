import { useEffect, useRef, useState } from "react";

export type SimpleQueryOptions<T> = {
  queryKey: readonly unknown[];
  queryFn: () => Promise<T>;
  enabled?: boolean;
  staleTime?: number;
  refetchInterval?: number;
};

export type SimpleQueryResult<T> = {
  data: T | undefined;
  error: unknown;
  isLoading: boolean;
  refetch: () => void;
};

export function useSimpleQuery<T>(options: SimpleQueryOptions<T>): SimpleQueryResult<T> {
  const { queryFn, enabled = true, refetchInterval } = options;
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<unknown>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isMounted = useRef(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const runQuery = () => {
    if (!enabled) return;
    setIsLoading(true);
    setError(undefined);
    queryFn()
      .then((result) => {
        if (!isMounted.current) return;
        setData(result);
      })
      .catch((err) => {
        if (!isMounted.current) return;
        setError(err);
      })
      .finally(() => {
        if (!isMounted.current) return;
        setIsLoading(false);
      });
  };

  useEffect(() => {
    isMounted.current = true;
    runQuery();
    return () => {
      isMounted.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ...options.queryKey]);

  useEffect(() => {
    if (refetchInterval && enabled) {
      intervalRef.current = setInterval(() => runQuery(), refetchInterval);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [enabled, refetchInterval]);

  return { data, error, isLoading, refetch: runQuery };
}
