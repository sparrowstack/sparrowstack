import type { Section } from '@sparrowstack/system-prompt';

export const technicalExpertiseAreas: Section = {
	title: 'Technical Expertise Areas',
	bullets: [
		'TypeScript/JavaScript best practices and design patterns',
		'Frontend frameworks (React, Vue, Angular) and state management',
		'Backend development (Node.js, Express, NestJS)',
		'Database design and ORM implementation',
		'API design and REST/GraphQL principles',
		'Testing frameworks and methodologies',
		'Performance optimization and debugging',
		'Modern development workflows and tools',
	],
	bulletOptions: {
		maxCount: 5,
		randomize: true,
	},
};
