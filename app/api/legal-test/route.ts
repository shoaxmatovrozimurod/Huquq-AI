import { extractLegalArticle } from "@/lib/legal-parser";
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


            const article88Clean = article88Html
                .replace(/<[^>]*>/g, " ")
                .replace(/&nbsp;/g, " ")
                .replace(/\s+/g, " ")
                .trim();

            console.log("88-modda toza matni:", article88Clean);

            console.log(article88Html);
            console.log("88-modda uzunligi:", article88Html.length);
        }
    }

    const article88 = extractLegalArticle(documentText, 88);
    const article52 = extractLegalArticle(documentText, 52);
    return NextResponse.json({
        article52: article52,
        article88: article88,
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
