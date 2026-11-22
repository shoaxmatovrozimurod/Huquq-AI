
export type FactlensResult = {
    aiProbability: number;
    classification: "likely_ai" | "uncertain" | "likely_real";
};

export function classifyFactlensScore(
    aiProbability: number
): FactlensResult {
    const classification =
        aiProbability >= 0.7
            ? "likely_ai"
            : aiProbability <= 0.3
                ? "likely_real"
                : "uncertain";

    return {
        aiProbability,
        classification,
    };
}

export async function analyzeFactlensImage(
    imageUrl: string
): Promise<FactlensResult> {
    const apiUser = process.env.SIGHTENGINE_API_USER;
    const apiSecret = process.env.SIGHTENGINE_API_SECRET;

    if (!apiUser || !apiSecret) {
        throw new Error("Sightengine API kalitlari topilmadi.");
    }

    const params = new URLSearchParams({
        url: imageUrl,
        models: "genai",
        api_user: apiUser,
        api_secret: apiSecret,
    });

    const response = await fetch(
        `https://api.sightengine.com/1.0/check.json?${params}`,
        {
            method: "GET",
            cache: "no-store",
            signal: AbortSignal.timeout(30000),
        }
    );

    if (!response.ok) {
        throw new Error("Sightengine API so‘rovida xatolik.");
    }

    const data: {
        type?: { ai_generated?: number };
    } = await response.json();

    const probability = data.type?.ai_generated;

    if (
        typeof probability !== "number" ||
        !Number.isFinite(probability) ||
        probability < 0 ||
        probability > 1
    ) {
        throw new Error("Sightengine noto‘g‘ri natija qaytardi.");
    }

    return classifyFactlensScore(probability);
}

export async function analyzeFactlensFile(
    image: File
): Promise<FactlensResult> {
    const apiUser = process.env.SIGHTENGINE_API_USER;
    const apiSecret = process.env.SIGHTENGINE_API_SECRET;

    if (!apiUser || !apiSecret) {
        throw new Error("Sightengine API kalitlari topilmadi.");
    }

    const formData = new FormData();

    formData.append("media", image);
    formData.append("models", "genai");
    formData.append("api_user", apiUser);
    formData.append("api_secret", apiSecret);

    const response = await fetch(
        "https://api.sightengine.com/1.0/check.json",
        {
            method: "POST",
            body: formData,
            cache: "no-store",
            signal: AbortSignal.timeout(30000),
        }
    );

    if (!response.ok) {
        throw new Error("Sightengine API so‘rovida xatolik.");
    }

    const data: {
        status?: string;
        type?: {
            ai_generated?: number;
        };
    } = await response.json();

    if (data.status !== "success") {
        throw new Error("Sightengine tahlili muvaffaqiyatsiz.");
    }

    const probability = data.type?.ai_generated;

    if (
        typeof probability !== "number" ||
        !Number.isFinite(probability) ||
        probability < 0 ||
        probability > 1
    ) {
        throw new Error("Sightengine noto‘g‘ri natija qaytardi.");
    }

    return classifyFactlensScore(probability);
}

