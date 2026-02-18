import { Resend } from "resend";

function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY environment variable is not set");
  }
  return new Resend(apiKey);
}

export async function sendWelcomeEmail(email: string) {
  const resend = getResendClient();
  const { data, error } = await resend.emails.send({
    from: "The Anti Job Board <hello@theantijobboard.com>",
    to: email,
    subject: "You're in. Welcome to The Anti Job Board.",
    html: getWelcomeEmailHtml(),
  });

  if (error) {
    console.error("Failed to send welcome email:", error);
    throw error;
  }

  return data;
}

function getWelcomeEmailHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to The Anti Job Board</title>
</head>
<body style="margin: 0; padding: 0; background-color: #fafafa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #fafafa;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; max-width: 100%;">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 30px 40px; text-align: center; border-bottom: 1px dashed #e5e5e5;">
              <img src="https://theantijobboard.b-cdn.net/logo.webp" alt="The Anti Job Board" width="60" style="display: block; margin: 0 auto 16px auto;">
              <h1 style="margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 28px; font-weight: 400; color: #171717;">
                You're in.
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #525252;">
                Welcome to The Anti Job Board. You just joined a small group of people who refuse to compete with 1,000 applicants for the same role.
              </p>

              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #525252;">
                Here's what happens next:
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 0 0 30px 0;">
                <tr>
                  <td style="padding: 16px 0; border-bottom: 1px solid #f5f5f5;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width: 36px; vertical-align: top;">
                          <span style="display: inline-block; width: 24px; height: 24px; background-color: #fecdd3; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; color: #171717; font-weight: 600;">1</span>
                        </td>
                        <td style="vertical-align: top;">
                          <p style="margin: 0; font-size: 15px; color: #171717; font-weight: 500;">Your first drop is coming</p>
                          <p style="margin: 4px 0 0 0; font-size: 14px; color: #737373;">We're preparing your first batch of recently funded startups with verified open roles.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 0; border-bottom: 1px solid #f5f5f5;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width: 36px; vertical-align: top;">
                          <span style="display: inline-block; width: 24px; height: 24px; background-color: #fecdd3; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; color: #171717; font-weight: 600;">2</span>
                        </td>
                        <td style="vertical-align: top;">
                          <p style="margin: 0; font-size: 15px; color: #171717; font-weight: 500;">Check your inbox</p>
                          <p style="margin: 4px 0 0 0; font-size: 14px; color: #737373;">Add hello@theantijobboard.com to your contacts so our emails don't end up in spam.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width: 36px; vertical-align: top;">
                          <span style="display: inline-block; width: 24px; height: 24px; background-color: #fecdd3; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; color: #171717; font-weight: 600;">3</span>
                        </td>
                        <td style="vertical-align: top;">
                          <p style="margin: 0; font-size: 15px; color: #171717; font-weight: 500;">Apply fast</p>
                          <p style="margin: 4px 0 0 0; font-size: 14px; color: #737373;">When you get a drop, move quickly. These roles have less than 10 applicants for a reason.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #525252;">
                Questions? Just reply to this email. We read everything.
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                <tr>
                  <td style="background-color: #171717; border-radius: 8px;">
                    <a href="https://www.theantijobboard.com" style="display: inline-block; padding: 14px 28px; font-size: 15px; color: #ffffff; text-decoration: none; font-weight: 500;">
                      Visit The Anti Job Board
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #fafafa; border-top: 1px dashed #e5e5e5;">
              <p style="margin: 0 0 8px 0; font-size: 14px; color: #a3a3a3; text-align: center;">
                The Anti Job Board
              </p>
              <p style="margin: 0; font-size: 12px; color: #a3a3a3; text-align: center;">
                <a href="https://www.theantijobboard.com/terms" style="color: #a3a3a3; text-decoration: underline;">Terms</a>
                &nbsp;&nbsp;·&nbsp;&nbsp;
                <a href="https://www.theantijobboard.com/privacy" style="color: #a3a3a3; text-decoration: underline;">Privacy</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
