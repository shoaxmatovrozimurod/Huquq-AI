
import { NextRequest, NextResponse } from "next/server";
import { analyzeFactlensFile } from "@/lib/factlens";
export const runtime = "nodejs";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const image = formData.get("image");

        if (!(image instanceof File)) {
            return NextResponse.json(
                { error: "IMAGE_REQUIRED" },
                { status: 400 }
            );
        }

        if (
            !["image/jpeg", "image/png", "image/webp"].includes(
                image.type
            )
        ) {
            return NextResponse.json(
                { error: "INVALID_IMAGE_TYPE" },
                { status: 400 }
            );
        }

        if (image.size > MAX_IMAGE_SIZE) {
            return NextResponse.json(
                { error: "IMAGE_TOO_LARGE" },
                { status: 413 }
            );
        }

        const result = await analyzeFactlensFile(image);

        return NextResponse.json({
            success: true,
            aiProbability: result.aiProbability,
            classification: result.classification,
        });

    } catch (error) {
        console.error("Factlens API xatoligi:", error);

        return NextResponse.json(
            { error: "ANALYSIS_ERROR" },
            { status: 500 }
        );
    }
}
