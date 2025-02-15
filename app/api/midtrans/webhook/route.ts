
import Order from "@/lib/db/models/order.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { order_id } = body;



    //  1. Ambil data transaksi dari Midtrans langsung
    const midtransResponse = await fetch(`https://api.sandbox.midtrans.com/v2/${order_id}/status`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(process.env.MIDTRANS_SERVER_KEY + ":").toString("base64")}`,
      },
    });
    const midtransData = await midtransResponse.json();

    //  2. Cek validitas transaksi
    if (!midtransData || midtransData.status_code !== "200") {
      return NextResponse.json({ success: false, message: "Invalid transaction from Midtrans" }, { status: 403 });
    }

    //  3. Ambil order dari database
    const order = await Order.findById(order_id);
    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    //  4. Update status pembayaran
    let updatedStatus = "pending";
    const { transaction_status, fraud_status } = midtransData;

    if (transaction_status === "settlement") {
      updatedStatus = "paid";
      order.isPaid = true;
      order.paidAt = new Date();
    } else if (transaction_status === "expire") {
      updatedStatus = "expired";
    } else if (transaction_status === "cancel" || transaction_status === "deny") {
      updatedStatus = "canceled";
    } else if (transaction_status === "pending") {
      updatedStatus = "pending";
    } else if (transaction_status === "capture" && fraud_status === "accept") {
      updatedStatus = "paid";
      order.isPaid = true;
      order.paidAt = new Date();
    } else if (transaction_status === "capture" && fraud_status !== "accept") {
      updatedStatus = "on-hold";
    }

    // ✅ 5. Update status di database
    order.paymentResult ??= { status: "", id: "", email_address: "", pricePaid: "0" };
    order.paymentResult.status = updatedStatus;

    await order.save();


    // ✅ 6. Response sukses ke Midtrans
    return NextResponse.json({ success: true, message: "Payment status updated" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ success: false, message: "Internal Server Error", error }, { status: 500 });
  }
}
