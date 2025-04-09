import type { Section } from '@sparrowstack/system-prompt';

export const variableStyling: Section = {
	title: 'Variable Styling',
	bullets: [
		'Variable names should allways be descriptive and meaningful',
		'Never use single letter variable names',
	],
	examples: [
		`\`\`\`typescript
// src/utils/sortNumbers.ts

interface Params {
  numbers: number[];
}

export const sortNumbersDescending = ({ numbers }: Params): number[] =>
  [...numbers].sort((firstNumber, secondNumber) => secondNumber - firstNumber);
\`\`\``,
	],
};
