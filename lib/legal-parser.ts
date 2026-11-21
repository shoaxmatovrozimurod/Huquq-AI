
export function extractLegalArticle(
    html: string,
    articleNumber: number
): string | null {
    const startPattern = new RegExp(
        `Статья\\s*${articleNumber}\\.`,
        "i"
    );

    const nextPattern = new RegExp(
        `Статья\\s*${articleNumber + 1}\\.`,
        "i"
    );

    const startIndex = html.search(startPattern);

    if (startIndex === -1) {
        return null;
    }

    const remainingHtml = html.slice(startIndex);
    const nextMatch = nextPattern.exec(remainingHtml);

    const articleHtml = nextMatch
        ? remainingHtml.slice(0, nextMatch.index)
        : remainingHtml;

    const cleanText = articleHtml
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    return cleanText || null;
}
    