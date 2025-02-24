
import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"

const resend = new Resend(Deno.env.get("RESEND_API_KEY"))

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { order } = await req.json()

    // Send email to customer
    const customerEmail = await resend.emails.send({
      from: "Web+ Studio <onboarding@resend.dev>",
      to: [order.email],
      subject: "Your Web+ Studio Order Confirmation",
      html: `
        <h1>Thanks for your order, ${order.name}!</h1>
        <p>We've received your order for a ${order.product} website.</p>
        <h2>Order Details:</h2>
        <ul>
          <li>Site Type: ${order.product}</li>
          <li>Additional Notes: ${order.notes || 'None'}</li>
          <li>Quantity: ${order.quantity}</li>
        </ul>
        <p>We'll contact you shortly at ${order.phone || 'your email address'} to discuss your requirements.</p>
        <p>Best regards,<br>Web+ Studio Team</p>
      `
    })

    // Send notification to owner
    const ownerEmail = await resend.emails.send({
      from: "Web+ Studio Orders <onboarding@resend.dev>",
      to: ["owner@webplusstudio.com"], // Replace with your email
      subject: "New Web+ Studio Order",
      html: `
        <h1>New Order Received!</h1>
        <h2>Customer Details:</h2>
        <ul>
          <li>Name: ${order.name}</li>
          <li>Email: ${order.email}</li>
          <li>Phone: ${order.phone || 'Not provided'}</li>
          <li>Address: ${order.address}</li>
        </ul>
        <h2>Order Details:</h2>
        <ul>
          <li>Site Type: ${order.product}</li>
          <li>Additional Notes: ${order.notes || 'None'}</li>
          <li>Quantity: ${order.quantity}</li>
        </ul>
      `
    })

    console.log('Emails sent successfully:', { customerEmail, ownerEmail })

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Error sending emails:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})
