import type { INodeProperties } from 'n8n-workflow';

export const smsIntegrationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['smsTrunk'],
			},
		},
		options: [
			{
				name: 'Add to Opt-Out',
				value: 'addToOptout',
				action: 'Add a phone number to opt out list',
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create an SMS trunk',
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete an SMS trunk',
			},
			{
				name: 'Get Chats',
				value: 'getChats',
				action: 'Get chats for an SMS trunk',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many SMS trunks',
			},
			{
				name: 'Get Opt-Out List',
				value: 'getOptoutList',
				action: 'Get the opt out list for an sms trunk',
			},
			{
				name: 'Remove From Opt-Out',
				value: 'removeFromOptout',
				action: 'Remove a phone number from opt out list',
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update an SMS trunk',
			},
		],
		default: 'getMany',
	},
];

export const smsIntegrationFields: INodeProperties[] = [
	// ──────────────────────────────────────────────────────────────────────────────
	//  smsTrunk: shared fields
	// ──────────────────────────────────────────────────────────────────────────────
	{
		displayName: 'Organization ID',
		name: 'organizationId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['smsTrunk'],
				operation: [
					'addToOptout',
					'create',
					'delete',
					'getChats',
					'getMany',
					'getOptoutList',
					'removeFromOptout',
					'update',
				],
			},
		},
		description: 'The ID of the organization',
	},
	{
		displayName: 'SMS Trunk ID',
		name: 'smsTrunkId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['smsTrunk'],
				operation: [
					'addToOptout',
					'delete',
					'getChats',
					'getOptoutList',
					'removeFromOptout',
					'update',
				],
			},
		},
		description: 'The ID of the SMS trunk',
	},
	{
		displayName: 'Phone',
		name: 'phone',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['smsTrunk'],
				operation: ['addToOptout', 'removeFromOptout'],
			},
		},
		description: 'Phone number to add',
	},

	// ──────────────────────────────────────────────────────────────────────────────
	//  smsTrunk: create
	// ──────────────────────────────────────────────────────────────────────────────
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['smsTrunk'],
				operation: ['create'],
			},
		},
		description: 'The name of the SMS trunk',
	},
	{
		displayName: 'Number',
		name: 'number',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['smsTrunk'],
				operation: ['create'],
			},
		},
		description: 'SMS trunk phone number',
	},
	{
		displayName: 'Service',
		name: 'service',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['smsTrunk'],
				operation: ['create'],
			},
		},
		description: 'Service name, e.g. Twilio',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['smsTrunk'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				default: '',
				description: 'Country code ALPHA-2',
			},
			{
				displayName: 'Inbound Format',
				name: 'inboundFormat',
				type: 'options',
				default: '',
				options: [
					{
						name: 'E.164',
						value: 'e164',
					},
					{
						name: 'National',
						value: 'national',
					},
					{
						name: 'National with 0',
						value: 'national0',
					},
					{
						name: 'None',
						value: '',
					},
				],
				description: 'The inbound number format',
			},
			{
				displayName: 'Outbound Format',
				name: 'outboundFormat',
				type: 'options',
				default: '',
				options: [
					{
						name: 'E.164',
						value: 'e164',
					},
					{
						name: 'International',
						value: 'international',
					},
					{
						name: 'National',
						value: 'national',
					},
					{
						name: 'None',
						value: '',
					},
				],
				description: 'The outbound number format',
			},
			{
				displayName: 'Send Name',
				name: 'sendName',
				type: 'boolean',
				default: false,
				description: 'Whether to send user names in messages',
			},
			{
				displayName: 'Session Timeout',
				name: 'sessionTimeout',
				type: 'number',
				default: 0,
				description: 'Session timeout in seconds. 0 means disabled.',
			},
			{
				displayName: 'Users',
				name: 'users',
				type: 'string',
				default: '',
				description: 'Comma-separated user IDs to assign',
			},
		],
	},

	// ──────────────────────────────────────────────────────────────────────────────
	//  smsTrunk: update
	// ──────────────────────────────────────────────────────────────────────────────
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['smsTrunk'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				default: '',
				description: 'Country code ALPHA-2',
			},
			{
				displayName: 'Inbound Format',
				name: 'inboundFormat',
				type: 'options',
				default: '',
				options: [
					{
						name: 'E.164',
						value: 'e164',
					},
					{
						name: 'National',
						value: 'national',
					},
					{
						name: 'National with 0',
						value: 'national0',
					},
					{
						name: 'None',
						value: '',
					},
				],
				description: 'The inbound number format',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the SMS trunk',
			},
			{
				displayName: 'Number',
				name: 'number',
				type: 'string',
				default: '',
				description: 'SMS trunk phone number',
			},
			{
				displayName: 'Outbound Format',
				name: 'outboundFormat',
				type: 'options',
				default: '',
				options: [
					{
						name: 'E.164',
						value: 'e164',
					},
					{
						name: 'International',
						value: 'international',
					},
					{
						name: 'National',
						value: 'national',
					},
					{
						name: 'None',
						value: '',
					},
				],
				description: 'The outbound number format',
			},
			{
				displayName: 'Send Name',
				name: 'sendName',
				type: 'boolean',
				default: false,
				description: 'Whether to send user names in messages',
			},
			{
				displayName: 'Service',
				name: 'service',
				type: 'string',
				default: '',
				description: 'Service name, e.g. Twilio',
			},
			{
				displayName: 'Session Timeout',
				name: 'sessionTimeout',
				type: 'number',
				default: 0,
				description: 'Session timeout in seconds. 0 means disabled.',
			},
			{
				displayName: 'Users',
				name: 'users',
				type: 'string',
				default: '',
				description: 'Comma-separated user IDs to assign',
			},
		],
	},
];
