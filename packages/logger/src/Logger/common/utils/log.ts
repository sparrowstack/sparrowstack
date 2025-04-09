import { LogLevel } from '@logger/common/enums';
import { LogLevelColors } from '@logger/common/constants';

interface Params {
	message: any;
	context?: string;
	level: LogLevel | null;
	logLevel: LogLevel | null;
}

export const log = (
	{ message, context, level, logLevel }: Params,
	...args: any[]
): void => {
	if (level && logLevel && level <= logLevel) {
		const color = LogLevelColors[level];
		const reset = '\x1b[0m';
		const levelName = LogLevel[level]; /*.padEnd(7)*/
		const contextStr = context ? `[${context}] ` : '';
		const baseLog = `${color}${levelName} ${reset}${color}${contextStr}${reset}`;

		console.log(baseLog, message, ...args);
	}
};
