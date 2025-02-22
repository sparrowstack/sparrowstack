// TODO: GoogleGenerativeAI - Remove/Keep this file?
import { OpenAI } from 'openai';
import { Anthropic } from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Add constructor parameter types
type OpenAIConfig = ConstructorParameters<typeof OpenAI>[0];
type AnthropicConfig = ConstructorParameters<typeof Anthropic>[0];
type GoogleConfig = ConstructorParameters<typeof GoogleGenerativeAI>[0];

export type ProviderSDKConstructor =
	| {
			new (config: OpenAIConfig): OpenAI;
	  }
	| {
			new (config: AnthropicConfig): Anthropic;
	  }
	| {
			new (config: GoogleConfig): GoogleGenerativeAI;
	  };
