import OpenAI from 'openai';
import { Anthropic } from '@anthropic-ai/sdk';

export type LLMResponseMessageRaw = Anthropic.Messages.Message | OpenAI.ChatCompletion;
