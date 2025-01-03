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

interface VerificationEmailProps {
  name?: string;
  url?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  ? process.env.NEXT_PUBLIC_APP_URL
  : "";

export const VerificationEmail = ({ name, url }: VerificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Verify your email for Zinx</Preview>
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
              Welcome to Zinx! To get started, please verify your email address
              by clicking the button below:
            </Text>
            <Button style={button} href={url}>
              Verify Email
            </Button>
            <Text style={text}>
              If you didn&apos;t sign up for Zinx, please ignore and delete this
              email.
            </Text>
            <Text style={text}>
              Need help? Visit our{" "}
              <Link style={anchor} href={`${baseUrl}/help`}>
                Help Center
              </Link>
              .
            </Text>
            <Text style={text}>Thanks for joining Zinx!</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default VerificationEmail;

const main = {
  backgroundColor: "#f0f0f0",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "0.5rem",
  padding: "45px",
  boxShadow:
    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  fontWeight: "400",
  color: "#1f2937",
  lineHeight: "1.5",
};

const button = {
  backgroundColor: "#0f172a",
  borderRadius: "0.375rem",
  color: "#ffffff",
  fontFamily:
    "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  border: "1px solid #1f2937",
};

const anchor = {
  textDecoration: "underline",
  color: "#0f172a",
  fontWeight: "500",
};
