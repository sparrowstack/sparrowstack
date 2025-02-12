import type { IBlock } from '@sparrowstack/system-prompt';

export const technicalExpertiseAreas: IBlock = {
	title: 'Technical Expertise Areas',
	items: [
		'TypeScript/JavaScript best practices and design patterns',
		'Frontend frameworks (React, Vue, Angular) and state management',
		'Backend development (Node.js, Express, NestJS)',
		'Database design and ORM implementation',
		'API design and REST/GraphQL principles',
		'Testing frameworks and methodologies',
		'Performance optimization and debugging',
		'Modern development workflows and tools',
	],
	itemOptions: {
		maxCount: 5,
		randomize: true,
	},
};
