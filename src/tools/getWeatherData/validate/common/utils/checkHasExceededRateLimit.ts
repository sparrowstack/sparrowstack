export const checkHasExceededRateLimit = ({
	lastRequestTime,
	maxRequestIntervalMinutes,
}: {
	lastRequestTime: Date;
	maxRequestIntervalMinutes: number;
}) => {
	let hasExceededRateLimit = true;
	const currentTime = new Date();
	const timeDifferenceMs = currentTime.getTime() - lastRequestTime.getTime();
	const timeDifferenceMinutes = timeDifferenceMs / (1000 * 60);

	if (timeDifferenceMinutes >= maxRequestIntervalMinutes) {
		hasExceededRateLimit = false;
	}

	return hasExceededRateLimit;
};
