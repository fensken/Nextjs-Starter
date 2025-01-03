import { Resend } from "resend";

import {
  WelcomeDemoEmail,
  ResetPasswordDemoEmail,
  EmailTemplateProps,
} from "src/components/email-templates/Demo";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailRequest {
  type: "welcome" | "reset-password";
  email: string;
  name: string;
  url: string;
}

export async function POST(request: Request) {
  try {
    const body: EmailRequest = await request.json();

    if (!body.type || !body.email || !body.name || !body.url) {
      return Response.json(
        { error: "Missing required fields: type, email, name, url" },
        { status: 400 }
      );
    }

    const emailConfig = {
      welcome: {
        subject: "Welcome to Zinx!",
        template: WelcomeDemoEmail,
      },
      "reset-password": {
        subject: "Reset Your Zinx Password",
        template: ResetPasswordDemoEmail,
      },
    };

    // Get the configuration for the requested email type
    const config = emailConfig[body.type];
    if (!config) {
      return Response.json({ error: "Invalid email type" }, { status: 400 });
    }

    // Common email properties
    const templateProps: EmailTemplateProps = {
      name: body.name,
      url: body.url,
    };

    // Send the email
    const { data, error } = await resend.emails.send({
      from: "Zinx <support@zinx.app>",
      to: body.email,
      subject: config.subject,
      react: config.template(templateProps),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({
      message: "Email sent successfully",
      data,
    });
  } catch (error) {
    console.error("Email sending error:", error);
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }
}
