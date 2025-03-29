interface Params {
	output: string;
}

export const getResponse = ({ output }: Params) => {
	let response = output;
	let metadata;

	try {
		// Parse the output
		response = JSON.parse(output);
	} catch {}

	// If the response is not a string, it is an object
	// { text: '...', metadata: { ... } }
	if (typeof response !== 'string') {
		const { text, metadata: responseMetadata } = response;

		response = text;
		metadata = responseMetadata;
	}

	return { response, metadata };
};
