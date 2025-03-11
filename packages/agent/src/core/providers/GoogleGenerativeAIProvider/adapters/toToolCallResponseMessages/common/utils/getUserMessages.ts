import type { ToolCallResult } from '@core/ToolCallManager/common/types';
import { Role } from '@core/providers/GoogleGenerativeAIProvider/common/enums/Role';
import type { GoogleGenerativeAIToolCallUserResponseMessage } from '@core/providers/GoogleGenerativeAIProvider/common/interfaces';

export const getUserMessages = (
	toolCallResults: ToolCallResult[],
): GoogleGenerativeAIToolCallUserResponseMessage => {
	const userTexts = toolCallResults.map(({ result }) => {
		let text: string;

		try {
			text = typeof result === 'string' ? result : JSON.stringify(result);
		} catch {
			text = result as string;
		}

		return {
			text,
		};
	});

	const userMessages: GoogleGenerativeAIToolCallUserResponseMessage = {
		role: Role.User,
		parts: [...userTexts],
	};

	return userMessages;
};
