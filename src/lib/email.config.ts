import { Resend } from "resend";

const resend = new Resend(process.env.AUTH_RESEND_KEY);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function sendEmail(to: string, subject: string, reactHTML: any) {
  const { data, error } = await resend.emails.send({
    from: "Generate Invoice <noreplay@lukmanxpert.site>",
    to: to,
    subject: subject,
    react: reactHTML,
  });
  if (error) {
    return error
  }
  return data
}
