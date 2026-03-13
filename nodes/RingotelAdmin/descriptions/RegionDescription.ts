import type { INodeProperties } from 'n8n-workflow';

export const regionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['region'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many regions',
			},
		],
		default: 'getMany',
	},
];

export const regionFields: INodeProperties[] = [];
