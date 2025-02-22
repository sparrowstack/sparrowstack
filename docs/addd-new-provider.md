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

```bash
packages/agent/src/core/ProviderSDKFactory
```

1. Add new provider SDK constant to providerSDKs

```bash
packages/agent/src/core/ProviderSDKFactory/common/constants/providerSDKs.ts
```

2. Add new provider SDK type to ProviderSDK

```bash
packages/agent/src/core/ProviderSDKFactory/common/types/ProviderSDK.ts
```

3. Update ProviderSDKFactory to use the new provider SDK

_Note:_ Some updates to the ProviderSDKFactory may be required to support instantiating the new provider SDK.

```bash
packages/agent/src/core/ProviderSDKFactory/ProviderSDKFactory.ts
```

4. Update BaseProvider to support the new provider SDK

```bash
packages/agent/src/core/providers/BaseProvider/common/types/Sdk.ts
```

5. From the root, run lint and build

```bash
bun run lint:all && bun run build:all
```

6. From the root, commit changes

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
