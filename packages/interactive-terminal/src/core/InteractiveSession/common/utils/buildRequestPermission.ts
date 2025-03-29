import * as readline from 'readline';
import { formatForSparrowResponse } from '@core/InteractiveSession/common/utils';

export const buildRequestPermission = ({
	rl,
}: {
	rl: readline.Interface;
}): (({ message }: { message: string }) => Promise<boolean>) => {
	const requestPermissionFunction = ({
		message,
	}: {
		message: string;
	}): Promise<boolean> => {
		return new Promise((resolve) => {
			const question = `${message} (y/n): `;
			const formattedQuestion = formatForSparrowResponse({
				message: question,
			});

			rl.question(formattedQuestion, (answer: string) => {
				const isY = answer.toLowerCase() === 'y';
				const isYes = answer.toLowerCase() === 'yes';
				const userGavePermission = isY || isYes;

				resolve(userGavePermission);
			});
		});
	};

	return requestPermissionFunction;
};
