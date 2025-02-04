import {
	toISOString,
	toLocaleString,
} from '@/packages/tools/getWeatherData/function/common/utils';
import { type IEventTime } from '@/packages/tools/getWeatherData/function/common/interfaces';
interface IParams {
	timeZone: string;
	timestampSeconds: number;
}

export const formatEventTime = ({
	timeZone,
	timestampSeconds,
}: IParams): IEventTime => {
	return {
		utc: toISOString({ timestampSeconds }),
		local: toLocaleString({
			timestampSeconds,
			timeZone,
		}),
		timeZone,
	};
};
