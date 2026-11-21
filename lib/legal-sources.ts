
export const legalSources = {
    UZ: {
        name: "O‘zbekiston",
        officialWebsite: "https://lex.uz",
        description: "O‘zbekiston Respublikasi qonunchilik ma’lumotlari milliy bazasi",
    },
    KZ: {
        name: "Qozog‘iston",
        officialWebsite: "https://adilet.zan.kz",
        description: "Qozog‘iston Respublikasining huquqiy axborot tizimi",
    },
    KG: {
        name: "Qirg‘iziston",
        officialWebsite: "https://cbd.minjust.gov.kg",
        description: "Qirg‘iziston Respublikasining huquqiy hujjatlar bazasi",
    },
    TJ: {
        name: "Tojikiston",
        officialWebsite: "https://mmk.tj",
        description: "Tojikiston Respublikasining qonunchilik manbasi",
    },
    TM: {
        name: "Turkmaniston",
        officialWebsite: "https://minjust.gov.tm",
        description: "Turkmaniston Adliya vazirligining rasmiy sayti",
    },
} as const;

export type LegalCountry = keyof typeof legalSources;
export function getLegalSource(country: string) {
    const code = country.toUpperCase() as LegalCountry;

    if (code in legalSources) {
        return legalSources[code];
    }

    return null;
}
