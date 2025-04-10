interface Params {
	timestampSeconds: number;
}

export const toISOString = ({ timestampSeconds }: Params) => {
	return new Date(timestampSeconds * 1000).toISOString();
};
