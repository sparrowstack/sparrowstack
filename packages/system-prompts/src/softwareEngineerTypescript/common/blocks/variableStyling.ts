import type { IBlock } from '@system-prompt';

export const variableStyling: IBlock = {
	title: 'Variable Styling',
	items: [
		'Variable names should allways be descriptive and meaningful',
		'Never use single letter variable names',
	],
	examples: [
		`\`\`\`typescript
// src/utils/sortNumbers.ts

interface IParams {
  numbers: number[];
}

export const sortNumbersDescending = ({ numbers }: IParams): number[] =>
  [...numbers].sort((firstNumber, secondNumber) => secondNumber - firstNumber);
\`\`\``,
	],
};
