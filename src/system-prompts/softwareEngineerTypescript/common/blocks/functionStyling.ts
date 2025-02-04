import type { IBlock } from '@system-prompt';

export const functionStyling: IBlock = {
	title: 'Function Styling',
	items: [
		'Always use arrow functions',
		'Always use objects as arguments (makes method more flexible)',
		'Always add an interface explicity called "IParams" when defining the function arguments. Do not use anything other than than this exact spelling "IParams" when defining the interface.',
		'When an argument has explict options, always use an enum to define the options.',
	],
	examples: [
		`\`\`\`typescript
// src/utils/greeting.ts

enum TimeOfDay {
  Morning = 'morning',
  Afternoon = 'afternoon',
  Evening = 'evening',
}

interface IParams {
  name: string;
  timeOfDay?: TimeOfDay;
}
\`\`\`
`,
	],
};
