export async function fetchGraphQL(operationsDoc, operationName, variables) {
	const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
		method: 'POST',
		headers: {
			Authorization:
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdCIsImlhdCI6MTY1OTIyMDAyMCwiZXhwIjoxNjU5NzYyMTEwLCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciIsImFkbWluIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoidGVzdCJ9fQ.51rMcVdfCkRSwTSqIvdKI7wlBrvZ3l0PhKFAQSyPF48'
		},
		body: JSON.stringify({
			query: operationsDoc,
			variables: variables,
			operationName: operationName
		})
	});

	return await result.json();
}

const operationsDoc = `
  query MyQuery {
    users(order_by: {publicAddress: desc}) {
      email
      id
      issuer
      publicAddress
    }
  }
`;

function fetchMyQuery() {
	return fetchGraphQL(operationsDoc, 'MyQuery', {});
}

export async function startFetchMyQuery() {
	const { errors, data } = await fetchMyQuery();

	if (errors) {
		// handle those errors like a pro
		console.error(errors);
	}

	// do something great with this precious data
	console.log(data);
}
