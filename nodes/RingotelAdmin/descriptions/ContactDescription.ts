import type { INodeProperties } from 'n8n-workflow';

export const contactOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['contact'],
			},
		},
		options: [
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete contacts',
			},
			{
				name: 'Get Blocked',
				value: 'getBlocked',
				action: 'Get blocked contacts',
				description: 'Retrieve all blocked contacts for an organization',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many contacts',
				description: 'Retrieve all contacts for an organization',
			},
			{
				name: 'Import',
				value: 'import',
				action: 'Import contacts',
				description: 'Import contacts into an organization',
			},
			{
				name: 'Set Blocked',
				value: 'setBlocked',
				action: 'Set blocked status for a contact',
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update contacts',
			},
		],
		default: 'getMany',
	},
];

export const contactFields: INodeProperties[] = [
	// ──────────────────────────────────────────────────────────────────────────────
	//  contact: shared fields
	// ──────────────────────────────────────────────────────────────────────────────
	{
		displayName: 'Organization Name or ID',
		name: 'organizationId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getOrganizations',
		},
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: [
					'delete',
					'getBlocked',
					'getMany',
					'import',
					'setBlocked',
					'update',
				],
			},
		},
		description: 'The organization to operate on. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},

	// ──────────────────────────────────────────────────────────────────────────────
	//  contact: delete
	// ──────────────────────────────────────────────────────────────────────────────
	{
		displayName: 'Contact IDs (JSON)',
		name: 'contactIdsJson',
		type: 'json',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['delete'],
			},
		},
		description: 'JSON array of contact ID strings to delete',
	},

	// ──────────────────────────────────────────────────────────────────────────────
	//  contact: import
	// ──────────────────────────────────────────────────────────────────────────────
	{
		displayName: 'Contacts (JSON)',
		name: 'contactsJson',
		type: 'json',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['import'],
			},
		},
		description:
			'JSON array of contact objects with name, phones array, and optional info object',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['import'],
			},
		},
		options: [
			{
				displayName: 'Connection Name or ID',
				name: 'branchid',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getConnections',
					loadOptionsDependsOn: ['organizationId'],
				},
				default: '',
				description: 'Scope contacts to a specific connection. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
			},
		],
	},

	// ──────────────────────────────────────────────────────────────────────────────
	//  contact: setBlocked
	// ──────────────────────────────────────────────────────────────────────────────
	{
		displayName: 'Blocked',
		name: 'blocked',
		type: 'boolean',
		required: true,
		default: false,
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['setBlocked'],
			},
		},
		description: 'Whether the contact should be blocked',
	},
	{
		displayName: 'Contact ID',
		name: 'contactId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['setBlocked'],
			},
		},
		description: 'Contact ID to block/unblock. Provide either this or Phone Number.',
	},
	{
		displayName: 'Phone Number',
		name: 'phone',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['setBlocked'],
			},
		},
		description: 'Phone number to block/unblock. Provide either this or Contact ID.',
	},

	// ──────────────────────────────────────────────────────────────────────────────
	//  contact: update
	// ──────────────────────────────────────────────────────────────────────────────
	{
		displayName: 'Contacts (JSON)',
		name: 'contactsJson',
		type: 'json',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['update'],
			},
		},
		description: 'JSON array of contact objects to update, each must include ID',
	},
];
