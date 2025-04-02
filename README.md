<!-- README copied from https://raw.githubusercontent.com/othneildrew/Best-README-Template/master/README.md -->

<!-- PROJECT LOGO -->
<br />
<div align="center">
	<!-- <a href="https://github.com/DWC01/dapp-sandbox-contracts">
		<img src="/images/logo.png" alt="Logo" width="419" height="128">
	</a> -->
	<h1>SparrowStack</h1>
	<p>An intuitive, lightweight, and modular TypeScript framework for building AI agents</p>
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

SparrowStack is an intuitive, lightweight, and modular framework for building AI agents. Built with TypeScript from the ground up, it provides a type-safe environment for creating, testing, and deploying AI solutions.

### Key Features

- **TypeScript-First**: Enjoy full type safety and IDE autocomplete support, reducing errors and accelerating development.
- **Lightweight**: Minimal dependencies and efficient architecture ensure your projects remain fast and maintainable.
- **Modular**: Flexible plugin system allows you to use only what you need and extend functionality with ease.
- **Intuitive API**: Developer-friendly interfaces that make building complex AI agents as simple as connecting building blocks.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [Bun](https://bun.sh/)
- [Nx](https://nx.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)

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
