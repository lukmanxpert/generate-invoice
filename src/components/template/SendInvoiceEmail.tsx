import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  invoiceNo: string;
  dueDate: string;
  total: string;
  invoiceUrl: string;
}

export function InvoiceTemplate({
  firstName,
  invoiceNo,
  dueDate,
  total,
  invoiceUrl,
}: EmailTemplateProps) {
  return (
    <div>
      <h1>Welcome, {firstName}!</h1>
      <div
        style={{
          background: "#f9f9f9",
          borderRadius: "8px",
          padding: "24px",
          margin: "24px 0",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          maxWidth: "360px",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td style={{ color: "#888", padding: "8px 0" }}>Invoice No:</td>
              <td style={{ fontWeight: 500, padding: "8px 0" }}>{invoiceNo}</td>
            </tr>
            <tr>
              <td style={{ color: "#888", padding: "8px 0" }}>Due Date:</td>
              <td style={{ fontWeight: 500, padding: "8px 0" }}>{dueDate}</td>
            </tr>
            <tr>
              <td style={{ color: "#888", padding: "8px 0" }}>Total:</td>
              <td
                style={{
                  fontWeight: 600,
                  color: "#2d7a46",
                  fontSize: "1.1em",
                  padding: "8px 0",
                }}
              >
                {total}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <a
        href={invoiceUrl}
        style={{
          display: "inline-block",
          padding: "10px 20px",
          backgroundColor: "#2563eb",
          color: "#fff",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: 500,
          fontSize: "1rem",
          boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          marginTop: "12px",
        }}
      >
        Download Invoice
      </a>
    </div>
  );
}
