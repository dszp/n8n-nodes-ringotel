import type { INodeProperties } from 'n8n-workflow';

export const callOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['call'],
			},
		},
		options: [
			{
				name: 'Initiate',
				value: 'initiate',
				action: 'Initiate a call',
				description: 'Initialize a call between two parties',
			},
			{
				name: 'Update Activity',
				value: 'updateActivity',
				action: 'Update a call activity',
				description: 'Update call activity with subject and comment',
			},
		],
		default: 'initiate',
	},
];

export const callFields: INodeProperties[] = [
	// ──────────────────────────────────────────────────────────────────────────────
	//  call: initiate
	// ──────────────────────────────────────────────────────────────────────────────
	{
		displayName: 'From',
		name: 'from',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['call'],
				operation: ['initiate'],
			},
		},
		description: "User's extension number",
	},
	{
		displayName: 'To Number',
		name: 'tonumber',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['call'],
				operation: ['initiate'],
			},
		},
		description: 'Subscriber number to call',
	},
	{
		displayName: 'To Name',
		name: 'toname',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['call'],
				operation: ['initiate'],
			},
		},
		description: 'Subscriber name',
	},
	{
		displayName: 'Organization Domain',
		name: 'orgDomain',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['call'],
				operation: ['initiate'],
			},
		},
	},

	// ──────────────────────────────────────────────────────────────────────────────
	//  call: updateActivity
	// ──────────────────────────────────────────────────────────────────────────────
	{
		displayName: 'Activity ID',
		name: 'activityId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['call'],
				operation: ['updateActivity'],
			},
		},
	},
	{
		displayName: 'Organization Domain',
		name: 'orgDomain',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['call'],
				operation: ['updateActivity'],
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
				resource: ['call'],
				operation: ['updateActivity'],
			},
		},
		options: [
			{
				displayName: 'Comment',
				name: 'comment',
				type: 'string',
				default: '',
				description: 'Call comment',
			},
			{
				displayName: 'Subject',
				name: 'subject',
				type: 'string',
				default: '',
				description: 'Call subject',
			},
		],
	},
];
