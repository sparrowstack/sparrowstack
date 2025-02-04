import { LogLevel } from '@/packages/logger/common/enums';
import { LogLevelColors } from '@/packages/logger/common/constants';

interface IParams {
	message: any;
	context?: string;
	level: LogLevel;
	logLevel: LogLevel;
}

export const log = (
	{ message, context, level, logLevel }: IParams,
	...args: any[]
): void => {
	if (level <= logLevel) {
		const color = LogLevelColors[level];
		const reset = '\x1b[0m';
		const levelName = LogLevel[level]; /*.padEnd(7)*/
		const contextStr = context ? `[${context}] ` : '';
		const baseLog = `${color}${levelName} ${reset}${color}${contextStr}${reset}`;

		console.log(baseLog, message, ...args);
	}
};
