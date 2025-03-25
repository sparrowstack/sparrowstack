export const expectedOpenAIResponseFormat = {
	type: 'json_schema',
	json_schema: {
		name: 'testResponseFormat',
		strict: true,
		schema: {
			type: 'object',
			properties: {
				metadata: {
					additionalProperties: false,
					description: 'Metadata for debugging purposes only',
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
					type: 'object',
				},
				text: {
					description: 'The response text to display to the user',
					type: 'string',
				},
			},
			required: ['text', 'metadata'],
			additionalProperties: false,
			$schema: 'http://json-schema.org/draft-07/schema#',
		},
	},
	$brand: 'auto-parseable-response-format',
};
