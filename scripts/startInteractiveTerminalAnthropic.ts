import { Agent } from '@Agent';
import { Model } from '@Agent/core/providers/BaseProvider/common/enums/Model';
import { ApiKey } from '@Agent/core/providers/BaseProvider/common/enums/ApiKey';
import { ProviderName } from '@Agent/core/providers/BaseProvider/common/enums/ProviderName';
import { getDirectoryStructureTool } from '@Tools';
import { InteractiveTerminal } from '@InteractiveTerminal';
import { softwareEngineerTypeScriptPrompt } from '@SystemPrompts';

// Configuration
// --------------------------------
const tools = [getDirectoryStructureTool];
const systemPrompt = softwareEngineerTypeScriptPrompt;

const provider = ProviderName.Anthropic;
const model = Model.Anthropic.Claude35Sonnet;
const apiKey = process.env[ApiKey.Anthropic] as string;
// --------------------------------

const agent = new Agent({
	model,
	tools,
	apiKey,
	provider,
	systemPrompt,
});
const interactiveTerminal = new InteractiveTerminal({ agent });

await interactiveTerminal.start();
