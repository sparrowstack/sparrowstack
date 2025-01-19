export enum OpenAIModel {
	GPT4o = 'gpt-4o',
	GPT4oLatest = 'chatgpt-4o-latest',
	GPT4oMini = 'gpt-4o-mini',
	O1 = 'o1',
	O1Mini = 'o1-mini',
	O1Preview = 'o1-preview',
	DALLE3 = 'dalle-3',
	DALLE2 = 'dalle-2',
	TTS1 = 'tts-1',
	TTS1Hd = 'tts-1-hd',
	Whisper1 = 'whisper-1',
	TextEmbedding3Large = 'text-embedding-3-large',
	TextEmbedding3Small = 'text-embedding-3-small',
	OmniModerationLatest = 'omni-moderation-latest',
}

export enum AnthropicModel {
	Claude35Sonnet = 'claude-3-5-sonnet-20241022',
	Claude35Haiku = 'claude-3-5-haiku-20241022',
	Claude35Opus = 'claude-3-opus-20240229',
	Claude3Sonnet = 'claude-3-sonnet-20240229',
	Claude3Haiku = 'claude-3-haiku-20240307',
}

export const Model = {
	OpenAI: OpenAIModel,
	Anthropic: AnthropicModel,
};
