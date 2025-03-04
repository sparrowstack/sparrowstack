// import { Role } from '@sparrowstack/core';
import type { /*FunctionCall, */ Part } from '@google/generative-ai';

export type IToolCallRequestMessage = {
	role: string;
	parts: Part[];
};
