import { test } from "node:test";
import assert from "node:assert";
import { buildHtmlTable } from "./htmlTable.js";

test("buildHtmlTable escapes HTML special characters", () => {
  const payload = {
    'na<me&"': "value with <script>alert('x & \"y\"')</script>",
  };
  const html = buildHtmlTable(payload);

  assert.ok(
    html.includes('<strong>na&lt;me&amp;&quot;:</strong>'),
    "Key was not escaped"
  );
  assert.ok(
    html.includes(
      'value with &lt;script&gt;alert(&#39;x &amp; &quot;y&quot;&#39;)&lt;/script&gt;'
    ),
    "Value was not escaped"
  );
  assert.ok(!html.includes("<script>"), "Unescaped script tag found");
});

