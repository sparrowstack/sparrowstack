import { Model } from '../../../../Agent';

export const getAvailableModels = () => {
	const availableModels = Object.values(Model)
		.map((modelValue) => {
			return `- ${modelValue}\n`;
		})
		.join('');

	return availableModels;
};
