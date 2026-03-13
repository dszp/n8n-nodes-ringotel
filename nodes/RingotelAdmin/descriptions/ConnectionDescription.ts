import type { INodeProperties } from 'n8n-workflow';

export const connectionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['connection'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a connection',
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a connection',
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a connection',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many connections',
			},
			{
				name: 'Get Options',
				value: 'getOptions',
				action: 'Get options for a connection',
			},
			{
				name: 'Get Templates',
				value: 'getTemplates',
				action: 'Get connection templates',
			},
			{
				name: 'Set Status',
				value: 'setStatus',
				action: 'Set status of a connection',
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a connection',
			},
		],
		default: 'getMany',
	},
];

export const connectionFields: INodeProperties[] = [
	// ──────────────────────────────────────────────────────────────────────────────
	//  connection: shared fields
	// ──────────────────────────────────────────────────────────────────────────────
	{
		displayName: 'Connection (Branch) Name or ID',
		name: 'connectionId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getConnections',
			loadOptionsDependsOn: ['organizationId'],
		},
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['connection'],
				operation: ['delete', 'get', 'getOptions', 'setStatus', 'update'],
			},
		},
		description: 'The connection (branch) to operate on. Maps to "branchid" in API results. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
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
				resource: ['connection'],
				operation: [
					'create',
					'delete',
					'get',
					'getMany',
					'getOptions',
					'getTemplates',
					'setStatus',
					'update',
				],
			},
		},
		description: 'The organization to operate on. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},

	// ──────────────────────────────────────────────────────────────────────────────
	//  connection: create
	// ──────────────────────────────────────────────────────────────────────────────
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['connection'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Provision JSON',
				name: 'provisionJson',
				type: 'json',
				default: '',
				description: 'JSON object with connection provisioning settings',
			},
		],
	},

	// ──────────────────────────────────────────────────────────────────────────────
	//  connection: setStatus
	// ──────────────────────────────────────────────────────────────────────────────
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		required: true,
		default: 1,
		displayOptions: {
			show: {
				resource: ['connection'],
				operation: ['setStatus'],
			},
		},
		options: [
			{
				name: 'Disabled',
				value: 0,
			},
			{
				name: 'Enabled',
				value: 1,
			},
		],
		description: 'The status to set for the connection',
	},

	// ──────────────────────────────────────────────────────────────────────────────
	//  connection: update
	// ──────────────────────────────────────────────────────────────────────────────
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['connection'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the connection',
			},
			{
				displayName: 'Provision JSON',
				name: 'provisionJson',
				type: 'json',
				default: '',
				description: 'JSON object with connection provisioning settings',
			},
		],
	},
];
