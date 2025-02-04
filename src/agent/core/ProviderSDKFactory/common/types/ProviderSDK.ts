import { OpenAI } from 'openai';
import { Anthropic } from '@anthropic-ai/sdk';

export type ProviderSDK = OpenAI | Anthropic;
