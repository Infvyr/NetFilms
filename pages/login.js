import { Login, CustomHead } from 'components';
import { redirectUser } from 'lib/utils';

export default function LoginPage() {
	return (
		<>
			<CustomHead title="Netty - Sign in" />
			<Login />
		</>
	);
}

export async function getServerSideProps(context) {
	const { userId } = await redirectUser(context);

	if (userId) {
		return {
			props: {},
			redirect: {
				destination: '/',
				permanent: false
			}
		};
	}

	return { props: {} };
}
