import type {
	GenerateContentResult,
	GenerateContentCandidate,
} from '@google/generative-ai';

interface IParams {
	response: GenerateContentResult;
	index: number;
}

export const getCandidate = ({ response, index }: IParams) => {
	const { response: responseData } = response;
	const { candidates } = responseData;
	const candidate = candidates?.[index] as GenerateContentCandidate;

	return candidate;
};
