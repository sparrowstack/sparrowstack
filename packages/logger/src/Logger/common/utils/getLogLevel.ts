import { LogLevel } from '@logger/common/enums';

interface IParams {
	level?: string;
}

export const getLogLevel = ({ level }: IParams): LogLevel | null => {
	let logLevel: LogLevel | null = null;

	const upperCaseLevel = level?.toUpperCase();

	if (upperCaseLevel && upperCaseLevel in LogLevel) {
		logLevel = LogLevel[upperCaseLevel as keyof typeof LogLevel];
	}

	return logLevel;
};
