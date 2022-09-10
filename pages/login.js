import { Login } from 'components';
import { redirectUser } from 'lib/utils';

export default function LoginPage() {
	return <Login />;
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
