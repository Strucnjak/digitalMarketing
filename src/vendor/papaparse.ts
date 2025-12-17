export interface UnparseConfig {}

export function unparse(data: unknown[], _config?: UnparseConfig): string {
  if (!Array.isArray(data)) return "";
  const rows = data as Record<string, unknown>[];
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const csvRows = [headers.join(",")];
  for (const row of rows) {
    const values = headers.map((key) => {
      const value = row[key];
      if (value === null || value === undefined) return "";
      const stringValue = Array.isArray(value) ? value.join(";") : String(value);
      if (stringValue.includes(",")) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    });
    csvRows.push(values.join(","));
  }
  return csvRows.join("\n");
}
