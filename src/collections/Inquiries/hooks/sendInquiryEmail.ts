import { CollectionAfterChangeHook } from "payload";

/**
 * Premium Email Template for Visitor Pass Requests
 * Using Inline Styles for maximum compatibility with Gmail, Outlook, and Mobile clients.
 */
const getVisitorEmailHtml = (data: {
  chapterName: string;
  meetingDay: string;
  meetingDate: string;
  meetingTopic: string;
  venue: string;
  visitorName: string;
  visitorEmail: string;
  visitorPhone: string;
  visitorSpecialty: string;
  visitorNotes: string;
  adminDashboardLink: string;
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Visitor Pass Request</title>
<style>
  body { margin:0; padding:0; width:100% !important; background:#F8FAFC; font-family: 'Segoe UI', Roboto, Arial, sans-serif; }
  @media screen and (max-width:600px) {
    .container { width:100% !important; }
    .stack { display:block !important; width:100% !important; }
    .pad { padding:20px !important; }
  }
</style>
</head>
<body style="margin:0; padding:0; background-color:#F8FAFC;">
  <center style="width:100%; background-color:#F8FAFC; padding:40px 0;">
    <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:16px; overflow:hidden; border:1px solid #E2E8F0; margin:0 auto;">
      
      <!-- HEADER -->
      <tr>
        <td align="center" style="padding:40px; background-color:#0F3452;">
          <div style="color:#2E9DDB; font-size:24px; font-weight:800; letter-spacing:1px;">NIA - ${data.chapterName}</div>
          <h1 style="color:#ffffff; margin:10px 0 0; font-size:28px;">Visitor Pass Request</h1>
          <p style="color:#CBD5E1; font-size:16px; margin:5px 0 0;">New Membership Inquiry & Meeting Request</p>
        </td>
      </tr>

      <!-- INTRODUCTION -->
      <tr>
        <td style="padding: 30px 40px 0 40px;">
          <p style="color: #1E293B; font-size: 16px; line-height: 1.6; margin: 0; font-weight: 600;">Hello Contact Us Team,</p>
          <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 15px 0 0 0;">
            You have received a new request for a <strong>Visitor Pass</strong>. The following individual has expressed interest in attending a session to explore our network.
          </p>
        </td>
      </tr>

      <!-- MEETING DETAILS CARD -->
      <tr>
        <td style="padding:30px 40px 20px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F0F9FF; border:1px solid #BAE6FD; border-radius:12px;">
            <tr>
              <td style="padding:20px;">
                <div style="font-size:11px; font-weight:800; color:#0369A1; text-transform:uppercase; letter-spacing:1px;">Requested Meeting</div>
                <h2 style="margin:8px 0 0; color:#0F3452; font-size:20px;">${data.meetingDay}, ${data.meetingDate}</h2>
                <p style="margin:6px 0; color:#334155; font-size:14px;"><strong>Topic:</strong> ${data.meetingTopic}</p>
                <p style="margin:6px 0; color:#334155; font-size:14px;"><strong>Venue:</strong> ${data.venue}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- VISITOR INFO SECTION -->
      <tr>
        <td style="padding:0 40px;">
          <h3 style="color:#0F3452; border-bottom:1px solid #E2E8F0; padding-bottom:10px; font-size:18px;">Visitor Background</h3>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="50%" style="padding:8px;">
                <div style="background-color:#F8FAFC; border:1px solid #E2E8F0; border-radius:12px; padding:14px;">
                  <div style="font-size:11px; font-weight:700; color:#64748B; text-transform:uppercase;">Full Name</div>
                  <div style="margin-top:6px; font-weight:600; color:#1E293B;">${data.visitorName}</div>
                </div>
              </td>
              <td width="50%" style="padding:8px;">
                <div style="background-color:#F8FAFC; border:1px solid #E2E8F0; border-radius:12px; padding:14px;">
                  <div style="font-size:11px; font-weight:700; color:#64748B; text-transform:uppercase;">Email</div>
                  <div style="margin-top:6px;"><a href="mailto:${data.visitorEmail}" style="color:#2563EB; text-decoration:none; font-weight:500;">${data.visitorEmail}</a></div>
                </div>
              </td>
            </tr>
            <tr>
              <td width="50%" style="padding:8px;">
                <div style="background-color:#F8FAFC; border:1px solid #E2E8F0; border-radius:12px; padding:14px;">
                  <div style="font-size:11px; font-weight:700; color:#64748B; text-transform:uppercase;">Phone</div>
                  <div style="margin-top:6px; font-weight:600; color:#1E293B;">${data.visitorPhone}</div>
                </div>
              </td>
              <td width="50%" style="padding:8px;">
                <div style="background-color:#F8FAFC; border:1px solid #E2E8F0; border-radius:12px; padding:14px;">
                  <div style="font-size:11px; font-weight:700; color:#64748B; text-transform:uppercase;">Specialty</div>
                  <div style="margin-top:6px; font-weight:600; color:#1E293B;">${data.visitorSpecialty}</div>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="padding:20px 8px 0 8px;">
                <div style="font-size:11px; font-weight:800; color:#64748B; text-transform:uppercase; letter-spacing:1px;">Visitor Notes</div>
                <div style="margin-top:10px; padding:16px; border-radius:12px; border:1px solid #E2E8F0; border-left:5px solid #0F3452; background-color:#ffffff;">
                  <p style="margin:0; font-size:14px; line-height:1.6; color:#334155;">${data.visitorNotes}</p>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- CTA BUTTON -->
      <tr>
        <td align="center" style="padding:40px;">
          <a href="${data.adminDashboardLink}" style="background-color:#0F3452; color:#ffffff; padding:16px 36px; border-radius:10px; text-decoration:none; font-weight:700; display:inline-block; font-size:16px;">Approve Visitor Pass</a>
          <div style="margin-top:15px;">
            <a href="#" style="color:#94A3B8; font-size:13px; text-decoration:none; font-weight:600;">Decline Request</a>
          </div>
        </td>
      </tr>

      <!-- FOOTER -->
      <tr>
        <td align="center" style="padding:30px; background-color:#f1f5f9; border-top:1px solid #E2E8F0;">
          <p style="color:#64748B; font-size:13px; margin:0 0- 10px 0;">Need help? Contact us at <a href="mailto:admin@niasurat.com" style="color:#2E9DDB; text-decoration:none;">admin@niasurat.com</a></p>
          <p style="color:#94A3B8; font-size:11px; margin:0;">&copy; 2026 NIA Surat - A Network In Action chapter. All rights reserved.</p>
        </td>
      </tr>
    </table>
  </center>
</body>
</html>
`;

export const sendInquiryEmail: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  if (operation !== "create") return;
  const { payload } = req;

  try {
    const chapterId = typeof doc.chapter === "object" ? doc.chapter.id : doc.chapter;
    const chapter = await payload.findByID({ collection: "chapters", id: chapterId });

    if (chapter && chapter.email) {
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

      const emailHtml = getVisitorEmailHtml({
        chapterName: chapter.name,
        meetingDay: doc.meetingDetails?.day || "N/A",
        meetingDate: doc.meetingDetails?.date || "N/A",
        meetingTopic: doc.meetingDetails?.topic || "N/A",
        venue: doc.meetingDetails?.venue || chapter.venue || "N/A",
        visitorName: doc.name,
        visitorEmail: doc.email,
        visitorPhone: doc.phone,
        visitorSpecialty: doc.specialty,
        visitorNotes: doc.notes || "No additional notes provided.",
        adminDashboardLink: `${serverUrl}/admin/collections/inquiries/${doc.id}`,
      });

      await payload.sendEmail({
        to: chapter.email as string,
        from: process.env.SMTP_FROM_ADDRESS || "admin@niasurat.com",
        subject: `New Visitor Request: ${doc.name} (${chapter.name})`,
        html: emailHtml,
      });
    }
  } catch (error) {
    console.error("Error in sendInquiryEmail hook:", error);
  }
};
