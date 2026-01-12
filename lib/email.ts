import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function sendOrderConfirmation(order: any, customerEmail: string) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: customerEmail,
    subject: `Order Confirmation - ${order.orderNumber}`,
    html: `
      <h1>Thank you for your order!</h1>
      <p>Your order #${order.orderNumber} has been received and is being processed.</p>
      <h2>Order Details:</h2>
      <ul>
        ${order.orderItems.map((item: any) => `
          <li>${item.name} - Quantity: ${item.quantity} - GH₵${item.price.toFixed(2)}</li>
        `).join('')}
      </ul>
      <p><strong>Total: GH₵${order.total.toFixed(2)}</strong></p>
      <p>We'll notify you when your order ships.</p>
      <p>Thank you for choosing Corporate Breeze!</p>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error }
  }
}

export async function sendContactNotification(message: any) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.SMTP_USER,
    subject: `New Contact Message: ${message.subject}`,
    html: `
      <h1>New Contact Message</h1>
      <p><strong>From:</strong> ${message.name}</p>
      <p><strong>Email:</strong> ${message.email}</p>
      <p><strong>Phone:</strong> ${message.phone || 'N/A'}</p>
      <p><strong>Subject:</strong> ${message.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.message}</p>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error }
  }
}

export async function sendServiceRequestNotification(request: any, userEmail: string) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: userEmail,
    subject: `Service Request Received: ${request.title}`,
    html: `
      <h1>Service Request Confirmation</h1>
      <p>Thank you for your service request!</p>
      <p><strong>Title:</strong> ${request.title}</p>
      <p><strong>Description:</strong> ${request.description}</p>
      <p><strong>Status:</strong> ${request.status}</p>
      <p>We'll review your request and get back to you soon.</p>
      <p>Thank you for choosing Corporate Breeze!</p>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error }
  }
}
