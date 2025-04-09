import type { Block } from '@sparrowstack/system-prompt';

export const variableStyling: Block = {
	title: 'Variable Styling',
	items: [
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
