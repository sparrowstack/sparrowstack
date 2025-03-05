import type { GenerateContentCandidate } from '@google/generative-ai';

interface IParams {
	candidate: GenerateContentCandidate;
}

export const getCandidateData = ({ candidate }: IParams) => {
	const { content, finishReason } = candidate;
	const { role, parts } = content;
	const [part1] = parts;
	const { text } = part1;
	const type = Object.keys(part1)[0];

	return { role, text, type, finishReason };
};
