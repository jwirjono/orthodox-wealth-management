import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { firstName, email, phone, preferredMethod } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPIENT,
      subject: `New Inquiry for Adriel Louis Management - ${firstName}`,
      text: `Name: ${firstName}\nEmail: ${email}\nPhone: ${phone}\nMethod: ${preferredMethod}`,
    });

    return res.status(200).json({ message: "Inquiry sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to send inquiry" });
  }
}