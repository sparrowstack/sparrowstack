# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- Build: `bun build:all` or for a single package: `bunx nx run <package>:build`
- Lint: `bun lint:all` or for a single package: `bunx nx run <package>:lint`
- Test (unit): `bun test:unit:all` or for a single package: `bunx nx run <package>:test:unit`
- Test a single file: `bun test --test-file-pattern "\.unit\.test\.ts$" path/to/test/file.ts`
- Format check: `bunx nx run <package>:format:check`
- Format fix: `bunx nx run <package>:format`

## Code Style

- **Formatting**: Use Prettier with tabs (width 4), single quotes, trailing commas
- **Imports**: Group imports by external, internal (with paths using aliases like `@core/`)
- **Types**: Use TypeScript strictly, avoid `any`, use interfaces for objects, prefer union types
- **Naming**: 
  - Use PascalCase for classes, interfaces, types, enums
  - Use camelCase for variables, functions, methods
  - Use UPPER_CASE for constants
- **Error Handling**: Use appropriate error mechanisms based on context (try/catch, nullish operators)
- **File Structure**: Group related files in directories with index.ts exports
- **Testing**: Tests use Bun test framework with `.unit.test.ts` or `.integration.test.ts` suffix
- **Comments**: Meaningful comments for complex logic, avoid redundant comments

When making changes, ensure compatibility with the monorepo structure and run tests before committing.