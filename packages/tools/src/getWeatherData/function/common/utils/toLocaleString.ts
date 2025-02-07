interface IParams {
	timeZone: string;
	timestampSeconds: number;
}

export const toLocaleString = ({ timestampSeconds, timeZone }: IParams) => {
	return new Date(timestampSeconds * 1000).toLocaleString('en-US', {
		timeZone,
	});
};
