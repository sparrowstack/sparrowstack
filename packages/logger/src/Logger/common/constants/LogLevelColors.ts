import { LogLevel } from '@logger/common/enums';

export const LogLevelColors = {
	[LogLevel.ERROR]: '\x1b[31m', // Red
	[LogLevel.WARN]: '\x1b[33m', // Yellow
	[LogLevel.INFO]: '\x1b[36m', // Cyan
	[LogLevel.DEBUG]: '\x1b[32m', // Green
	[LogLevel.VERBOSE]: '\x1b[35m', // Magenta
};
