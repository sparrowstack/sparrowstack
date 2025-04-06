export const isJsonString = ({ jsonString }: { jsonString: string }) => {
	let isJsonString = false;

	// Return false for null, undefined, or empty strings
	if (
		!jsonString ||
		(typeof jsonString === 'string' && jsonString.trim() === '')
	) {
		return false;
	}

	// Return false if not a string
	if (typeof jsonString !== 'string') {
		return false;
	}

	// If the result is a JSON object
	try {
		JSON.parse(jsonString);
		isJsonString = true;
	} catch {
		isJsonString = false;
	}

	return isJsonString;
};
