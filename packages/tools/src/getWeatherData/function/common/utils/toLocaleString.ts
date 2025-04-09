interface Params {
	timeZone: string;
	timestampSeconds: number;
}

export const toLocaleString = ({ timestampSeconds, timeZone }: Params) => {
	return new Date(timestampSeconds * 1000).toLocaleString('en-US', {
		timeZone,
	});
};
