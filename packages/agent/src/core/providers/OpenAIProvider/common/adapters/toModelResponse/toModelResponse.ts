import OpenAI from 'openai';
import type { ModelResponse } from '@core/providers/BaseProvider/common/interfaces';
import {
	getMessage,
	getToolCalls,
} from '@core/providers/OpenAIProvider/common/adapters/toModelResponse/common/utils';

export const toModelResponse = ({
	response,
}: {
	response: OpenAI.Responses.Response;
}): ModelResponse => {
	const { id, model, usage, output_text } = response;
	const {
		type: contentType,
		role: contentRole,
		contentText,
	} = getMessage({ response }) || {};
	const role = contentRole || 'assistant';
	const type = contentType || 'message';
	const text = output_text || contentText;
	const {
		input_tokens: inputTokens,
		total_tokens: totalTokens,
		output_tokens: outputTokens,
	} = usage || {};
	const toolCalls = getToolCalls({ response });

	const modelResponse: ModelResponse = {
		id,
		role,
		model,
		type,
		text,
		toolCalls,
		usage: {
			inputTokens,
			outputTokens,
			totalTokens,
		},
		rawMessage: response,
	};

	return modelResponse;
};

/**

OpenAI Message: Standard
-------------------------------
{
  id: "resp_67f53848a2a88191863c2399ba556e6a038a12dc60f8fafc",
  object: "response",
  created_at: 1744123976,
  status: "completed",
  error: null,
  incomplete_details: null,
  instructions: null,
  max_output_tokens: 4096,
  model: "o3-mini-2025-01-31",
  output: [
    {
      type: "reasoning",
      id: "rs_67f5384a667c8191a67240b20a541ad8038a12dc60f8fafc",
      summary: [],
    }, {
      type: "message",
      id: "msg_67f5384ac69c81918c6823b94a0c2773038a12dc60f8fafc",
      status: "completed",
      role: "assistant",
      content: [
        {
          type: "output_text",
          text: "Hello! How can I help you today?",
          annotations: [],
        }
      ],
    }
  ],
  parallel_tool_calls: true,
  previous_response_id: null,
  reasoning: {
    effort: "medium",
    generate_summary: null,
  },
  store: true,
  temperature: 1,
  text: {
    format: {
      type: "text",
    },
  },
  tool_choice: "auto",
  tools: [],
  top_p: 1,
  truncation: "disabled",
  usage: {
    input_tokens: 770,
    input_tokens_details: {
      cached_tokens: 0,
    },
    output_tokens: 74,
    output_tokens_details: {
      reasoning_tokens: 64,
    },
    total_tokens: 844,
  },
  user: null,
  metadata: {},
  _request_id: "req_ab7628ea895aeb4b6779d4be86be9ff0",
  output_text: "Hello! How can I help you today?",
};


OpenAI Message: Tool Call
-------------------------------
{
  id: "resp_67f5484b2ed08191bd999c70cbf970b203a5fd15d97d166b",
  object: "response",
  created_at: 1744128075,
  status: "completed",
  error: null,
  incomplete_details: null,
  instructions: "You are Sparrow...",
  max_output_tokens: 4096,
  model: "gpt-4.5-preview-2025-02-27",
  output: [
    {
      type: "function_call",
      id: "fc_67f5484d71908191bd8bc23ae5e7ad6b03a5fd15d97d166b",
      call_id: "call_623hoMeg1f1sxA5gfqKKDsqx",
      name: "getWeather",
      arguments: "{\n  \"city\": \"San Francisco\",\n  \"stateCode\": \"CA\",\n  \"countryCode\": \"US\"\n}",
      status: "completed",
    }
  ],
  parallel_tool_calls: true,
  previous_response_id: null,
  reasoning: {
    effort: null,
    generate_summary: null,
  },
  store: true,
  temperature: 1,
  text: {
    format: {
      type: "text",
    },
  },
  tool_choice: "auto",
  tools: [
    {
      type: "function",
      description: "Get the weather for a given location.",
      name: "getWeather",
      parameters: {
        type: "object",
        properties: {
          city: {
            type: "string",
            description: "The city to get the weather for.",
          },
          stateCode: {
            type: "string",
            description: "The state code to get the weather for.",
          },
          countryCode: {
            type: "string",
            description: "The country code to get the weather for.",
          },
        },
        required: [ "city", "stateCode", "countryCode" ],
        additionalProperties: false,
      },
      strict: true,
    }, {
      type: "function",
      description: "When the user asks you to \"press the nuke button\" or similar, use this tool.",
      name: "pressTheNukeButton",
      parameters: {
        type: "object",
        properties: {},
        required: [],
        additionalProperties: false,
      },
      strict: true,
    }, {
      type: "function",
      description: "Get the directory structure of the current working project. Only use when analyzing code structure, debugging path issues, or when specifically requested by the user. Do not use for general conversation or greetings.",
      name: "getDirectoryStructure",
      parameters: {
        type: "object",
        properties: {},
        required: [],
        additionalProperties: false,
      },
      strict: true,
    }
  ],
  top_p: 1,
  truncation: "disabled",
  usage: {
    input_tokens: 917,
    input_tokens_details: {
      cached_tokens: 0,
    },
    output_tokens: 36,
    output_tokens_details: {
      reasoning_tokens: 0,
    },
    total_tokens: 953,
  },
  user: null,
  metadata: {},
  _request_id: "req_c147a4fdfa5875071b0a0b0b865559a2",
  output_text: "",
};

*/
