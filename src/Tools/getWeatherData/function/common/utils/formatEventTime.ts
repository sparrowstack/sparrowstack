import {
	toISOString,
	toLocaleString,
} from '@Tools/getWeatherData/function/common/utils';

interface IParams {
	timeZone: string;
	timestampSeconds: number;
}

export const formatEventTime = ({ timestampSeconds, timeZone }: IParams) => {
	return {
		utc: toISOString({ timestampSeconds }),
		local: toLocaleString({
			timestampSeconds,
			timeZone,
		}),
		timeZone,
	};
};
