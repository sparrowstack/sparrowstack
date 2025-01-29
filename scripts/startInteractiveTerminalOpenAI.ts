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

const model = Model.OpenAI.GPT4o;
const provider = ProviderName.OpenAI;
const apiKey = process.env[ApiKey.OpenAI] as string;
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
