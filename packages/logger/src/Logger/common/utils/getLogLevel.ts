import { LogLevel } from '@logger/common/enums';

interface Params {
	level?: string;
}

export const getLogLevel = ({ level }: Params): LogLevel | null => {
	let logLevel: LogLevel | null = null;

	const upperCaseLevel = level?.toUpperCase();

	if (upperCaseLevel && upperCaseLevel in LogLevel) {
		logLevel = LogLevel[upperCaseLevel as keyof typeof LogLevel];
	}

	return logLevel;
};
