import { useMemo } from "react";

export type Row<TData> = {
  id: string;
  original: TData;
  getVisibleCells: () => { id: string; column: ColumnDef<TData>; row: Row<TData>; value: unknown }[];
};

export type Header<TData> = {
  id: string;
  column: ColumnDef<TData>;
};

export type HeaderGroup<TData> = {
  id: string;
  headers: Header<TData>[];
};

export type SortingState = { id: string; desc: boolean }[];

export type ColumnDef<TData> = {
  id?: string;
  accessorKey?: keyof TData & string;
  header: string | ((column: ColumnDef<TData>) => unknown);
  cell?: (info: { row: Row<TData>; getValue: () => unknown }) => unknown;
  enableSorting?: boolean;
};

export interface Table<TData> {
  getHeaderGroups: () => HeaderGroup<TData>[];
  getRowModel: () => { rows: Row<TData>[] };
}

interface UseReactTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
}

export function getCoreRowModel<TData>() {
  return () => ({ rows: [] as Row<TData>[] });
}

export function useReactTable<TData>({ data, columns }: UseReactTableProps<TData>): Table<TData> {
  const rows = useMemo(() => {
    return data.map((item, index) => {
      const row: Row<TData> = {
        id: String((item as { id?: string }).id ?? index),
        original: item,
        getVisibleCells: () =>
          columns.map((column) => ({
            id: `${column.id ?? column.accessorKey ?? index}-${index}`,
            column,
            row,
            value: column.accessorKey ? (item as Record<string, unknown>)[column.accessorKey] : undefined,
          })),
      };
      return row;
    });
  }, [columns, data]);

  const headerGroups = useMemo<HeaderGroup<TData>[]>(() => {
    return [
      {
        id: "header",
        headers: columns.map((column, index) => ({
          id: column.id ?? column.accessorKey ?? String(index),
          column,
        })),
      },
    ];
  }, [columns]);

  return {
    getHeaderGroups: () => headerGroups,
    getRowModel: () => ({ rows }),
  };
}
