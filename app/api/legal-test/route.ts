
import { NextResponse } from "next/server";
import { fetchLegalPage } from "@/lib/legal-fetcher";

export async function GET() {
    const result = await fetchLegalPage("https://adilet.zan.kz/api/documents/by-ngr/K1500000414?language=rus");

    let documentText = "";

    if (result.success && result.html) {
        const data = JSON.parse(result.html);
        documentText = data.document?.text_content ?? "";
    }

    const article88Index = documentText.search(
        /Статья\s*88\./i
    );

    console.log(
        "88-modda topilgan joy:",
        article88Index
    );


    if (article88Index !== -1) {
        const article89Index = documentText.search(/Статья\s*89\./i);

        if (article89Index > article88Index) {
            const article88Html = documentText.slice(
                article88Index,
                article89Index
            );

            console.log("88-modda ajratildi:");
            console.log(article88Html);
            console.log("88-modda uzunligi:", article88Html.length);
        }
    }


    return NextResponse.json({

        documentTextLength: documentText.length,
        documentTextPreview: documentText.slice(0, 500),
        success: result.success,
        htmlLength: result.success ? result.html?.length : 0,
        hasJavaScriptApp: result.success
            ? /<script\b|type="module"|id="root"/i.test(result.html ?? "")
            : false,
        htmlPreview: result.success ? result.html?.slice(0, 500) : null,
        hasLaborCodeText: result.success
            ? /трудовой кодекс|еңбек кодексі/i.test(result.html ?? "")
            : false,
        error: result.success ? null : result.error,
    });
}
