export type Payload = Record<string, string>;

export function escapeHtml(str: string) {
  return str.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return char;
    }
  });
}

export function buildHtmlTable(payload: Payload) {
  return `<table>${Object.entries(payload)
    .map(([key, value]) => {
      const k = escapeHtml(key);
      const v = escapeHtml(String(value)).replace(/\n/g, "<br/>");
      return `<tr><td><strong>${k}:</strong></td><td>${v}</td></tr>`;
    })
    .join("")}</table>`;
}

