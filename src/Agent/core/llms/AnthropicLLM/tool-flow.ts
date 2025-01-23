// // If LLM Response with Tool Calls, Handle tool calls
// // ----------------------------------------------------
// if (
// 	Array.isArray(responseMessage.toolCalls) &&
// 	responseMessage.toolCalls.length > 0
// ) {
// 	// Add AssistantTool Call Response to Messages
// 	addAssistantMessageToMessages({
// 		llm,
// 		message: responseMessage.contentText,
// 		toolCalls: responseMessage.toolCalls,
// 	});

// 	// Execute tool calls
// 	const toolCallResults = await executeToolCalls({
// 		llmToolCalls: llm.toolCalls,
// 		toolCalls: responseMessage.toolCalls,
// 	});

// 	// Add Tool Results to Messages
// 	addToolResultsToMessages({
// 		llm,
// 		toolCallResults,
// 	});

// 	// Log Messages
// 	infoLogMessages({
// 		logger,
// 		messages: llm.getMessages(),
// 	});

// 	// Send LLM updated messages with tool call results,
// 	// Get final response from LLM with tool results in repsonse
// 	responseMessage = await sendContextToLLM({
// 		llm,
// 		anthropic,
// 	});

// 	// Log LLM Response
// 	infoLogLLMResponseMessage({
// 		logger,
// 		message: responseMessage,
// 	});
// }
// // ----------------------------------------------------
