
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderData {
  name: string;
  email: string;
  phone: string;
  address: string;
  product: string;
  quantity: number;
  notes: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { order }: { order: OrderData } = await req.json();
    console.log("Sending order confirmation email for:", order);

    const emailResponse = await resend.emails.send({
      from: "orders@yourdomain.com",
      to: [order.email],
      subject: "Order Confirmation",
      html: `
        <h1>Thank you for your order, ${order.name}!</h1>
        <h2>Order Details:</h2>
        <ul>
          <li>Product: ${order.product}</li>
          <li>Quantity: ${order.quantity}</li>
          <li>Shipping Address: ${order.address}</li>
          ${order.notes ? `<li>Notes: ${order.notes}</li>` : ''}
        </ul>
        <p>We'll process your order shortly and send you an update when it ships.</p>
        <p>Best regards,<br>Your Company Name</p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-order-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
