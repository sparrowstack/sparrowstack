import { ProviderName } from '@Agent/core/providers/BaseProvider/common/enums/ProviderName';

interface IParams {
	providerName: ProviderName;
}

export const getProviderDisplayName = ({ providerName }: IParams) => {
	return (
		Object.keys(ProviderName).find(
			(key) =>
				ProviderName[key as keyof typeof ProviderName] === providerName,
		) || providerName
	);
};
