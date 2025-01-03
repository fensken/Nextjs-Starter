import React from "react";
import {
  Html,
  Button as EmailButton,
  Text,
  Container,
  Section,
  Preview,
  Body,
  Heading,
  Hr,
} from "@react-email/components";

// Types
export interface EmailTemplateProps {
  name: string;
  url: string;
}

// Shared Styles
const styles = {
  main: {
    backgroundColor: "#ffffff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  },
  h1: {
    color: "#1a1a1a",
    fontSize: "24px",
    fontWeight: "bold",
    margin: "40px 0",
    padding: "0",
  },
  text: {
    color: "#333333",
    fontSize: "16px",
    lineHeight: "24px",
  },
  textDark: {
    color: "#1a1a1a",
    fontSize: "16px",
    lineHeight: "24px",
  },
  button: {
    backgroundColor: "#2563eb",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "12px 24px",
    margin: "20px 0",
  },
  box: {
    backgroundColor: "#EFF6FF",
    borderRadius: "8px",
    padding: "20px",
    margin: "20px 0",
  },
  warningBox: {
    backgroundColor: "#FEF9C3",
    borderRadius: "8px",
    padding: "20px",
    margin: "20px 0",
  },
  hr: {
    borderColor: "#cccccc",
    margin: "20px 0",
  },
  footer: {
    color: "#666666",
    fontSize: "14px",
    lineHeight: "24px",
  },
};

export const WelcomeDemoEmail = ({ name, url }: EmailTemplateProps) => (
  <Html>
    <Preview>Welcome to Zinx!</Preview>
    <Body style={styles.main}>
      <Container>
        <Section>
          <Heading style={styles.h1}>Welcome to Zinx</Heading>
          <Text style={styles.text}>Hi {name},</Text>
          <Text style={styles.text}>
            Welcome to Zinx! We're excited to have you on board. To get started,
            please verify your email address by clicking the button below:
          </Text>

          <Section style={styles.box}>
            <Text style={styles.textDark}>
              🎉 You're just one click away from accessing all of Zinx's
              features!
            </Text>
          </Section>

          <Section style={{ textAlign: "center" }}>
            <EmailButton href={url} style={styles.button}>
              Verify Email
            </EmailButton>
          </Section>

          <Hr style={styles.hr} />

          <Text style={styles.footer}>
            If you didn't create a Zinx account, you can safely ignore this
            email.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export const ResetPasswordDemoEmail = ({ name, url }: EmailTemplateProps) => (
  <Html>
    <Preview>Reset Your Zinx Password</Preview>
    <Body style={styles.main}>
      <Container>
        <Section>
          <Heading style={styles.h1}>Reset Your Password</Heading>
          <Text style={styles.text}>Hi {name},</Text>
          <Text style={styles.text}>
            We received a request to reset your password. Click the button below
            to set a new password:
          </Text>

          <Section style={styles.warningBox}>
            <Text style={styles.textDark}>
              ⚠️ This link will expire in 24 hours for security reasons.
            </Text>
          </Section>

          <Section style={{ textAlign: "center" }}>
            <EmailButton href={url} style={styles.button}>
              Reset Password
            </EmailButton>
          </Section>

          <Hr style={styles.hr} />

          <Text style={styles.footer}>
            If you didn't request this password reset, please ignore this email
            or contact support if you have concerns.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);
