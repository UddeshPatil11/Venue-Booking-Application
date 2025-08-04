import nodemailer from 'nodemailer';

interface EmailOptions {
  email: string;
  subject: string;
  message: string;
}

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  // Create transporter
  const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  // Define email options
  const mailOptions = {
    from: `"Venue Booking System" <${process.env.SMTP_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3B82F6;">Venue Booking System</h2>
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px;">
          <p style="white-space: pre-line;">${options.message}</p>
        </div>
        <p style="color: #64748b; font-size: 12px; margin-top: 20px;">
          This is an automated email from Venue Booking System. Please do not reply to this email.
        </p>
      </div>
    `
  };

  // Send email
  await transporter.sendMail(mailOptions);
};