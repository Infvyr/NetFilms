import PropTypes from 'prop-types';

export const DislikeIcon = ({ selected = false }) => (
	<svg
		stroke={selected ? '#E53E3E' : '#37474F'}
		fill="currentColor"
		strokeWidth="1"
		viewBox="0 0 48 48"
		height="1.5rem"
		width="2rem"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fill={selected ? '#E53E3E' : 'none'}
			d="M34,9c-4.2,0-7.9,2.1-10,5.4C21.9,11.1,18.2,9,14,9C7.4,9,2,14.4,2,21c0,11.9,22,24,22,24s22-12,22-24 C46,14.4,40.6,9,34,9z"
		/>
		<rect
			x="22"
			y="-2.9"
			transform="matrix(.707 -.707 .707 .707 -9.941 24)"
			fill="white"
			width="2"
			height="53.7"
		/>
	</svg>
);

DislikeIcon.propTypes = {
	selected: PropTypes.bool
};
