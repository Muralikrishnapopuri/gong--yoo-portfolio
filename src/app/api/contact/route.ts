import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const user = process.env.EMAIL_USER || "popurimurali16@gmail.com";
    // Gmail App Password or SMTP password
    const pass = process.env.EMAIL_PASS;

    if (!pass) {
      console.warn("EMAIL_PASS environment variable is not set. Email cannot be dispatched.");
      return NextResponse.json(
        { error: "SMTP credentials are not configured on the server. Please set EMAIL_PASS." },
        { status: 501 }
      );
    }

    // Configure SMTP transporter (default Gmail service)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: user,
        pass: pass
      }
    });

    const mailOptions = {
      from: email,
      to: "popurimurali16@gmail.com",
      subject: `Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("SMTP Mail error: ", error);
    return NextResponse.json(
      { error: error.message || "Failed to dispatch email." },
      { status: 500 }
    );
  }
}
