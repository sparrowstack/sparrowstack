// https://platform.openai.com/docs/models
export enum OpenAIModel {
	o3Mini = 'o3-mini-2025-01-31',
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

// https://docs.anthropic.com/en/docs/about-claude/models
export enum AnthropicModel {
	Claude35Sonnet = 'claude-3-5-sonnet-20241022',
	Claude35Haiku = 'claude-3-5-haiku-20241022',
	Claude35Opus = 'claude-3-opus-20240229',
	Claude3Sonnet = 'claude-3-sonnet-20240229',
	Claude3Haiku = 'claude-3-haiku-20240307',
}

// https://ai.google.dev/gemini-api/docs/models/gemini
export enum GoogleGenerativeAI {
	Gemini20Flash = 'gemini-2.0-flash',
	Gemini20FlashLite = 'gemini-2.0-flash-lite-preview-02-05',
	Gemini15Flash = 'gemini-1.5-flash',
	Gemini15Flash8b = 'gemini-1.5-flash-8b',
	Gemini15Pro = 'gemini-1.5-pro',
	TextEmbedding004 = 'text-embedding-004',
}

export const Model = {
	OpenAI: OpenAIModel,
	Anthropic: AnthropicModel,
	GoogleGenerativeAI: GoogleGenerativeAI,
};
