interface IOptions {
	response: string;
}

export const printResponse = ({ response }: IOptions) => {
	console.log('');
	console.log(`Agent: ${JSON.stringify(response, null, 2)}`);
	console.log('');
};
