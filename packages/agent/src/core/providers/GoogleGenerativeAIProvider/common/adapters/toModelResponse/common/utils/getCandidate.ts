import type {
	GenerateContentResult,
	GenerateContentCandidate,
} from '@google/generative-ai';

interface Params {
	response: GenerateContentResult;
	index: number;
}

export const getCandidate = ({ response, index }: Params) => {
	const { response: responseData } = response;
	const { candidates } = responseData;
	const candidate = candidates?.[index] as GenerateContentCandidate;

	return candidate;
};
