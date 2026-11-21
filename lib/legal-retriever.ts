
import { fetchLegalPage } from "@/lib/legal-fetcher";
import { extractLegalArticle } from "@/lib/legal-parser";

export async function getKazakhstanLaborArticle(
    articleNumber: number
) {
    const sourceUrl =
        "https://adilet.zan.kz/rus/docs/K1500000414";

    const apiUrl =
        "https://adilet.zan.kz/api/documents/by-ngr/K1500000414?language=rus";

    const result = await fetchLegalPage(apiUrl);

    if (!result.success || !result.html) {
        return null;
    }

    try {
        const data = JSON.parse(result.html);
        const html = data.document?.text_content;

        if (typeof html !== "string") {
            return null;
        }

        const article = extractLegalArticle(html, articleNumber);

        if (!article) {
            return null;
        }

        return {
            country: "KZ",
            document: "Qozog‘iston Mehnat kodeksi",
            articleNumber,
            text: article,
            sourceUrl,
        };
    } catch {
        return null;
    }
}
