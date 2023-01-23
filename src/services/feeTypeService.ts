import axios from "axios";
import FeeType, { Language } from "../interfaces/FeeType";
import { faker } from "@faker-js/faker";
import { data } from "jquery";

const generateFeeTypes = (): FeeType[] => {
	const feeTypes = Array.from({ length: 150 }, (_, i) => ({
		code: String(i + 1),
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
		status: ["Active", "Inactive"][Math.floor(Math.random() * 2)] as
			| "Active"
			| "Inactive",
	}));

	window.localStorage.setItem("data", JSON.stringify(feeTypes));
	return feeTypes;
};

export const getFeeTypes = (): FeeType[] => {
	//@ts-ignore
	const data: FeeType[] = localStorage.getItem("data")
		? JSON.parse(localStorage.getItem("data")!)
		: generateFeeTypes();
	return data;
};

export const editFeeType = (updatedFeeType: FeeType) => {
	const feeTypes = getFeeTypes();
	const index = feeTypes.findIndex(
		(feeType) => feeType.code === updatedFeeType.code
	);
	if (index === -1) {
		console.error(`Fee type with code ${updatedFeeType.code} not found.`);
		return;
	}
	feeTypes[index] = updatedFeeType;
	window.localStorage.setItem("data", JSON.stringify(feeTypes));
};

export const deleteFeeType = (code: string) => {
	const feeTypes = getFeeTypes();
	const index = feeTypes.findIndex((feeType) => feeType.code === code);
	if (index === -1) {
		console.error(`Fee type with code ${code} not found.`);
		return;
	}
	feeTypes.splice(index, 1);
	window.localStorage.setItem("data", JSON.stringify(feeTypes));
};

export const createFeeType = (newFeeType: FeeType) => {
	const feeTypes = getFeeTypes();
	if (
		feeTypes.findIndex((feeType) => feeType.code === newFeeType.code) !== -1
	) {
		console.error(`Fee type with code ${newFeeType.code} already exists.`);
		return;
	}
	feeTypes.push(newFeeType);
	window.localStorage.setItem("data", JSON.stringify(feeTypes));
};
