// types/midtrans-client.d.ts
declare module 'midtrans-client' {
    class Snap {
        constructor(options: { isProduction: boolean; serverKey?: string; clientKey?: string });
        createTransaction(parameter: object): Promise<{ token: string; redirect_url: string }>;
    }

    export { Snap };
}
