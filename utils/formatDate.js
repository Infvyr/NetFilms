const dateOptions = {
	weekday: 'short',
	year: 'numeric',
	month: 'short',
	day: 'numeric'
};

export const dateFormat = (date, locale = 'us-US') =>
	new Date(date).toLocaleDateString(locale, dateOptions);
