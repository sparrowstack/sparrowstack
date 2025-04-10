import type { GenerateContentCandidate } from '@google/generative-ai';

interface Params {
	candidate: GenerateContentCandidate;
}

export const getCandidateData = ({ candidate }: Params) => {
	const { content, finishReason } = candidate;
	const { role, parts } = content;
	const [part1] = parts;
	const { text } = part1;
	const type = Object.keys(part1)[0];

	return { role, text, type, finishReason };
};
