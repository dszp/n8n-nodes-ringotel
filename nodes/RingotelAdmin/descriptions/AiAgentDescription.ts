import type { INodeProperties } from 'n8n-workflow';

export const aiAgentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['aiAgent'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create an AI agent',
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete an AI agent',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many AI agents',
				description: 'Retrieve all AI agents for an organization',
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update an AI agent',
			},
		],
		default: 'getMany',
	},
];

export const aiAgentFields: INodeProperties[] = [
	// ──────────────────────────────────────────────────────────────────────
	//  aiAgent: shared fields
	// ──────────────────────────────────────────────────────────────────────
	{
		displayName: 'Organization Name or ID',
		name: 'organizationId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getOrganizations',
		},
		required: true,
		default: '',
		description: 'The organization to operate on. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: {
				resource: ['aiAgent'],
				operation: ['create', 'delete', 'getMany', 'update'],
			},
		},
	},
	{
		displayName: 'Agent ID',
		name: 'agentId',
		type: 'string',
		required: true,
		default: '',
		description: 'The AI agent ID',
		displayOptions: {
			show: {
				resource: ['aiAgent'],
				operation: ['delete', 'update'],
			},
		},
	},

	// ──────────────────────────────────────────────────────────────────────
	//  aiAgent: create
	// ──────────────────────────────────────────────────────────────────────
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		description: 'Agent name',
		displayOptions: {
			show: {
				resource: ['aiAgent'],
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
				resource: ['aiAgent'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Connection (Branch) Name or ID',
				name: 'branchid',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getConnections',
					loadOptionsDependsOn: ['organizationId'],
				},
				default: '',
				description: 'The connection (branch) to assign. Maps to "branchid" in API results. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
			},
			{
				displayName: 'Model',
				name: 'model',
				type: 'string',
				default: '',
				description: 'AI model to use',
			},
			{
				displayName: 'Prompt',
				name: 'prompt',
				type: 'string',
				default: '',
				description: 'Agent prompt/instructions',
			},
		],
	},

	// ──────────────────────────────────────────────────────────────────────
	//  aiAgent: update
	// ──────────────────────────────────────────────────────────────────────
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['aiAgent'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Connection (Branch) Name or ID',
				name: 'branchid',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getConnections',
					loadOptionsDependsOn: ['organizationId'],
				},
				default: '',
				description: 'The connection (branch) to assign. Maps to "branchid" in API results. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
			},
			{
				displayName: 'Model',
				name: 'model',
				type: 'string',
				default: '',
				description: 'AI model to use',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Agent name',
			},
			{
				displayName: 'Prompt',
				name: 'prompt',
				type: 'string',
				default: '',
				description: 'Agent prompt/instructions',
			},
		],
	},
];
