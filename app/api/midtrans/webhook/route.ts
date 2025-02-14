import Order from "@/lib/db/models/order.model";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
    try {
        // ✅ 1. Ambil data dari request Midtrans
        const body = await req.json();
        const { order_id, transaction_status, fraud_status } = body;

        console.log("📩 Webhook received:", body);

        // ✅ 2. Verifikasi Signature Key dari Midtrans (opsional tapi disarankan)
        // const serverKey = process.env.MIDTRANS_SERVER_KEY; // Pastikan ini ada di .env
        // const expectedSignature = crypto
        //     .createHash("sha512")
        //     .update(order_id + gross_amount + serverKey)
        //     .digest("hex");

        // if (signature_key !== expectedSignature) {
        //     return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 403 });
        // }

        // ✅ 3. Cari order berdasarkan order_id
        const order = await Order.findById(order_id);
        if (!order) {
            return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
        }

        // ✅ 4. Update status pembayaran berdasarkan status dari Midtrans
        let updatedStatus = "pending";

        if (transaction_status === "settlement") {
            updatedStatus = "paid";
        } else if (transaction_status === "expire") {
            updatedStatus = "expired";
        } else if (transaction_status === "cancel" || transaction_status === "deny") {
            updatedStatus = "canceled";
        } else if (transaction_status === "pending") {
            updatedStatus = "pending";
        } else if (transaction_status === "capture" && fraud_status === "accept") {
            updatedStatus = "paid";
        } else if (transaction_status === "capture" && fraud_status !== "accept") {
            updatedStatus = "on-hold";
        }

        if (!order.paymentResult) {
            order.paymentResult = { status: "", id: "", email_address: "", pricePaid: "0" };
        }

        if (!order.isPaid) {
            order.isPaid = false;
        }

        order.paymentResult.status = updatedStatus;
        order.isPaid = true;

        await order.save();

        console.log(`✅ Payment status updated to: ${updatedStatus} for Order ID: ${order_id}`);

        // ✅ 5. Kirim response sukses ke Midtrans
        return NextResponse.json({ success: true, message: "Payment status updated" });
    } catch (error) {
        console.error("❌ Error handling Midtrans webhook:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
