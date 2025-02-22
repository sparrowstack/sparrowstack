import { OpenAI } from 'openai';
import { Anthropic } from '@anthropic-ai/sdk';
import { ProviderName } from '@sparrowstack/core';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const providerSDKs = {
	[ProviderName.OpenAI]: OpenAI,
	[ProviderName.Anthropic]: Anthropic,
	[ProviderName.GoogleGenerativeAI]: GoogleGenerativeAI,
};
