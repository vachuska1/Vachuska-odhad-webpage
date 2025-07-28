import type * as React from "react"

interface ContactEmailProps {
  name: string
  email: string
  phone?: string
  message: string
}

export const ContactEmail: React.FC<Readonly<ContactEmailProps>> = ({ name, email, phone, message }) => (
  <div style={{ fontFamily: "sans-serif", lineHeight: "1.6" }}>
    <h1>New Contact Form Submission</h1>
    <p>
      <strong>Name:</strong> {name}
    </p>
    <p>
      <strong>Email:</strong> {email}
    </p>
    {phone && (
      <p>
        <strong>Phone:</strong> {phone}
      </p>
    )}
    <p>
      <strong>Message:</strong>
    </p>
    <p>{message}</p>
  </div>
)
