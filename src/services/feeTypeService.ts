import axios from "axios";
import FeeType, { Language } from "../interfaces/FeeType";
import { faker } from "@faker-js/faker";

export const getFeeTypes = (): FeeType[] => {
	return Array.from({ length: 150 }, (_, i) => ({
        code: String(i+1),
        translations: {
            en: {
                name: faker.name.fullName(),
                description: faker.lorem.words(),
            },
            id: {
                name: faker.name.fullName(),
                description: faker.lorem.words(),
            },
            chn: {
                name: faker.name.fullName(),
                description: faker.lorem.words(),
            },
        },
        status: ["Active", "Inactive"][Math.floor(Math.random()*2)] as ("Active" | "Inactive"),
    }));
};
