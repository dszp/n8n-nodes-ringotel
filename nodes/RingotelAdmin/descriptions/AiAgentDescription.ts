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
		displayName: 'Organization ID',
		name: 'organizationId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the organization',
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
				displayName: 'Connection ID',
				name: 'branchid',
				type: 'string',
				default: '',
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
				displayName: 'Connection ID',
				name: 'branchid',
				type: 'string',
				default: '',
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
