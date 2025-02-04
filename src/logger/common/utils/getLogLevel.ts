import { LogLevel } from '@logger/common/enums';

interface IParams {
	level?: string;
}

export const getLogLevel = ({ level }: IParams): LogLevel => {
	let logLevel: LogLevel = LogLevel.INFO;

	if (!level) return LogLevel.INFO; // Default to INFO if not set

	const upperCaseLevel = level.toUpperCase();

	if (upperCaseLevel in LogLevel) {
		logLevel = LogLevel[upperCaseLevel as keyof typeof LogLevel];
	}

	return logLevel;
};
