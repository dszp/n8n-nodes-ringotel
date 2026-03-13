import type { INodeProperties } from 'n8n-workflow';

export const packageOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['package'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many packages',
				description: 'Retrieve all available packages',
			},
		],
		default: 'getMany',
	},
];

export const packageFields: INodeProperties[] = [];
