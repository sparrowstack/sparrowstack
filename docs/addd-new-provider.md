# Adding a New Provider

## Install new provider SDK

```bash
cd packages/agent
bun install @provider-sdk
```

## Update Core Packages

```bash
packages/core/
```

1. Add the new provider name enum to the ProviderName

```bash
packages/core/src/common/enums/ProviderName.ts
```

1. Add all available models to the Model

```bash
packages/core/src/common/enums/Model.ts
```

3. Add the api key enum to the ApiKey

```bash
packages/core/src/common/enums/ApiKey.ts
```

4. From the root, run lint and build

```bash
bun run lint:all && bun run build:all
```

5. From the root, commit changes

## Update ProviderSDKFactory

1. Add new model SDK to all interfaces / constants

- packages/agent/src/core/ProviderSDKFactory

bun run lint:all && bun run build:all

## Update ProviderS

1. Update BaseProvider to support the new provider

- packages/agent/src/core/providers/BaseProvider/common/types/AIProvider.ts
- packages/agent/src/core/providers/BaseProvider/common/types/Sdk.ts

2. Add new Provider

- packages/agent/src/core/providers/<provider-name>Provider

3. Add new provider to the ProviderFactory

- packages/agent/src/core/ProviderFactory/common/constants/providers.ts

bun run lint:all && bun run build:all

# Update Tool

4. Add to the providerSchemas

- packages/tool/src/Tool/common/constants/providerSchemas.ts

bun run lint:all && bun run build:all
