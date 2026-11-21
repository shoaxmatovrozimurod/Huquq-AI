
export async function fetchLegalPage(url: string) {
    try {
        const parsedUrl = new URL(url);

        if (parsedUrl.protocol !== "https:") {
            throw new Error("Faqat HTTPS manzillarga ruxsat beriladi");
        }

        const response = await fetch(parsedUrl.toString(), {
            method: "GET",
            headers: {
                Accept: "text/html",
            },
            signal: AbortSignal.timeout(45000),
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`HTTP xatolik: ${response.status}`);
        }

        const html = await response.text();

        return {
            success: true,
            html,
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Noma'lum xatolik",
        };
    }
}
