<!-- README copied from https://raw.githubusercontent.com/othneildrew/Best-README-Template/master/README.md -->

<!-- PROJECT LOGO -->
<br />
<div align="center">
	<!-- <a href="https://github.com/DWC01/dapp-sandbox-contracts">
		<img src="/images/logo.png" alt="Logo" width="419" height="128">
	</a> -->
	<h1>SparrowStack</h1>
	<p>Sparrow is an intuitive, lightweight, and modular TypeScript based framework for building AI agents</p>
</div>
<br />

## About

SparrowStack is the modular “stack” of components powering the Sparrow AI Agent framework. Written in TypeScript from the ground up, it provides a type‑safe environment for building, testing, and deploying AI agents.

It comprises framework‑agnostic classes (e.g., `Tool`, `SystemPrompt`, `StructuredOutput`) capable of generating provider‑specific schemas. Together, these modules stack to form the Sparrow AI Agent framework.

### Multi Provider Support

Sparrow supports multiple AI providers and models, giving you the flexibility to choose the optimal combination for your use case:

- **OpenAI**
- **Anthropic**
- **Google Generative AI**


### Key Features
- **Tool Calling**: Integrate custom tools into your agent and invoke them with ease.
- **System Prompts**: Manage and switch system prompts to tailor your agent’s behavior.
- **Structured Outputs**: Configure agents to emit structured data and parse responses reliably.
- **System Settings**: Update model setttings like temperature, streaming, etc..
- **Multi Provider Support**: Choose the best provider and model for your use case.
- **Interactive Terminal**: Engage with your AI agent through a command‑line interface.

## Intuitive API
For a complete suite of example scripts and features, explore the [SparrowStarter](https://github.com/sparrowstack/sparrow-starter) repository.


### Example: Basic Agent

```ts
// Import base classes
import { Agent, Model, Provider } from '@sparrowstack/sparrow';

// Define settings
const model = Model.OpenAI.o3Mini;
const provider = Provider.OpenAI;
const apiKey = process.env['OPENAI_API_KEY'] as string;
const settings = {
  temperature: 0.03,
};

// Instantiate Agent
const agent = new Agent({
  model,
  apiKey,
  provider,
  settings,
});

// Interact with agent
const response = await agent.sendMessage({
  message: 'Hello, how are you?',
});

console.log(response.text); // Hello! How can I help you today?
```

### Example: Tool Calling Agent

```ts
// Import base classes
import { Agent, Model, Provider, Tool, PropertyType } from '@sparrowstack/sparrow';

// Define settings
const model = Model.OpenAI.o3Mini;
const provider = Provider.OpenAI;
const apiKey = process.env['OPENAI_API_KEY'] as string;
const settings = {
  temperature: 0.03,
};

// Define Tool
const addTwoNumbersTool = new Tool({
  name: 'addTwoNumbers',
  description: 'Add two numbers together.',
  function: ({ number1, number2 }: { number1: number; number2: number }) => {
    return number1 + number2;
  },
  parameters: {
    number1: {
      required: true,
      type: PropertyType.Number,
      description: 'The first number to add.',
    },
    number2: {
      required: true,
      type: PropertyType.Number,
      description: 'The second number to add.',
    },
  },
});

// Instantiate Agent
const agent = new Agent({
  model,
  apiKey,
  provider,
  settings,
  tools: [ addTwoNumbersTool ],
});

// Interact with agent
const response = await agent.sendMessage({
  message: 'Please add 2 and 2.',
});

console.log(response.text); // "The answer is 4."
```

## Getting Started

We recommend using the [SparrowStarter](https://github.com/sparrowstack/sparrow-starter) template to kick off your project. Simply follow the setup guide, browse the example scripts for inspiration, and begin customizing your own agents today!

## Development
For local development, clone the `sparrowstack` repository and link its packages locally for use in the [SparrowStarter](https://github.com/sparrowstack/sparrow-starter) project. Use [SparrowStarter](https://github.com/sparrowstack/sparrow-starter) as your sandbox for testingchanges made in `sparrowstack`. 

More detailed setup instructions follow below.

### Prerequisites

- Bun [Install Instructions](https://bun.sh/docs/installation)

### Installation

1. Clone the repo

    ```sh
    git clone git@github.com:sparrowstack/sparrowstack.git
    ```

2. Navigate to the project directory

    ```sh
    cd sparrowstack
    ```

3. Setup development environment

    ```sh
    bun setup:dev
    ```

### Link to SparrowStarter
Follow the instructions in the [SparrowStarter](https://github.com/sparrowstack/sparrow-starter) README to setup repo and link the local `sparrowstack` packages.

