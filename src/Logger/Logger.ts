import { LogLevel } from '@root/src/Logger/common/enums';
import { log, getLogLevel } from '@root/src/Logger/common/utils';

export class Logger {
	private context?: string;
	private logLevel: LogLevel;

	constructor(context?: string) {
		this.context = context;
		this.logLevel = getLogLevel({
			level: process.env.LOG_LEVEL,
		});
	}

	error(message: any, ...args: any[]): void {
		log(
			{
				message,
				context: this.context,
				level: LogLevel.ERROR,
				logLevel: this.logLevel,
			},
			...args,
		);
	}

	warn(message: any, ...args: any[]): void {
		log(
			{
				message,
				context: this.context,
				level: LogLevel.WARN,
				logLevel: this.logLevel,
			},
			...args,
		);
	}

	info(message: any, ...args: any[]): void {
		log(
			{
				message,
				context: this.context,
				level: LogLevel.INFO,
				logLevel: this.logLevel,
			},
			...args,
		);
	}

	debug(message: any, ...args: any[]): void {
		log(
			{
				message,
				context: this.context,
				level: LogLevel.DEBUG,
				logLevel: this.logLevel,
			},
			...args,
		);
	}

	verbose(message: any, ...args: any[]): void {
		log(
			{
				message,
				context: this.context,
				level: LogLevel.VERBOSE,
				logLevel: this.logLevel,
			},
			...args,
		);
	}
}
