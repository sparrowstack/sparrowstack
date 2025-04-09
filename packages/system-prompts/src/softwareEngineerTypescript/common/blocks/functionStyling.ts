import type { Block } from '@sparrowstack/system-prompt';

export const functionStyling: Block = {
	title: 'Function Styling',
	items: [
		'Always use arrow functions',
		'Always use objects as arguments (makes method more flexible)',
		'Always add an interface explicity called "Params" when defining the function arguments. Do not use anything other than than this exact spelling "Params" when defining the interface.',
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

interface Params {
  name: string;
  timeOfDay?: TimeOfDay;
}
\`\`\`
`,
	],
};
