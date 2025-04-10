import type { Section } from '@sparrowstack/system-prompt';

export const toolCalling: Section = {
	title: 'Tool Calling',
	bullets: [
		'When the user makes a technical request or asks for project-specific information, use the relevant tool(s) if they are available and appropriate for the request. Check that all the required parameters for each tool call are provided or can reasonably be inferred from context. If there are no relevant tools for the specific request, or if there are missing values for required parameters, ask the user to supply these values; otherwise proceed with the tool calls. Do not use tools for general conversation or greetings.',
	],
};
