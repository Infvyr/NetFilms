export async function createNewUser(token, metadata) {
	const operationsDoc = `
  mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
    insert_users(objects: {
			issuer: $issuer, 
			publicAddress: $publicAddress, 
			email: $email
		}) {
      returning {
				id,
				email,
				issuer
			}
    }
  }
`;

	const { issuer, publicAddress, email } = metadata;

	const response = await fetchGraphQL(
		operationsDoc,
		'createNewUser',
		{ issuer, publicAddress, email },
		token
	);
	return response?.data?.users?.length === 0;
}

export async function isNewUser(token, issuer) {
	const operationsDoc = `
  query isNewUser($issuer: String!) {
    users(where: {issuer: {_eq: $issuer}}) {
      email
      id
      issuer
    }
  }
`;

	const response = await fetchGraphQL(
		operationsDoc,
		'isNewUser',
		{ issuer },
		token
	);
	return response?.data?.users?.length === 0;
}

export async function fetchGraphQL(
	operationsDoc,
	operationName,
	variables,
	token
) {
	const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-type': 'application/json'
		},
		body: JSON.stringify({
			query: operationsDoc,
			variables: variables,
			operationName: operationName
		})
	});

	return await result.json();
}
