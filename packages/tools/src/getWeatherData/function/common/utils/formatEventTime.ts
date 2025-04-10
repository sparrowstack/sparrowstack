import {
	toISOString,
	toLocaleString,
} from '@tools/getWeatherData/function/common/utils';
import { type EventTime } from '@tools/getWeatherData/function/common/interfaces';
interface Params {
	timeZone: string;
	timestampSeconds: number;
}

export const formatEventTime = ({
	timeZone,
	timestampSeconds,
}: Params): EventTime => {
	return {
		utc: toISOString({ timestampSeconds }),
		local: toLocaleString({
			timestampSeconds,
			timeZone,
		}),
		timeZone,
	};
};
