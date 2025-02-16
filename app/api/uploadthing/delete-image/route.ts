import { utapi } from "@/lib/actions/uploadthing";


export async function DELETE(req: Request) {
    try {
        const { fileKey } = await req.json();
        if (!fileKey) {
            return new Response(JSON.stringify({ success: false, message: 'Invalid fileKey' }), { status: 400 });
        }

        await utapi.deleteFiles(fileKey);

        return new Response(JSON.stringify({ success: true, message: 'Image deleted successfully' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: "failed to delete image!", error }), { status: 500 });
    }
}
