const generateRandomString = (length = 10): string =>
	Array.from({ length: length }, (_, i) => {
		const characters =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		return characters[Math.floor(Math.random() * characters.length)];
	}).join("");

export { generateRandomString }