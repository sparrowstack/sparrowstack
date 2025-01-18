import type { Model as ModelType } from '../../../Agent/common/types';
import { Model, ModelName, ProviderName } from '../../../Agent/common/enums';

interface IOptions {
	modelName: string;
	providerName: string;
}

export const getModel = ({ modelName, providerName }: IOptions): ModelType => {
	const providerNameLower = providerName.toLowerCase();
	const provider =
		ProviderName[providerNameLower as keyof typeof ProviderName];

	console.log('provider', provider);
	console.log(
		'providerModelName',
		ModelName[provider as keyof typeof ModelName],
	);
	console.log(
		'enumModelName',
		ModelName[provider as keyof typeof ModelName][
			modelName as keyof (typeof ModelName)[keyof typeof ModelName]
		],
	);

	const enumModelName =
		ModelName[provider as keyof typeof ModelName][
			modelName as keyof (typeof ModelName)[keyof typeof ModelName]
		];

	const model =
		Model[provider][enumModelName as keyof (typeof Model)[typeof provider]];

	if (!model) {
		throw new Error(`Model ${modelName} not found`);
	}

	console.log('model', model);

	return model;
};
