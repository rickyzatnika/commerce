"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { APP_NAME, APP_SLOGAN } from "@/lib/constants";
import Image from "next/image";

export default function FinishPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("order_id");
  return (
    <div className="w-full flex flex-col items-center space-y-6 md:space-y-20  h-full">
      <div className="flex flex-col items-center space-y-3 justify-start">
        <Image src="/icons/ceklis.png" alt='logo' width={100} height={75} priority={true} className="w-[90px] md:w-[120px] shadow-xl shadow-[#080808]/20 rounded-full p-0.5 bg-gradient-to-t via-transparent from-black/50 to-transparent" />
        <div className="text-center space-y-2">
          <h1 className="text-xl md:text-2xl font-bold">Memproses pembayaran...</h1>
          <p className="italic text-foreground text-sm md:text-md">Mohon ditunggu ya, team kami sedang memverifikasi pembayaran kamu.</p>
        </div>
      </div>

      <div className="text-center flex flex-col items-center justify-center space-y-14">
        {orderId ? (
          <Button className="flex items-end" variant="default" onClick={() => router.push(`/account/orders/${orderId}`)}>
            Cek status pembayaran
          </Button>
        ) : (

          <Button onClick={() => router.push("/account/orders")} variant="default">
            Kembali ke halaman pesanan
          </Button>

        )}

        <p className="text-sm italic text-foreground font-semibold">Terima kasih sudah berbelanja di toko kami, {APP_NAME} &rdquo;{APP_SLOGAN}&rdquo;</p>

      </div>
    </div>
  );
}