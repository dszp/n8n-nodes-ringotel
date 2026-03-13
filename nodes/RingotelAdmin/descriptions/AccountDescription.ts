import type { INodeProperties } from 'n8n-workflow';

export const accountOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['account'],
			},
		},
		options: [
			{
				name: 'Create Admin',
				value: 'createAdmin',
				action: 'Create an account admin',
			},
			{
				name: 'Delete Admin',
				value: 'deleteAdmin',
				action: 'Delete an account admin',
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get account information',
				description: 'Retrieve account details',
			},
			{
				name: 'Get AI Usage Info',
				value: 'getAiUsageInfo',
				action: 'Get AI usage information',
			},
			{
				name: 'Get History',
				value: 'getHistory',
				action: 'Get account history',
			},
			{
				name: 'Get Many Users',
				value: 'getManyUsers',
				action: 'Get many account admin users',
			},
			{
				name: 'Get Statistics',
				value: 'getStatistics',
				action: 'Get account statistics',
			},
			{
				name: 'Update Admin',
				value: 'updateAdmin',
				action: 'Update an account admin',
			},
		],
		default: 'get',
	},
];

export const accountFields: INodeProperties[] = [
	// ──────────────────────────────────────────────────────────────────────────────
	//  account: createAdmin
	// ──────────────────────────────────────────────────────────────────────────────
	{
		displayName: 'Login',
		name: 'login',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['createAdmin'],
			},
		},
		description: 'Admin email address',
	},
	{
		displayName: 'Password',
		name: 'password',
		type: 'string',
		typeOptions: {
			password: true,
		},
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['createAdmin'],
			},
		},
		description: 'The admin password',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['createAdmin'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Admin display name',
			},
			{
				displayName: 'Role',
				name: 'role',
				type: 'string',
				default: '',
				description: 'Admin role',
			},
		],
	},

	// ──────────────────────────────────────────────────────────────────────────────
	//  account: deleteAdmin
	// ──────────────────────────────────────────────────────────────────────────────
	{
		displayName: 'Login',
		name: 'login',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['deleteAdmin'],
			},
		},
		description: 'Admin email address to delete',
	},

	// ──────────────────────────────────────────────────────────────────────────────
	//  account: getAiUsageInfo
	// ──────────────────────────────────────────────────────────────────────────────
	{
		displayName: 'Organization Domain',
		name: 'domain',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['getAiUsageInfo'],
			},
		},
		description: 'The domain of the organization to get AI usage for',
	},
	{
		displayName: 'Begin',
		name: 'begin',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['getAiUsageInfo'],
			},
		},
		description: 'Start timestamp in milliseconds (epoch)',
	},
	{
		displayName: 'End',
		name: 'end',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['getAiUsageInfo'],
			},
		},
		description: 'End timestamp in milliseconds (epoch)',
	},

	// ──────────────────────────────────────────────────────────────────────────────
	//  account: getHistory
	// ──────────────────────────────────────────────────────────────────────────────
	{
		displayName: 'Begin',
		name: 'begin',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['getHistory'],
			},
		},
		description: 'Start timestamp in milliseconds (epoch)',
	},
	{
		displayName: 'End',
		name: 'end',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['getHistory'],
			},
		},
		description: 'End timestamp in milliseconds (epoch)',
	},

	// ──────────────────────────────────────────────────────────────────────────────
	//  account: getStatistics
	// ──────────────────────────────────────────────────────────────────────────────
	{
		displayName: 'Begin',
		name: 'begin',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['getStatistics'],
			},
		},
		description: 'Start timestamp in milliseconds (epoch)',
	},
	{
		displayName: 'End',
		name: 'end',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['getStatistics'],
			},
		},
		description: 'End timestamp in milliseconds (epoch)',
	},

	// ──────────────────────────────────────────────────────────────────────────────
	//  account: updateAdmin
	// ──────────────────────────────────────────────────────────────────────────────
	{
		displayName: 'Login',
		name: 'login',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['updateAdmin'],
			},
		},
		description: 'Admin email address',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['updateAdmin'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Admin display name',
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'The admin password',
			},
			{
				displayName: 'Role',
				name: 'role',
				type: 'string',
				default: '',
				description: 'Admin role',
			},
		],
	},
];
