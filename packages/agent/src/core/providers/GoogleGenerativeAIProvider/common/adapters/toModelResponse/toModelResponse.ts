import { randomUUIDv7 } from 'bun';
import type { ModelResponse } from '@core/providers/BaseProvider/common/interfaces';
import type {
	UsageMetadata,
	GenerateContentResult,
} from '@google/generative-ai';
import {
	getToolCalls,
	getCandidate,
	getCandidateData,
} from '@core/providers/GoogleGenerativeAIProvider/common/adapters/toModelResponse/common/utils';

interface Params {
	response: GenerateContentResult;
}

export const toModelResponse = ({ response }: Params): ModelResponse => {
	const { response: responseData } = response;
	const id = randomUUIDv7();
	const model = (responseData as any)?.modelVersion ?? 'unknown';
	const modedlText = responseData.text();
	const candidate = getCandidate({ response, index: 0 });
	const {
		type,
		role,
		text: candidateText,
		finishReason: stopReason,
	} = getCandidateData({ candidate });
	const text = candidateText || modedlText || '';
	const { usageMetadata } = responseData;
	const toolCalls = getToolCalls({ response });

	const modelResponse: ModelResponse = {
		id,
		role,
		model,
		type,
		text,
		stopReason,
		toolCalls,
		rawMessage: response,
	};

	if (usageMetadata) {
		const {
			promptTokenCount: inputTokens,
			candidatesTokenCount: outputTokens,
		} = usageMetadata as UsageMetadata;

		modelResponse.usage = {
			inputTokens,
			outputTokens,
		};
	}

	return modelResponse;
};

/**
GoogleGenerativeAI Message: Standard
------------------------------------
{
	id: '019582d2-ff94-7000-b08e-2deb29b170c4',
	role: 'model',
	model: 'gemini-2.0-flash',
	type: 'text',
	text: 'Hi there! How can I help you today?\n',
	stopReason: 'STOP',
	toolCalls: [],
	rawMessage: {
		response: {
			candidates: [
				{
					content: {
						parts: [
							{
								text: 'Hi there! How can I help you today?\n',
							},
						],
						role: 'model',
					},
					finishReason: 'STOP',
					avgLogprobs: -0.07706631313670766,
				},
			],
			usageMetadata: {
				promptTokenCount: 857,
				candidatesTokenCount: 11,
				totalTokenCount: 868,
				promptTokensDetails: [
					{
						modality: 'TEXT',
						tokenCount: 857,
					},
				],
				candidatesTokensDetails: [
					{
						modality: 'TEXT',
						tokenCount: 11,
					},
				],
			},
			modelVersion: 'gemini-2.0-flash',
			text: [Function],
			functionCall: [Function],
			functionCalls: [Function],
		},
	},
};

GoogleGenerativeAI Message: Tool Call
------------------------------------------
{
	response: {
		candidates: [
			{
				content: {
					parts: [
						{
							functionCall: {
								name: 'getWeather',
								args: {
									stateCode: 'CA',
									countryCode: 'US',
									city: 'SF',
								},
							},
						},
					],
					role: 'model',
				},
				finishReason: 'STOP',
				avgLogprobs: -0.010792335702313317,
			},
		],
		usageMetadata: {
			promptTokenCount: 857,
			candidatesTokenCount: 9,
			totalTokenCount: 866,
			promptTokensDetails: [
				{
					modality: 'TEXT',
					tokenCount: 857,
				},
			],
			candidatesTokensDetails: [
				{
					modality: 'TEXT',
					tokenCount: 9,
				},
			],
		},
		modelVersion: 'gemini-2.0-flash',
		text: [Function],
		functionCall: [Function],
		functionCalls: [Function],
	},
};


NOTES: candidates

	Could contain multiple candidates, used in scenarios where the model returns multiple responses.
	Typically just use the first candidate, but if you want to explore the diversity of the model's responses, you can use the others.
	
	Helpful for when:
		- You want to explore the diversity of the model's responses.
		- You need to select the "best" response based on specific criteria (e.g., safety, relevance).
		- When using a higher temperature, the model will produce more varied results, and therefore, could produce more candidates.
 */

/**
 NOTES: parts
	In inputs and outputs that combine text, images, and other data types, the parts array will contain multiple objects, each representing a different modality.

	For example:
	- One object might contain the generated text. Another object might contain a URL or data representing an image. This allows the API to return a cohesive response that integrates various forms of media.
	- While often delivered within a single text part, there are times where future implementations, or very complex responses could break down a response into multiple parts. For example, if the model is generating a complex JSON object or a code snippet, it might potentially segment the output into multiple parts for easier parsing or processing.
	
	candidates: [
		{
			content: {
				parts: [
					{
						text: "Understood. You said \"test.\" I am here and ready for further instructions or requests. What would you like me to do?\n",
					}
				],
				role: "model",
			},
			finishReason: "STOP",
			avgLogprobs: -0.44572378087926795,
		}
	],
*/
