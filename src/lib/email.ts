import nodemailer from "nodemailer";

export interface PaymentNotificationData {
  userName: string;
  userEmail: string;
  planName: string;
  amount: number;
  reference: string;
  transactionRef?: string;
  senderName: string;
  senderBank?: string;
  submittedAt?: Date | string;
}

/**
 * Creates a reusable Nodemailer transporter using environment variables.
 */
function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  if (!host || !user || !pass) {
    // If SMTP is not fully configured, return null so we can log gracefully
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Sends an email notification to the My Pact admin email address whenever
 * a student submits a manual bank transfer ("I have transferred").
 * 
 * NOTE: This notification communicates that payment has only been submitted
 * and remains pending verification. It does NOT activate the subscription.
 */
export async function sendPaymentPendingAdminEmail(data: PaymentNotificationData): Promise<boolean> {
  try {
    const adminEmail =
      process.env.ADMIN_NOTIFICATION_EMAIL ||
      process.env.ADMIN_EMAIL ||
      "admin@mypact.app";

    const fromAddress =
      process.env.EMAIL_FROM ||
      process.env.SMTP_FROM ||
      '"My Pact System" <notifications@mypact.app>';

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.APP_URL ||
      "https://mypact.app";

    const reviewUrl = `${appUrl}/admin/payments`;

    const formattedAmount = Number(data.amount).toLocaleString();
    const submissionTime = data.submittedAt
      ? new Date(data.submittedAt).toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : new Date().toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        });

    const subject = "My Pact — New Payment Pending Verification";

    const textContent = `
NEW PAYMENT PENDING VERIFICATION

A student has submitted a manual bank transfer for verification on My Pact.

Student Details:
- User: ${data.userName}
- Email: ${data.userEmail}
- Plan: ${data.planName}
- Expected Amount: NGN ${formattedAmount}
- Payment Reference: ${data.reference}
- Transaction Reference: ${data.transactionRef || "None provided"}
- Sender Name: ${data.senderName}
- Sender Bank: ${data.senderBank || "OPay / Bank"}
- Submission Time: ${submissionTime}
- Status: Pending Verification

IMPORTANT: This payment has only been submitted. The student's paid subscription remains inactive until verified and approved by an authorized admin.

Review and verify payment in Admin Dashboard:
${reviewUrl}
`.trim();

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Payment Pending Verification</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0b1a33; }
    .card { max-width: 580px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background-color: #0a66ff; padding: 24px 32px; color: #ffffff; text-align: left; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.5px; }
    .header p { margin: 4px 0 0 0; font-size: 12px; opacity: 0.85; }
    .body { padding: 32px; }
    .notice { background-color: #fffbeb; border: 1px solid #fef3c7; border-left: 4px solid #f59e0b; padding: 12px 16px; border-radius: 8px; margin-bottom: 24px; font-size: 13px; color: #92400e; line-height: 1.4; }
    .table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .table tr td { padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; }
    .table tr td:first-child { color: #64748b; font-weight: 600; width: 40%; }
    .table tr td:last-child { color: #0b1a33; font-weight: 700; width: 60%; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 800; text-transform: uppercase; background-color: #fef3c7; color: #b45309; }
    .ref-code { font-family: monospace; font-size: 14px; font-weight: 800; color: #0a66ff; }
    .btn-container { text-align: center; margin: 32px 0 16px 0; }
    .btn { display: inline-block; background-color: #0a66ff; color: #ffffff !important; padding: 14px 28px; border-radius: 50px; font-size: 13px; font-weight: 700; text-decoration: none; box-shadow: 0 4px 12px rgba(10,102,255,0.25); }
    .footer { padding: 20px 32px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>My Pact Management</h1>
      <p>Manual Bank Transfer Notification</p>
    </div>
    <div class="body">
      <div class="notice">
        <strong>Status: Pending Verification</strong><br>
        A student has submitted payment details. The subscription remains <strong>inactive</strong> until verified and approved in the admin dashboard.
      </div>

      <table class="table">
        <tr>
          <td>Student Name:</td>
          <td>${data.userName}</td>
        </tr>
        <tr>
          <td>Student Email:</td>
          <td>${data.userEmail}</td>
        </tr>
        <tr>
          <td>Selected Plan:</td>
          <td>${data.planName}</td>
        </tr>
        <tr>
          <td>Expected Amount:</td>
          <td>NGN ${formattedAmount}</td>
        </tr>
        <tr>
          <td>Payment Reference:</td>
          <td><span class="ref-code">${data.reference}</span></td>
        </tr>
        <tr>
          <td>Sender Account Name:</td>
          <td>${data.senderName}</td>
        </tr>
        <tr>
          <td>Sender Bank / App:</td>
          <td>${data.senderBank || "OPay"}</td>
        </tr>
        <tr>
          <td>Transaction ID:</td>
          <td>${data.transactionRef || "Not provided"}</td>
        </tr>
        <tr>
          <td>Submitted At:</td>
          <td>${submissionTime}</td>
        </tr>
        <tr>
          <td>Current Status:</td>
          <td><span class="badge">Pending Verification</span></td>
        </tr>
      </table>

      <div class="btn-container">
        <a href="${reviewUrl}" class="btn" target="_blank">Open Payment Management</a>
      </div>
    </div>
    <div class="footer">
      This is an automated notification sent to ${adminEmail}. For security, all verification occurs on the My Pact Admin Portal.
    </div>
  </div>
</body>
</html>
`.trim();

    const transporter = createTransporter();
    if (!transporter) {
      console.log("ℹ️ [Email Service] SMTP is not configured in .env. Email dispatch simulated successfully for payment:", data.reference);
      console.log("ℹ️ Admin target:", adminEmail, "| Subject:", subject);
      return true;
    }

    await transporter.sendMail({
      from: fromAddress,
      to: adminEmail,
      subject,
      text: textContent,
      html: htmlContent,
    });

    console.log("✅ Admin notification email sent successfully for payment reference:", data.reference);
    return true;
  } catch (err: any) {
    console.warn("⚠️ [Email Service] Failed to send admin payment notification email:", err.message || err);
    // Non-blocking: return false but do not throw to protect the payment record
    return false;
  }
}
