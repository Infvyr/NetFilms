const dateOptions = {
	weekday: 'short',
	year: 'numeric',
	month: 'short',
	day: 'numeric'
};

export const dateFormat = (date, locale = 'en-GB') =>
	new Date(date).toLocaleDateString(locale, dateOptions);
