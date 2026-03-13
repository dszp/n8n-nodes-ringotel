import type { INodeProperties } from 'n8n-workflow';

export const organizationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['organization'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create an organization',
				action: 'Create an organization',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an organization',
				action: 'Delete an organization',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an organization',
				action: 'Get an organization',
			},
			{
				name: 'Get Activity Subjects',
				value: 'getActivitySubjects',
				description: 'Get activity subjects for an organization',
				action: 'Get activity subjects for an organization',
			},
			{
				name: 'Get Calls',
				value: 'getCalls',
				description: 'Get calls for an organization',
				action: 'Get calls for an organization',
			},
			{
				name: 'Get Event Log',
				value: 'getEventLog',
				description: 'Get event log for an organization',
				action: 'Get event log for an organization',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get many organizations',
				action: 'Get many organizations',
			},
			{
				name: 'Set Activity Subjects',
				value: 'setActivitySubjects',
				description: 'Set activity subjects for an organization',
				action: 'Set activity subjects for an organization',
			},
			{
				name: 'Set Status',
				value: 'setStatus',
				description: 'Set status of an organization',
				action: 'Set status of an organization',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an organization',
				action: 'Update an organization',
			},
		],
		default: 'getMany',
	},
];

export const organizationFields: INodeProperties[] = [
	// ──────────────────────────────────────────────────────────────────────
	//  Shared field: organizationId
	// ──────────────────────────────────────────────────────────────────────
	{
		displayName: 'Organization ID',
		name: 'organizationId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the organization',
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: [
					'delete',
					'get',
					'getActivitySubjects',
					'getCalls',
					'getEventLog',
					'setActivitySubjects',
					'setStatus',
					'update',
				],
			},
		},
	},

	// ──────────────────────────────────────────────────────────────────────
	//  organization: create
	// ──────────────────────────────────────────────────────────────────────
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		description: 'The name of the organization',
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Domain',
		name: 'domain',
		type: 'string',
		required: true,
		default: '',
		description: 'The domain of the organization',
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Region',
		name: 'region',
		type: 'options',
		required: true,
		default: '1',
		description: 'The region for the organization',
		options: [
			{ name: 'US East', value: '1' },
			{ name: 'US West', value: '2' },
			{ name: 'Europe (Frankfurt)', value: '3' },
			{ name: 'Asia Pacific (Singapore)', value: '4' },
			{ name: 'Europe (London)', value: '5' },
			{ name: 'India', value: '6' },
			{ name: 'Australia', value: '7' },
			{ name: 'Europe (Dublin)', value: '8' },
			{ name: 'Canada (Central)', value: '9' },
			{ name: 'South Africa', value: '10' },
		],
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Admin Login',
				name: 'admlogin',
				type: 'string',
				default: '',
				description: 'The admin login for the organization',
			},
			{
				displayName: 'Admin Password',
				name: 'admpassw',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'The admin password for the organization',
			},
			{
				displayName: 'Admin Permissions',
				name: 'admperms',
				type: 'options',
				default: 0,
				description: 'Admin permissions for the organization',
				options: [
					{ name: 'Disabled', value: 0 },
					{ name: 'Enabled', value: 1 },
				],
			},
			{
				displayName: 'Email CC',
				name: 'emailcc',
				type: 'string',
				default: '',
				description: 'Comma-separated list of email addresses to CC',
			},
			{
				displayName: 'Hide Password in Email',
				name: 'hidePassInEmail',
				type: 'boolean',
				default: false,
				description: 'Whether to hide the password in the email',
			},
			{
				displayName: 'Language',
				name: 'lang',
				type: 'string',
				default: 'en',
				description: 'The language for the organization',
			},
			{
				displayName: 'Package',
				name: 'packageid',
				type: 'options',
				default: 1,
				description: 'The package for the organization',
				options: [
					{ name: 'Essentials', value: 1 },
					{ name: 'Pro', value: 2 },
				],
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				description: 'Comma-separated list of tags',
			},
		],
	},

	// ──────────────────────────────────────────────────────────────────────
	//  organization: getCalls
	// ──────────────────────────────────────────────────────────────────────
	{
		displayName: 'Begin',
		name: 'begin',
		type: 'number',
		required: true,
		default: 0,
		description: 'Unix timestamp in seconds',
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['getCalls'],
			},
		},
	},
	{
		displayName: 'End',
		name: 'end',
		type: 'number',
		required: true,
		default: 0,
		description: 'Unix timestamp in seconds',
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['getCalls'],
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['getCalls'],
			},
		},
		options: [
			{
				displayName: 'User ID',
				name: 'userid',
				type: 'string',
				default: '',
				description: 'The ID of a specific user to filter calls',
			},
		],
	},

	// ──────────────────────────────────────────────────────────────────────
	//  organization: getEventLog
	// ──────────────────────────────────────────────────────────────────────
	{
		displayName: 'Begin',
		name: 'begin',
		type: 'number',
		required: true,
		default: 0,
		description: 'Unix timestamp in seconds',
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['getEventLog'],
			},
		},
	},
	{
		displayName: 'End',
		name: 'end',
		type: 'number',
		required: true,
		default: 0,
		description: 'Unix timestamp in seconds',
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['getEventLog'],
			},
		},
	},

	// ──────────────────────────────────────────────────────────────────────
	//  organization: setActivitySubjects
	// ──────────────────────────────────────────────────────────────────────
	{
		displayName: 'Organization Domain',
		name: 'orgDomain',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['setActivitySubjects'],
			},
		},
	},
	{
		displayName: 'Subjects',
		name: 'subjects',
		type: 'string',
		required: true,
		default: '',
		description: 'JSON array of subject strings, or comma-separated list',
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['setActivitySubjects'],
			},
		},
	},

	// ──────────────────────────────────────────────────────────────────────
	//  organization: setStatus
	// ──────────────────────────────────────────────────────────────────────
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		required: true,
		default: 1,
		description: 'The status to set for the organization',
		options: [
			{ name: 'Disabled', value: 0 },
			{ name: 'Enabled', value: 1 },
		],
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['setStatus'],
			},
		},
	},

	// ──────────────────────────────────────────────────────────────────────
	//  organization: update
	// ──────────────────────────────────────────────────────────────────────
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Admin Login',
				name: 'admlogin',
				type: 'string',
				default: '',
				description: 'The admin login for the organization',
			},
			{
				displayName: 'Admin Password',
				name: 'admpassw',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'The admin password for the organization',
			},
			{
				displayName: 'Admin Permissions',
				name: 'admperms',
				type: 'options',
				default: 0,
				description: 'Admin permissions for the organization',
				options: [
					{ name: 'Disabled', value: 0 },
					{ name: 'Enabled', value: 1 },
				],
			},
			{
				displayName: 'Email CC',
				name: 'emailcc',
				type: 'string',
				default: '',
				description: 'Comma-separated list of email addresses to CC',
			},
			{
				displayName: 'Hide Password in Email',
				name: 'hidePassInEmail',
				type: 'boolean',
				default: false,
				description: 'Whether to hide the password in the email',
			},
			{
				displayName: 'Language',
				name: 'lang',
				type: 'string',
				default: '',
				description: 'The language for the organization',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the organization',
			},
			{
				displayName: 'Package',
				name: 'packageid',
				type: 'options',
				default: 1,
				description: 'The package for the organization',
				options: [
					{ name: 'Essentials', value: 1 },
					{ name: 'Pro', value: 2 },
				],
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				description: 'Comma-separated list of tags',
			},
		],
	},
];
