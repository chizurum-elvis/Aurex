import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function PATCH(request: Request) {
    try {
        // 1. Grab the current user session securely on the server side
        const session = await auth();
        const userId = session?.userId;

        if (!userId) {
            return NextResponse.json(
                { success: false, error: "Unauthorized access" },
                { status: 401 }
            );
        }

        // 2. Extract the incoming new display name from the request body
        const body = await request.json();
        const { displayName } = body;

        if (!displayName || displayName.trim() === "") {
            return NextResponse.json(
                { success: false, error: "Display name cannot be empty" },
                { status: 400 }
            );
        }

        // 3. Update the user's metadata directly inside Clerk (No database model needed!)
        const client = await clerkClient();
        await client.users.updateUser(userId, {
            publicMetadata: {
                customDisplayName: displayName.trim(),
            },
        });

        return NextResponse.json({
            success: true,
            message: "Profile updated successfully inside authorization metadata.",
        });

    } catch (error: any) {
        console.error("CLERK METADATA UPDATE ERROR:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}