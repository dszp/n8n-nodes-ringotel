import type { INodeProperties } from 'n8n-workflow';

export const integrationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['integration'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many integration services',
				description: 'Retrieve all available integration services',
			},
		],
		default: 'getMany',
	},
];

export const integrationFields: INodeProperties[] = [];
