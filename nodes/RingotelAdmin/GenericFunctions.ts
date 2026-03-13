import type {
	ICredentialTestFunctions,
	IExecuteFunctions,
	ILoadOptionsFunctions,
	IDataObject,
	IHttpRequestOptions,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

/**
 * Make an authenticated RPC-style API request to the Ringotel Admin API.
 *
 * All Ringotel Admin API calls are POST requests to {baseUrl}/api with a JSON body
 * containing `method` (the RPC method name) and `params` (the parameters object).
 *
 * Authentication is handled via the credential's `authenticate` property
 * (Bearer token header), applied automatically by `httpRequestWithAuthentication`.
 */
export async function ringotelAdminApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: string,
	params: IDataObject = {},
): Promise<IDataObject | IDataObject[]> {
	const credentials = await this.getCredentials('ringotelAdminApi');
	const baseUrl = (credentials.baseUrl as string).replace(/\/$/, '');

	const options: IHttpRequestOptions = {
		method: 'POST',
		url: `${baseUrl}/api`,
		headers: {
			'Content-Type': 'application/json',
		},
		body: { method, params },
		json: true,
	};

	const response = (await this.helpers.httpRequestWithAuthentication.call(
		this,
		'ringotelAdminApi',
		options,
	)) as IDataObject;

	if (response.error) {
		throw new NodeApiError(this.getNode(), response.error as JsonObject, {
			message: `Ringotel API error: ${(response.error as IDataObject).message || 'Unknown error'}`,
		});
	}

	return response.result as IDataObject | IDataObject[];
}

/**
 * Test Ringotel Admin API credentials by calling getOrganizations.
 * ICredentialTestFunctions only exposes helpers.request (deprecated) — no alternative available.
 */
export async function testRingotelAdminCredential(
	this: ICredentialTestFunctions,
	baseUrl: string,
	apiKey: string,
): Promise<void> {
	/* eslint-disable @n8n/community-nodes/no-deprecated-workflow-functions */
	await this.helpers.request({
		method: 'POST',
		uri: `${baseUrl}/api`,
		headers: {
			Authorization: `Bearer ${apiKey}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ method: 'getOrganizations', params: {} }),
		json: true,
	});
	/* eslint-enable @n8n/community-nodes/no-deprecated-workflow-functions */
}
