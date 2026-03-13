import type {
	ICredentialTestFunctions,
	IExecuteFunctions,
	ILoadOptionsFunctions,
	IDataObject,
	IHttpRequestOptions,
	INodePropertyOptions,
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
	const response = (await this.helpers.request({
		method: 'POST',
		uri: `${baseUrl}/api`,
		headers: {
			Authorization: `Bearer ${apiKey}`,
			'Content-Type': 'application/json',
		},
		body: { method: 'getOrganizations', params: {} },
		json: true,
	})) as IDataObject;
	/* eslint-enable @n8n/community-nodes/no-deprecated-workflow-functions */

	if (response.error) {
		const errorMsg = (response.error as IDataObject).message || 'Authentication failed';
		throw new Error(errorMsg as string);
	}
}

// ──────────────────────────────────────────────────────────────────────────────
//  Organization cache for loadOptions dropdown
// ──────────────────────────────────────────────────────────────────────────────

interface OrgCacheEntry {
	data: INodePropertyOptions[];
	timestamp: number;
}

const orgCache = new Map<string, OrgCacheEntry>();
const ORG_CACHE_TTL = 10 * 60 * 1000; // 10 minutes

function getCredentialCacheKey(credentials: IDataObject): string {
	return `${credentials.baseUrl}::${credentials.apiKey}`;
}

/**
 * Invalidate the organization cache for the given credentials.
 * Call after org create/delete/update operations.
 */
export function invalidateOrgCache(credentials: IDataObject): void {
	orgCache.delete(getCredentialCacheKey(credentials));
}

/**
 * Load organizations as dropdown options, with 10-minute caching per credential.
 * Returns options sorted by domain, formatted as "domain (name)".
 */
export async function getOrganizationOptions(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	const credentials = await this.getCredentials('ringotelAdminApi');
	const cacheKey = getCredentialCacheKey(credentials);
	const cached = orgCache.get(cacheKey);

	if (cached && Date.now() - cached.timestamp < ORG_CACHE_TTL) {
		return cached.data;
	}

	const orgs = (await ringotelAdminApiRequest.call(
		this,
		'getOrganizations',
		{},
	)) as IDataObject[];

	const options: INodePropertyOptions[] = orgs
		.map((org) => ({
			name: `${org.domain} (${org.name})`,
			value: org.id as string,
		}))
		.sort((a, b) => a.name.localeCompare(b.name));

	orgCache.set(cacheKey, { data: options, timestamp: Date.now() });

	return options;
}
