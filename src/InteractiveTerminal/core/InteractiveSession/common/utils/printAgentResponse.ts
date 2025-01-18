interface IOptions {
	response: string;
}

export const printAgentResponse = ({ response }: IOptions) => {
	console.log('');
	console.log(`Agent: ${response}`);
	console.log('');
};
