"use server"

import { Resend } from "resend"
import { ContactEmail } from "@/emails/contact-email" // Import the component from its new dedicated file

const resend = new Resend(process.env.RESEND_API_KEY)

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
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev", // Replace with your verified Resend domain email
      to: "delivered@resend.dev", // Replace with the recipient email address
      subject: "New Contact Form Submission from Website",
      react: ContactEmail({ name, email, phone, message }),
    })

    if (error) {
      console.error("Resend email error:", error)
      return { success: false, message: error.message || "Failed to send email." }
    }

    console.log("Email sent successfully:", data)
    return { success: true, message: "Email sent successfully!" }
  } catch (error) {
    console.error("Server action error:", error)
    return { success: false, message: "An unexpected error occurred." }
  }
}
