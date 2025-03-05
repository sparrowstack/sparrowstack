import { OpenAI } from 'openai';
import { Anthropic } from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';

export type ProviderSDK = OpenAI | Anthropic | GoogleGenerativeAI;
