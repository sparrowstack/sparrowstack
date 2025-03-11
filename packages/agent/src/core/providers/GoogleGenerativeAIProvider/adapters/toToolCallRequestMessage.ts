import type { FunctionCall } from '@google/generative-ai';
import { Role } from '@core/providers/GoogleGenerativeAIProvider/common/enums';
import type { ModelResponse } from '@core/providers/BaseProvider/common/interfaces';

interface IParams {
	responseMessage: ModelResponse;
}

export const toToolCallRequestMessage = ({ responseMessage }: IParams) => {
	const toolCalls = responseMessage.toolCalls!.map((toolCall) => {
		const rawToolCall = toolCall.rawToolCall as FunctionCall;

		return {
			functionCall: {
				name: rawToolCall.name,
				args: rawToolCall.args,
			},
		};
	});

	return {
		parts: toolCalls,
		role: Role.Model,
	};
};

// Example for reference role: Role.Model,
// --------------------------------
// {
//     parts: [
//       {
//         functionCall: {
//           name: "getWeather",
//           args: {
//             city: "San Francisco",
//             countryCode: "US",
//             stateCode: "CA",
//           },
//         },
//       }, {
//         functionCall: {
//           name: "getDirectoryStructure",
//           args: {},
//         },
//       }
//     ],
//     role: "model",
//   }
