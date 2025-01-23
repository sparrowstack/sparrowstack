import { OpenAI } from 'openai';

interface IParams {
	index: number;
	message: OpenAI.ChatCompletion;
}

export const getChoiceParams = ({ message, index }: IParams) => {
	const choice = message.choices[index];
	const { message: choiceMessage, logprobs, finish_reason } = choice;
	const { role, content, refusal } = choiceMessage;

	return { role, content, refusal, logprobs, finish_reason };
};

//   choices: [
//     {
//       index: 0,
//       message: {
//         role: "assistant",
//         content: "```typescript\n// src/utils/addNumbers.ts\n\ninterface IParams {\n  firstNumber: number;\n  secondNumber: number;\n}\n\nexport const addNumbers = ({ firstNumber, secondNumber }: IParams): number => {\n  return firstNumber + secondNumber;\n};\n```",
//         refusal: null,
//       },
//       logprobs: null,
//       finish_reason: "stop",
//     }
//   ],
