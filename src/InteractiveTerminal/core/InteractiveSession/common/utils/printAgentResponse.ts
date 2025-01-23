interface IParams {
	response: string;
}

export const printAgentResponse = ({ response }: IParams) => {
	console.log('');
	console.log(`Agent: ${response}`);
	console.log('');
};
