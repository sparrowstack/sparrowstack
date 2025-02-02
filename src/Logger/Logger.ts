import { LogLevel } from '@Logger/common/enums';
import { log, getLogLevel } from '@Logger/common/utils';

export class Logger {
	private context?: string;
	private logLevel: LogLevel;

	constructor({ context }: { context?: string }) {
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

	static error(
		context: string | undefined,
		message: any,
		...args: any[]
	): void {
		console.log('');
		log(
			{
				message,
				context,
				level: LogLevel.ERROR,
				logLevel: getLogLevel({ level: process.env.LOG_LEVEL }),
			},
			...args,
		);
	}

	static warn(
		context: string | undefined,
		message: any,
		...args: any[]
	): void {
		console.log('');
		log(
			{
				message,
				context,
				level: LogLevel.WARN,
				logLevel: getLogLevel({ level: process.env.LOG_LEVEL }),
			},
			...args,
		);
	}

	static info(
		context: string | undefined,
		message: any,
		...args: any[]
	): void {
		console.log('');
		log(
			{
				message,
				context,
				level: LogLevel.INFO,
				logLevel: getLogLevel({ level: process.env.LOG_LEVEL }),
			},
			...args,
		);
	}

	static debug(
		context: string | undefined,
		message: any,
		...args: any[]
	): void {
		console.log('');
		log(
			{
				message,
				context,
				level: LogLevel.DEBUG,
				logLevel: getLogLevel({ level: process.env.LOG_LEVEL }),
			},
			...args,
		);
	}

	static verbose(
		context: string | undefined,
		message: any,
		...args: any[]
	): void {
		console.log('');
		log(
			{
				message,
				context,
				level: LogLevel.VERBOSE,
				logLevel: getLogLevel({ level: process.env.LOG_LEVEL }),
			},
			...args,
		);
	}
}
