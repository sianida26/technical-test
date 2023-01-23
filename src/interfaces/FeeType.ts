export enum Language {
	"id" = "id",
	"en" = "en",
	"chn" = "chn",
}

export default interface FeeType {
	code: string;
	translations: {
		[language in Language]: {
			name: string;
			description: string;
		};
	};
    status?: "Active" | "Inactive"
}