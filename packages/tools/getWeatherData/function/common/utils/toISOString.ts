interface IParams {
	timestampSeconds: number;
}

export const toISOString = ({ timestampSeconds }: IParams) => {
	return new Date(timestampSeconds * 1000).toISOString();
};
