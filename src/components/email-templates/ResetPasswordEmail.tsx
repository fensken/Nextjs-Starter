import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ResetPasswordEmailProps {
  name?: string;
  url?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  ? process.env.NEXT_PUBLIC_APP_URL
  : "";

export const ResetPasswordEmail = ({ name, url }: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Reset Your Zinx Password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={process.env.NEXT_PUBLIC_LOGO_URL}
            width="40"
            height="33"
            alt="Zinx"
          />
          <Section>
            <Text style={text}>Hi {name},</Text>
            <Text style={text}>
              We received a request to reset the password for your Zinx account.
              Click the button below to reset your password. If you did not
              request a password reset, please ignore this email or contact
              support if you have any concerns.
            </Text>
            <Button style={button} href={url}>
              Reset Password
            </Button>
            <Text style={text}>
              This password reset link will expire in 1 hour for your security.
            </Text>
            <Text style={text}>
              Need help? Visit our{" "}
              <Link style={anchor} href={`${baseUrl}/help`}>
                Help Center
              </Link>
              .
            </Text>
            <Text style={warningText}>
              If you did not request this password reset, no further action is
              required.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ResetPasswordEmail;

const main = {
  backgroundColor: "#f0f0f0", // Stone theme background
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #e2e8f0", // Soft stone-inspired border
  borderRadius: "0.5rem", // Shadcn's typical rounded corners
  padding: "45px",
  boxShadow:
    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)", // Subtle shadow
};

const text = {
  fontSize: "16px",
  fontFamily:
    "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif", // New York style font
  fontWeight: "400",
  color: "#1f2937", // Dark gray, typical of Shadcn's typography
  lineHeight: "1.5",
};

const warningText = {
  ...text,
  color: "#991b1b", // Dark red for important security notice
  fontWeight: "500",
  marginTop: "20px",
};

const button = {
  backgroundColor: "#0f172a", // Dark background from stone theme
  borderRadius: "0.375rem", // Shadcn's button border radius
  color: "#ffffff",
  fontFamily:
    "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)", // Subtle shadow
  border: "1px solid #1f2937", // Subtle border
};

const anchor = {
  textDecoration: "underline",
  color: "#0f172a", // Matching the button's dark background
  fontWeight: "500",
};
