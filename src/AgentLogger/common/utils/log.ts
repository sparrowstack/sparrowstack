import { LogLevel } from '../enums';
import { LogLevelColors } from '../constants';

interface IOptions {
	message: any;
	context?: string;
	level: LogLevel;
	logLevel: LogLevel;
}

export const log = (
	{ message, context, level, logLevel }: IOptions,
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
