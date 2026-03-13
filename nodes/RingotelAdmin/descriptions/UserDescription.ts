import type { INodeProperties } from 'n8n-workflow';

export const userOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['user'],
			},
		},
		options: [
			{
				name: 'Attach',
				value: 'attach',
				action: 'Attach a user to a connection',
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create a user',
			},
			{
				name: 'Create Many',
				value: 'createMany',
				action: 'Create many users',
			},
			{
				name: 'Deactivate',
				value: 'deactivate',
				action: 'Deactivate a user',
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a user',
			},
			{
				name: 'Delete Device',
				value: 'deleteDevice',
				action: 'Delete a user device',
			},
			{
				name: 'Delete Many',
				value: 'deleteMany',
				action: 'Delete many users',
			},
			{
				name: 'Delete Recordings',
				value: 'deleteRecordings',
				action: 'Delete recordings for a user',
			},
			{
				name: 'Delete Transcriptions',
				value: 'deleteTranscriptions',
				action: 'Delete transcriptions for a user',
			},
			{
				name: 'Detach',
				value: 'detach',
				action: 'Detach a user from a connection',
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a user',
			},
			{
				name: 'Get Logs',
				value: 'getLogs',
				action: 'Get logs for a user',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many users',
			},
			{
				name: 'Get Phone Book URL',
				value: 'getPhoneBookUrl',
				action: 'Get the phone book URL',
			},
			{
				name: 'Get Registrations History',
				value: 'getRegistrationsHistory',
				action: 'Get registrations history for a user',
			},
			{
				name: 'Get SIP Credentials',
				value: 'getSipCredentials',
				action: 'Get SIP credentials for a user',
			},
			{
				name: 'Recover Deleted',
				value: 'recoverDeleted',
				action: 'Recover a deleted user',
			},
			{
				name: 'Reset Password',
				value: 'resetPassword',
				action: 'Reset password for a user',
			},
			{
				name: 'Resync SIP Device',
				value: 'resyncSipDevice',
				action: 'Resync SIP device for a user',
			},
			{
				name: 'Set Password',
				value: 'setPassword',
				action: 'Set password for a user',
			},
			{
				name: 'Set Settings',
				value: 'setSettings',
				action: 'Set settings for a user',
			},
			{
				name: 'Set State',
				value: 'setState',
				action: 'Set state of a user',
			},
			{
				name: 'Set Status',
				value: 'setStatus',
				action: 'Set status of a user',
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a user',
			},
		],
		default: 'get',
	},
];

export const userFields: INodeProperties[] = [
	// ------------------------------------------------------------------
	//  Shared fields
	// ------------------------------------------------------------------
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
				resource: ['user'],
				operation: [
					'attach',
					'create',
					'createMany',
					'deactivate',
					'delete',
					'deleteDevice',
					'deleteMany',
					'deleteRecordings',
					'deleteTranscriptions',
					'detach',
					'get',
					'getLogs',
					'getMany',
					'getPhoneBookUrl',
					'getRegistrationsHistory',
					'getSipCredentials',
					'recoverDeleted',
					'resetPassword',
					'resyncSipDevice',
					'setPassword',
					'setSettings',
					'setState',
					'setStatus',
					'update',
				],
			},
		},
		description: 'The organization to operate on. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: [
					'attach',
					'deactivate',
					'delete',
					'deleteDevice',
					'deleteRecordings',
					'deleteTranscriptions',
					'detach',
					'get',
					'getLogs',
					'getRegistrationsHistory',
					'getSipCredentials',
					'recoverDeleted',
					'resetPassword',
					'resyncSipDevice',
					'setPassword',
					'setSettings',
					'setState',
					'setStatus',
					'update',
				],
			},
		},
		description: 'The ID of the user',
	},
	{
		displayName: 'Connection Name or ID',
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
				resource: ['user'],
				operation: ['attach', 'create', 'createMany', 'detach'],
			},
		},
		description: 'The connection to operate on. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},

	// ------ user: attach ------
	{
		displayName: 'Extension',
		name: 'extension',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['attach'],
			},
		},
		description: 'PBX extension number for the attached connection',
	},

	// ------ user: create ------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create'],
			},
		},
		description: 'The name of the user',
	},
	{
		displayName: 'Extension',
		name: 'extension',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create'],
			},
		},
		description: 'PBX extension number',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Auth Name',
				name: 'authname',
				type: 'string',
				default: '',
				description: 'The auth name of the user',
			},
			{
				displayName: 'Username',
				name: 'username',
				type: 'string',
				default: '',
				description: 'The username of the user',
			},
		],
	},

	// ------ user: createMany ------
	{
		displayName: 'Users JSON',
		name: 'usersJson',
		type: 'json',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['createMany'],
			},
		},
		description: 'JSON array of user objects, each with name and extension',
	},

	// ------ user: deleteDevice ------
	{
		displayName: 'Device ID',
		name: 'deviceId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['deleteDevice'],
			},
		},
		description: 'The device ID to delete',
	},

	// ------ user: deleteMany ------
	{
		displayName: 'User IDs JSON',
		name: 'userIdsJson',
		type: 'json',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['deleteMany'],
			},
		},
		description: 'JSON array of user ID strings',
	},

	// ------ user: getMany ------
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['getMany'],
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
				description: 'Filter by connection. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
			},
		],
	},

	// ------ user: setPassword ------
	{
		displayName: 'Password',
		name: 'password',
		type: 'string',
		required: true,
		default: '',
		typeOptions: {
			password: true,
		},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['setPassword'],
			},
		},
		description: 'The password to set for the user',
	},

	// ------ user: setSettings ------
	{
		displayName: 'Settings JSON',
		name: 'settingsJson',
		type: 'json',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['setSettings'],
			},
		},
		description: 'JSON object with user settings',
	},

	// ------ user: setState ------
	{
		displayName: 'State',
		name: 'state',
		type: 'options',
		required: true,
		default: 1,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['setState'],
			},
		},
		options: [
			{
				name: 'Offline',
				value: 0,
			},
			{
				name: 'Online',
				value: 1,
			},
			{
				name: 'Away',
				value: 2,
			},
			{
				name: 'Do Not Disturb',
				value: 3,
			},
		],
		description: 'The state to set for the user',
	},

	// ------ user: setStatus ------
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		required: true,
		default: 1,
		displayOptions: {
			show: {
				resource: ['user'],
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
		description: 'The status to set for the user',
	},

	// ------ user: update ------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Auth Name',
				name: 'authname',
				type: 'string',
				default: '',
				description: 'The auth name of the user',
			},
			{
				displayName: 'Custom Properties JSON',
				name: 'customPropertiesJson',
				type: 'json',
				default: '',
				description: 'Custom properties as JSON object',
			},
			{
				displayName: 'Extension',
				name: 'extension',
				type: 'string',
				default: '',
				description: 'The PBX extension number',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the user',
			},
			{
				displayName: 'Username',
				name: 'username',
				type: 'string',
				default: '',
				description: 'The username of the user',
			},
		],
	},
];
