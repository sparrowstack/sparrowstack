export const expectedGoogleGenerativeAIResponseFormat = {
	type: 'object',
	properties: {
		text: {
			type: 'string',
			description: 'The response text to display to the user',
		},
		metadata: {
			type: 'object',
			properties: {
				ChainOfThought: {
					additionalProperties: false,
					description:
						'The LLM chain of thought to arrive to this answer.',
					properties: {
						steps: {
							items: {
								additionalProperties: false,
								properties: {
									explanation: {
										type: 'string',
									},
									output: {
										type: 'string',
									},
								},
								required: ['explanation', 'output'],
								type: 'object',
							},
							type: 'array',
						},
					},
					required: ['steps'],
					type: 'object',
				},
				confidence: {
					description: 'Confidence in the response, 1-100',
					type: 'number',
				},
				requiresFollowUp: {
					description:
						'Whether the response requires a follow-up from the user',
					type: 'boolean',
				},
				type: {
					enum: [
						'general',
						'tool_response',
						'error',
						'clarification',
					],
					type: 'string',
				},
			},
			required: [
				'type',
				'confidence',
				'requiresFollowUp',
				'ChainOfThought',
			],
			additionalProperties: false,
			description: 'Metadata for debugging purposes only',
		},
	},
	required: ['text', 'metadata'],
	additionalProperties: false,
	$schema: 'http://json-schema.org/draft-07/schema#',
};
