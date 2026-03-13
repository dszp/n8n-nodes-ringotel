import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
	Icon,
} from 'n8n-workflow';

export class RingotelAdminApi implements ICredentialType {
	name = 'ringotelAdminApi';
	displayName = 'Ringotel Admin API';
	documentationUrl =
		'https://ringotel.atlassian.net/wiki/spaces/RSW/pages/2091548680/Ringotel+API';
	icon: Icon = 'file:ringotelAdmin.svg';

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://shell.ringotel.co',
			placeholder: 'e.g. https://shell.ringotel.co',
			description:
				'The base URL of your Ringotel Shell instance. Do not include a trailing slash or /api path.',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description:
				'The API key generated from your Ringotel Shell admin portal under API Settings',
		},
		{
			displayName: 'Dropdown Cache (Minutes)',
			name: 'cacheTtlMinutes',
			type: 'number',
			default: 10,
			description:
				'How long to cache dropdown options (Organizations, Connections) in minutes. Set to 0 to disable caching.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			method: 'POST',
			url: '={{$credentials.baseUrl}}/api',
			body: {
				method: 'getOrganizations',
				params: {},
			},
			headers: {
				'Content-Type': 'application/json',
			},
			json: true,
		},
	};
}
