export const formatNumber = (number) => {
	let n = Number(number);
	return new Intl.NumberFormat('en-GB').format(n);
};
