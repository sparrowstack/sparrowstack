<!-- README copied from https://raw.githubusercontent.com/othneildrew/Best-README-Template/master/README.md -->

<!-- PROJECT LOGO -->
<br />
<div align="center">
	<!-- <a href="https://github.com/DWC01/dapp-sandbox-contracts">
		<img src="/images/logo.png" alt="Logo" width="419" height="128">
	</a> -->
	<h1>SparrowStack</h1>
	<p>An intuitive, lightweight, and modular TypeScript based framework for building AI agents</p>
</div>

<!-- TABLE OF CONTENTS -->
<br/>
<details>
	<summary>Table of Contents</summary>
	<ol>
		<li>
			<a href="#about-the-project">About The Project</a>
			<ul>
				<li><a href="#built-with">Built With</a></li>
			</ul>
		</li>
		<li>
			<a href="#getting-started">Getting Started</a>
			<ul>
				<li><a href="#prerequisites">Prerequisites</a></li>
				<li><a href="#installation">Installation</a></li>
			</ul>
		</li>
		<li>
			<a href="#development">Development</a>
			<ul>
				<li><a href="#sparrowstack">SparrowStack</a></li>
				<li><a href="#sparrow-starter">SparrowStarter</a></li>
			</ul>
		</li>
	</ol>
</details>
<br/>

## About

SparrowStack is an intuitive, lightweight, and modular framework for building AI agents. Built with TypeScript from the ground up, it provides a type-safe environment for creating, testing, and deploying your AI Agents.

### Key Features

- **TypeScript-First**: Enjoy full type safety and IDE autocomplete support, reducing errors and accelerating development.
- **Lightweight**: Minimal dependencies and efficient architecture ensure your projects remain fast and maintainable.
- **Modular**: SparrowStack is built on framework-agnostic classes (like `Tool`, `SystemPrompt`, etc..) that are capabable of generating provider-specific schemas for seamless integration with any AI provider. These components are combined to create the SparrowStack framework.
- **Intuitive API**: Developer-friendly interfaces that make building complex AI agents as simple as connecting building blocks.

## Getting Started

### Base Example

```ts
// Import base classes
import { Agent, Model, Provider } from '@sparrowstack/sparrow';
import { InteractiveTerminal } from '@sparrowstack/interactive-terminal';

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

// Interacte with agent
const response = await agent.sendMessage({
  message: 'Hello, how are you?',
});

console.log(response.text); // Hello! How can I help you today?

// Optionally, start in an interactive terminal
const interactiveTerminal = new InteractiveTerminal({ agent });
await interactiveTerminal.start();
```

### Add a tool

```ts
// Import base classes
import { Tool, PropertyType } from '@sparrowstack/tool';
import { Agent, Model, Provider } from '@sparrowstack/sparrow';

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
  tools: [addTwoNumbersTool],
});

// Interact with agent
const response = await agent.sendMessage({
  message: 'Please add 2 and 2.',
});

console.log(response.text); // "The answer is 4."
```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

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

3. Install packages

    ```sh
    bun install
    ```

4. Lint the project

    ```sh
    bun lint:all
    ```

5. Build the project
    ```sh
    bun build:all
    ```

### Development

For local development, it's recommended to use the `sparrow-starter` project to run your AI agents. Link local packages from the `sparrowstack` repository to facilitate easy development.

## SparrowStack

1. Build and link the local packages

    ```sh
    bun release:all:local
    ```

## SparrowStarter

1.  Clone the repo

    ```sh
    git clone git@github.com:sparrowstack/sparrow-starter.git
    ```

2.  Navigate to the project directory

    ```sh
    cd sparrow-starter
    ```

3.  Link local packages from the `sparrowstack` repo

    ```sh
    // package.json

    "dependencies": {
        "@sparrowstack/sparrow": "link:@sparrowstack/sparrow",
        "@sparrowstack/interactive-terminal": "link:@sparrowstack/interactive-terminal",
        "@sparrowstack/system-prompts": "link:@sparrowstack/system-prompts",
        "@sparrowstack/tools": "link:@sparrowstack/tools"
    },
    ```

4.  Setup environment variables

    Copy the `.env.template` file to `.env` and update the variables

    ```sh
    cp .env.template .env
    ```

5.  Install packages

    ```sh
    bun install
    ```

6.  Start the interactive terminal
    ```sh
    bun start:interactive-terminal:openai
    ```
    ```sh
    bun start:interactive-terminal:anthropic
    ```
    ```sh
    bun start:interactive-terminal:google-generative-ai
    ```

<p align="right">(<a href="#top">back to top</a>)</p>
