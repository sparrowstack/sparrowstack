import { ProviderName } from '@sparrowstack/core';
import { providerSDKs } from '@core/ProviderSDKFactory/common/constants';
import type { ProviderSDK } from '@core/ProviderSDKFactory/common/types';
import { OpenAI } from 'openai';
import { Anthropic } from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';

// TODO: GoogleGenerativeAI - Fix these types
type ConstructorWithOptions = typeof OpenAI | typeof Anthropic;
type ConstructorWithApiKey = typeof GoogleGenerativeAI;

export class ProviderSDKFactory {
	static create({
		apiKey,
		providerName,
	}: {
		apiKey: string;
		providerName: ProviderName;
	}): ProviderSDK {
		let providerSDK: ProviderSDK | undefined;

		const ProviderSdk =
			providerSDKs[providerName as keyof typeof providerSDKs];

		if (providerName === ProviderName.GoogleGenerativeAI) {
			providerSDK = new (ProviderSdk as ConstructorWithApiKey)(apiKey);
		} else {
			providerSDK = new (ProviderSdk as ConstructorWithOptions)({
				apiKey,
			});
		}

		return providerSDK as ProviderSDK;
	}
}
