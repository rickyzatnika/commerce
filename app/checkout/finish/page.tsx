"use client";


import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function FinishPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderId = searchParams.get("order_id");




  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Memproses pembayaran...</h1>
      <p>Mohon tunggu, sedang memverifikasi status pembayaran Anda.</p>
      <Button variant="default" onClick={() => router.push(`/account/orders/${orderId}`)}>
        Kembali ke halaman pesanan
      </Button>
    </div>
  );
}