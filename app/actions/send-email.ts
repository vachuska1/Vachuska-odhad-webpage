"use server"

import { Resend } from "resend"
import { ContactEmail } from "@/emails/contact-email"

const resend = new Resend(process.env.RESEND_API_KEY)

// Helper function to create HTML email content
function createEmailContent({ name, email, phone, message }: { name: string; email: string; phone: string; message: string }) {
  return `
    <div style="font-family: sans-serif; line-height: 1.6">
      <h1>New Contact Form Submission</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    </div>
  `
}

export async function sendEmail(prevState: any, formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const message = formData.get("message") as string
  const gdprAgreed = formData.get("gdprAgreed") === "on"

  if (!gdprAgreed) {
    return { success: false, message: "GDPR consent is required." }
  }

  if (!name || !email || !message) {
    return { success: false, message: "Name, email, and message are required fields." }
  }

  try {
    const emailHtml = createEmailContent({ name, email, phone, message });
    
    // Always send to odhadyvachuska@gmail.com
    const toEmail = 'odhadyvachuska@gmail.com';
    
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: toEmail,
      replyTo: email, // So you can reply directly to the sender
      subject: `New Contact Form Submission from ${name}`,
      html: emailHtml,
    })

    if (error) {
      console.error("Resend email error:", error)
      return { success: false, message: error.message || "Failed to send email." }
    }

    console.log("Email sent successfully:", data)
    return { success: true, message: "Email byl odeslán úspěšně." }
  } catch (error) {
    console.error("Server action error:", error)
    return { success: false, message: "An unexpected error occurred." }
  }
}
