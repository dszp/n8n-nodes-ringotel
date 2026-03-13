import type {
	IExecuteFunctions,
	ICredentialTestFunctions,
	ICredentialsDecrypted,
	IDataObject,
	INodeCredentialTestResult,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError, NodeOperationError } from 'n8n-workflow';

import {
	ringotelAdminApiRequest,
	testRingotelAdminCredential,
	getOrganizationOptions,
	getConnectionOptions,
	invalidateOrgCache,
	invalidateConnectionCache,
} from './GenericFunctions';

import { organizationOperations, organizationFields } from './descriptions/OrganizationDescription';
import { connectionOperations, connectionFields } from './descriptions/ConnectionDescription';
import { userOperations, userFields } from './descriptions/UserDescription';
import { contactOperations, contactFields } from './descriptions/ContactDescription';
import {
	smsIntegrationOperations,
	smsIntegrationFields,
} from './descriptions/SmsIntegrationDescription';
import { accountOperations, accountFields } from './descriptions/AccountDescription';
import { aiAgentOperations, aiAgentFields } from './descriptions/AiAgentDescription';
import { regionOperations, regionFields } from './descriptions/RegionDescription';
import { integrationOperations, integrationFields } from './descriptions/IntegrationDescription';
import { packageOperations, packageFields } from './descriptions/PackageDescription';
import { callOperations, callFields } from './descriptions/CallDescription';

export class RingotelAdmin implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Ringotel Admin',
		name: 'ringotelAdmin',
		icon: 'file:ringotelAdmin.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Ringotel Admin API',
		defaults: {
			name: 'Ringotel Admin',
		},
		inputs: ['main'],
		outputs: ['main'],
		usableAsTool: true,
		credentials: [
			{
				name: 'ringotelAdminApi',
				required: true,
				testedBy: 'testRingotelAdminCredential',
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Account',
						value: 'account',
					},
					{
						name: 'AI Agent',
						value: 'aiAgent',
					},
					{
						name: 'Call',
						value: 'call',
					},
					{
						name: 'Connection',
						value: 'connection',
					},
					{
						name: 'Contact',
						value: 'contact',
					},
					{
						name: 'Integration',
						value: 'integration',
					},
					{
						name: 'Organization',
						value: 'organization',
					},
					{
						name: 'Package',
						value: 'package',
					},
					{
						name: 'Region',
						value: 'region',
					},
					{
						name: 'SMS Trunk',
						value: 'smsTrunk',
					},
					{
						name: 'User',
						value: 'user',
					},
				],
				default: 'organization',
			},
			...accountOperations,
			...accountFields,
			...aiAgentOperations,
			...aiAgentFields,
			...callOperations,
			...callFields,
			...connectionOperations,
			...connectionFields,
			...contactOperations,
			...contactFields,
			...integrationOperations,
			...integrationFields,
			...organizationOperations,
			...organizationFields,
			...packageOperations,
			...packageFields,
			...regionOperations,
			...regionFields,
			...smsIntegrationOperations,
			...smsIntegrationFields,
			...userOperations,
			...userFields,
		],
	};

	methods = {
		credentialTest: {
			async testRingotelAdminCredential(
				this: ICredentialTestFunctions,
				credential: ICredentialsDecrypted,
			): Promise<INodeCredentialTestResult> {
				const credentials = credential.data as IDataObject;
				const baseUrl = (credentials.baseUrl as string).replace(/\/$/, '');
				const apiKey = credentials.apiKey as string;

				try {
					await testRingotelAdminCredential.call(this, baseUrl, apiKey);
					return {
						status: 'OK',
						message: 'Connection successful',
					};
				} catch (error) {
					return {
						status: 'Error',
						message: `Connection failed: ${(error as Error).message}`,
					};
				}
			},
		},
		loadOptions: {
			getOrganizations: getOrganizationOptions,
			getConnections: getConnectionOptions,
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: IDataObject | IDataObject[];

				if (resource === 'organization' && ['create', 'delete', 'update'].includes(operation)) {
					const credentials = await this.getCredentials('ringotelAdminApi');
					responseData = await handleOrganization.call(this, operation, i);
					invalidateOrgCache(credentials);
				} else if (resource === 'account') {
					responseData = await handleAccount.call(this, operation, i);
				} else if (resource === 'aiAgent') {
					responseData = await handleAiAgent.call(this, operation, i);
				} else if (resource === 'call') {
					responseData = await handleCall.call(this, operation, i);
				} else if (resource === 'connection' && ['create', 'delete', 'update'].includes(operation)) {
					const credentials = await this.getCredentials('ringotelAdminApi');
					const orgid = this.getNodeParameter('organizationId', i) as string;
					responseData = await handleConnection.call(this, operation, i);
					invalidateConnectionCache(credentials, orgid);
				} else if (resource === 'connection') {
					responseData = await handleConnection.call(this, operation, i);
				} else if (resource === 'contact') {
					responseData = await handleContact.call(this, operation, i);
				} else if (resource === 'integration') {
					responseData = await handleIntegration.call(this, operation, i);
				} else if (resource === 'organization') {
					responseData = await handleOrganization.call(this, operation, i);
				} else if (resource === 'package') {
					responseData = await handlePackage.call(this, operation, i);
				} else if (resource === 'region') {
					responseData = await handleRegion.call(this, operation, i);
				} else if (resource === 'smsTrunk') {
					responseData = await handleSmsTrunk.call(this, operation, i);
				} else if (resource === 'user') {
					responseData = await handleUser.call(this, operation, i);
				} else {
					throw new NodeApiError(
						this.getNode(),
						{ message: `Unknown resource: ${resource}` } as JsonObject,
					);
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: (error as Error).message },
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}

// ──────────────────────────────────────────────────────────────────────────────
//  Resource Handlers
// ──────────────────────────────────────────────────────────────────────────────

async function handleOrganization(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	if (operation === 'create') {
		const params: IDataObject = {
			name: this.getNodeParameter('name', i) as string,
			domain: this.getNodeParameter('domain', i) as string,
			region: this.getNodeParameter('region', i) as string,
		};
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		if (additionalFields.admlogin) params.admlogin = additionalFields.admlogin;
		if (additionalFields.admpassw) params.admpassw = additionalFields.admpassw;
		if (additionalFields.packageid) params.packageid = additionalFields.packageid;
		// Nested params object for additional settings
		const nestedParams: IDataObject = {};
		if (additionalFields.tags) nestedParams.tags = additionalFields.tags;
		if (additionalFields.hidePassInEmail !== undefined)
			nestedParams.hidePassInEmail = additionalFields.hidePassInEmail;
		if (additionalFields.lang) nestedParams.lang = additionalFields.lang;
		if (additionalFields.admperms !== undefined) nestedParams.admperms = additionalFields.admperms;
		if (additionalFields.emailcc) nestedParams.emailcc = additionalFields.emailcc;
		if (Object.keys(nestedParams).length > 0) params.params = nestedParams;
		return await ringotelAdminApiRequest.call(this, 'createOrganization', params);
	}

	if (operation === 'delete') {
		const id = this.getNodeParameter('organizationId', i) as string;
		await ringotelAdminApiRequest.call(this, 'deleteOrganization', { id });
		return { deleted: true };
	}

	if (operation === 'get') {
		const id = this.getNodeParameter('organizationId', i) as string;
		return await ringotelAdminApiRequest.call(this, 'getOrganization', { id });
	}

	if (operation === 'getMany') {
		return await ringotelAdminApiRequest.call(this, 'getOrganizations', {});
	}

	if (operation === 'update') {
		const params: IDataObject = {
			id: this.getNodeParameter('organizationId', i) as string,
		};
		const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
		if (updateFields.name) params.name = updateFields.name;
		if (updateFields.admlogin) params.admlogin = updateFields.admlogin;
		if (updateFields.admpassw) params.admpassw = updateFields.admpassw;
		if (updateFields.packageid) params.packageid = updateFields.packageid;
		// Nested params
		const nestedParams: IDataObject = {};
		if (updateFields.tags) nestedParams.tags = updateFields.tags;
		if (updateFields.hidePassInEmail !== undefined)
			nestedParams.hidePassInEmail = updateFields.hidePassInEmail;
		if (updateFields.lang) nestedParams.lang = updateFields.lang;
		if (updateFields.admperms !== undefined) nestedParams.admperms = updateFields.admperms;
		if (updateFields.emailcc) nestedParams.emailcc = updateFields.emailcc;
		if (Object.keys(nestedParams).length > 0) params.params = nestedParams;
		return await ringotelAdminApiRequest.call(this, 'updateOrganization', params);
	}

	if (operation === 'setStatus') {
		const id = this.getNodeParameter('organizationId', i) as string;
		const status = this.getNodeParameter('status', i) as number;
		return await ringotelAdminApiRequest.call(this, 'setOrganizationStatus', { id, status });
	}

	if (operation === 'getEventLog') {
		const orgid = this.getNodeParameter('organizationId', i) as string;
		const begin = this.getNodeParameter('begin', i) as number;
		const end = this.getNodeParameter('end', i) as number;
		return await ringotelAdminApiRequest.call(this, 'getEventLog', { orgid, begin, end });
	}

	if (operation === 'getCalls') {
		const orgid = this.getNodeParameter('organizationId', i) as string;
		const begin = this.getNodeParameter('begin', i) as number;
		const end = this.getNodeParameter('end', i) as number;
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		const params: IDataObject = { orgid, begin, end };
		if (additionalFields.userid) params.userid = additionalFields.userid;
		return await ringotelAdminApiRequest.call(this, 'getCalls', params);
	}

	if (operation === 'getActivitySubjects') {
		const orgid = this.getNodeParameter('organizationId', i) as string;
		return await ringotelAdminApiRequest.call(this, 'getActivitySubjects', { orgid });
	}

	if (operation === 'setActivitySubjects') {
		const orgid = this.getNodeParameter('organizationId', i) as string;
		const domain = this.getNodeParameter('orgDomain', i) as string;
		const subjects = this.getNodeParameter('subjects', i) as string;
		let subjectsArray: string[];
		try {
			subjectsArray = JSON.parse(subjects) as string[];
		} catch {
			subjectsArray = subjects.split(',').map((s) => s.trim());
		}
		return await ringotelAdminApiRequest.call(this, 'setActivitySubjects', {
			orgid,
			domain,
			subjects: subjectsArray,
		});
	}

	throw new NodeOperationError(this.getNode(), `Unknown organization operation: ${operation}`);
}

async function handleConnection(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	if (operation === 'create') {
		const params: IDataObject = {
			orgid: this.getNodeParameter('organizationId', i) as string,
		};
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		Object.assign(params, additionalFields);
		// Handle nested provision object
		if (additionalFields.provisionJson) {
			try {
				params.provision = JSON.parse(additionalFields.provisionJson as string);
			} catch {
				throw new NodeOperationError(this.getNode(), 'Invalid JSON in Provision field', {
					itemIndex: i,
				});
			}
			delete params.provisionJson;
		}
		return await ringotelAdminApiRequest.call(this, 'createBranch', params);
	}

	if (operation === 'delete') {
		const id = this.getNodeParameter('connectionId', i) as string;
		const orgid = this.getNodeParameter('organizationId', i) as string;
		await ringotelAdminApiRequest.call(this, 'deleteBranch', { id, orgid });
		return { deleted: true };
	}

	if (operation === 'get') {
		const id = this.getNodeParameter('connectionId', i) as string;
		const orgid = this.getNodeParameter('organizationId', i) as string;
		return await ringotelAdminApiRequest.call(this, 'getBranch', { id, orgid });
	}

	if (operation === 'getMany') {
		const orgid = this.getNodeParameter('organizationId', i) as string;
		return await ringotelAdminApiRequest.call(this, 'getBranches', { orgid });
	}

	if (operation === 'update') {
		const params: IDataObject = {
			id: this.getNodeParameter('connectionId', i) as string,
			orgid: this.getNodeParameter('organizationId', i) as string,
		};
		const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
		Object.assign(params, updateFields);
		if (updateFields.provisionJson) {
			try {
				params.provision = JSON.parse(updateFields.provisionJson as string);
			} catch {
				throw new NodeOperationError(this.getNode(), 'Invalid JSON in Provision field', {
					itemIndex: i,
				});
			}
			delete params.provisionJson;
		}
		return await ringotelAdminApiRequest.call(this, 'updateBranch', params);
	}

	if (operation === 'setStatus') {
		const id = this.getNodeParameter('connectionId', i) as string;
		const orgid = this.getNodeParameter('organizationId', i) as string;
		const status = this.getNodeParameter('status', i) as number;
		return await ringotelAdminApiRequest.call(this, 'setBranchStatus', { id, orgid, status });
	}

	if (operation === 'getOptions') {
		const id = this.getNodeParameter('connectionId', i) as string;
		const orgid = this.getNodeParameter('organizationId', i) as string;
		return await ringotelAdminApiRequest.call(this, 'getBranchOptions', { id, orgid });
	}

	if (operation === 'getTemplates') {
		const orgid = this.getNodeParameter('organizationId', i) as string;
		return await ringotelAdminApiRequest.call(this, 'getTemplates', { orgid });
	}

	throw new NodeOperationError(this.getNode(), `Unknown connection operation: ${operation}`);
}

async function handleUser(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	if (operation === 'create') {
		const orgid = this.getNodeParameter('organizationId', i) as string;
		const params: IDataObject = {
			orgid,
			branchid: this.getNodeParameter('connectionId', i) as string,
			name: this.getNodeParameter('name', i) as string,
			extension: this.getNodeParameter('extension', i) as string,
		};
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		Object.assign(params, additionalFields);
		const result = (await ringotelAdminApiRequest.call(
			this,
			'createUser',
			params,
		)) as IDataObject;
		result.orgid = orgid;
		return result;
	}

	if (operation === 'createMany') {
		const orgid = this.getNodeParameter('organizationId', i) as string;
		const branchid = this.getNodeParameter('connectionId', i) as string;
		const usersJson = this.getNodeParameter('usersJson', i) as string;
		let users: IDataObject[];
		try {
			users = JSON.parse(usersJson) as IDataObject[];
		} catch {
			throw new NodeOperationError(this.getNode(), 'Invalid JSON in Users field', {
				itemIndex: i,
			});
		}
		const results = (await ringotelAdminApiRequest.call(this, 'createUsers', {
			orgid,
			branchid,
			users,
		})) as IDataObject[];
		for (const user of results) {
			user.orgid = orgid;
		}
		return results;
	}

	if (operation === 'delete') {
		const userid = this.getNodeParameter('userId', i) as string;
		const orgid = this.getNodeParameter('organizationId', i) as string;
		await ringotelAdminApiRequest.call(this, 'deleteUser', { userid, orgid });
		return { deleted: true };
	}

	if (operation === 'deleteMany') {
		const orgid = this.getNodeParameter('organizationId', i) as string;
		const usersJson = this.getNodeParameter('userIdsJson', i) as string;
		let users: string[];
		try {
			users = JSON.parse(usersJson) as string[];
		} catch {
			throw new NodeOperationError(this.getNode(), 'Invalid JSON in User IDs field', {
				itemIndex: i,
			});
		}
		await ringotelAdminApiRequest.call(this, 'deleteUsers', { orgid, users });
		return { deleted: true };
	}

	if (operation === 'get') {
		const userid = this.getNodeParameter('userId', i) as string;
		const orgid = this.getNodeParameter('organizationId', i) as string;
		const result = (await ringotelAdminApiRequest.call(this, 'getUser', {
			id: userid,
			orgid,
		})) as IDataObject;
		result.orgid = orgid;
		return result;
	}

	if (operation === 'getMany') {
		const orgid = this.getNodeParameter('organizationId', i) as string;
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		const params: IDataObject = { orgid };
		if (additionalFields.branchid) params.branchid = additionalFields.branchid;
		const results = (await ringotelAdminApiRequest.call(
			this,
			'getUsers',
			params,
		)) as IDataObject[];
		for (const user of results) {
			user.orgid = orgid;
		}
		return results;
	}

	if (operation === 'update') {
		const params: IDataObject = {
			userid: this.getNodeParameter('userId', i) as string,
			orgid: this.getNodeParameter('organizationId', i) as string,
		};
		const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
		Object.assign(params, updateFields);
		// Handle custom properties JSON
		if (updateFields.customPropertiesJson) {
			try {
				params.customProperties = JSON.parse(updateFields.customPropertiesJson as string);
			} catch {
				throw new NodeOperationError(this.getNode(), 'Invalid JSON in Custom Properties field', {
					itemIndex: i,
				});
			}
			delete params.customPropertiesJson;
		}
		return await ringotelAdminApiRequest.call(this, 'updateUser', params);
	}

	if (operation === 'attach') {
		const userid = this.getNodeParameter('userId', i) as string;
		const orgid = this.getNodeParameter('organizationId', i) as string;
		const branchid = this.getNodeParameter('connectionId', i) as string;
		const extension = this.getNodeParameter('extension', i) as string;
		return await ringotelAdminApiRequest.call(this, 'attachUser', {
			userid,
			orgid,
			branchid,
			extension,
		});
	}

	if (operation === 'deactivate') {
		const userid = this.getNodeParameter('userId', i) as string;
		const orgid = this.getNodeParameter('organizationId', i) as string;
		return await ringotelAdminApiRequest.call(this, 'deactivateUser', { userid, orgid });
	}

	if (operation === 'deleteDevice') {
		const userid = this.getNodeParameter('userId', i) as string;
		const orgid = this.getNodeParameter('organizationId', i) as string;
		const deviceid = this.getNodeParameter('deviceId', i) as string;
		await ringotelAdminApiRequest.call(this, 'deleteDevice', { userid, orgid, deviceid });
		return { deleted: true };
	}

	if (operation === 'deleteRecordings') {
		const userid = this.getNodeParameter('userId', i) as string;
		const orgid = this.getNodeParameter('organizationId', i) as string;
		await ringotelAdminApiRequest.call(this, 'deleteRecordings', { userid, orgid });
		return { deleted: true };
	}

	if (operation === 'deleteTranscriptions') {
		const userid = this.getNodeParameter('userId', i) as string;
		const orgid = this.getNodeParameter('organizationId', i) as string;
		await ringotelAdminApiRequest.call(this, 'deleteTranscriptions', { userid, orgid });
		return { deleted: true };
	}

	if (operation === 'detach') {
		const userid = this.getNodeParameter('userId', i) as string;
		const orgid = this.getNodeParameter('organizationId', i) as string;
		const branchid = this.getNodeParameter('connectionId', i) as string;
		return await ringotelAdminApiRequest.call(this, 'detachUser', { userid, orgid, branchid });
	}

	if (operation === 'getLogs') {
		const userid = this.getNodeParameter('userId', i) as string;
		const orgid = this.getNodeParameter('organizationId', i) as string;
		return await ringotelAdminApiRequest.call(this, 'getUserLogs', { userid, orgid });
	}

	if (operation === 'getPhoneBookUrl') {
		const orgid = this.getNodeParameter('organizationId', i) as string;
		return await ringotelAdminApiRequest.call(this, 'getPhoneBookURL', { orgid });
	}

	if (operation === 'getRegistrationsHistory') {
		const userid = this.getNodeParameter('userId', i) as string;
		const orgid = this.getNodeParameter('organizationId', i) as string;
		return await ringotelAdminApiRequest.call(this, 'getUserRegistrationsHistory', {
			userid,
			orgid,
		});
	}

	if (operation === 'getSipCredentials') {
		const userid = this.getNodeParameter('userId', i) as string;
		const orgid = this.getNodeParameter('organizationId', i) as string;
		return await ringotelAdminApiRequest.call(this, 'getSIPCredentials', { userid, orgid });
	}

	if (operation === 'recoverDeleted') {
		const userid = this.getNodeParameter('userId', i) as string;
		const orgid = this.getNodeParameter('organizationId', i) as string;
		return await ringotelAdminApiRequest.call(this, 'recoverDeletedUser', { userid, orgid });
	}

	if (operation === 'resetPassword') {
		const userid = this.getNodeParameter('userId', i) as string;
		const orgid = this.getNodeParameter('organizationId', i) as string;
		return await ringotelAdminApiRequest.call(this, 'resetUserPassword', { userid, orgid });
	}

	if (operation === 'resyncSipDevice') {
		const userid = this.getNodeParameter('userId', i) as string;
		const orgid = this.getNodeParameter('organizationId', i) as string;
		return await ringotelAdminApiRequest.call(this, 'resyncSIPDevice', { userid, orgid });
	}

	if (operation === 'setPassword') {
		const userid = this.getNodeParameter('userId', i) as string;
		const orgid = this.getNodeParameter('organizationId', i) as string;
		const password = this.getNodeParameter('password', i) as string;
		return await ringotelAdminApiRequest.call(this, 'setUserPassword', {
			userid,
			orgid,
			password,
		});
	}

	if (operation === 'setSettings') {
		const userid = this.getNodeParameter('userId', i) as string;
		const orgid = this.getNodeParameter('organizationId', i) as string;
		const settingsJson = this.getNodeParameter('settingsJson', i) as string;
		let settings: IDataObject;
		try {
			settings = JSON.parse(settingsJson) as IDataObject;
		} catch {
			throw new NodeOperationError(this.getNode(), 'Invalid JSON in Settings field', {
				itemIndex: i,
			});
		}
		return await ringotelAdminApiRequest.call(this, 'setUserSettings', {
			userid,
			orgid,
			settings,
		});
	}

	if (operation === 'setState') {
		const userid = this.getNodeParameter('userId', i) as string;
		const orgid = this.getNodeParameter('organizationId', i) as string;
		const state = this.getNodeParameter('state', i) as number;
		return await ringotelAdminApiRequest.call(this, 'setUserState', { userid, orgid, state });
	}

	if (operation === 'setStatus') {
		const userid = this.getNodeParameter('userId', i) as string;
		const orgid = this.getNodeParameter('organizationId', i) as string;
		const status = this.getNodeParameter('status', i) as number;
		return await ringotelAdminApiRequest.call(this, 'setUserStatus', { userid, orgid, status });
	}

	throw new NodeOperationError(this.getNode(), `Unknown user operation: ${operation}`);
}

async function handleContact(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	if (operation === 'delete') {
		const orgid = this.getNodeParameter('organizationId', i) as string;
		const contactsJson = this.getNodeParameter('contactIdsJson', i) as string;
		let contacts: string[];
		try {
			contacts = JSON.parse(contactsJson) as string[];
		} catch {
			throw new NodeOperationError(this.getNode(), 'Invalid JSON in Contact IDs field', {
				itemIndex: i,
			});
		}
		await ringotelAdminApiRequest.call(this, 'deleteContacts', { orgid, contacts });
		return { deleted: true };
	}

	if (operation === 'getBlocked') {
		const orgid = this.getNodeParameter('organizationId', i) as string;
		return await ringotelAdminApiRequest.call(this, 'getBlockedContacts', { orgid });
	}

	if (operation === 'getMany') {
		const orgid = this.getNodeParameter('organizationId', i) as string;
		return await ringotelAdminApiRequest.call(this, 'getContacts', { orgid });
	}

	if (operation === 'import') {
		const orgid = this.getNodeParameter('organizationId', i) as string;
		const contactsJson = this.getNodeParameter('contactsJson', i) as string;
		let contacts: IDataObject[];
		try {
			contacts = JSON.parse(contactsJson) as IDataObject[];
		} catch {
			throw new NodeOperationError(this.getNode(), 'Invalid JSON in Contacts field', {
				itemIndex: i,
			});
		}
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		const params: IDataObject = { orgid, contacts };
		if (additionalFields.branchid) params.branchid = additionalFields.branchid;
		return await ringotelAdminApiRequest.call(this, 'importContacts', params);
	}

	if (operation === 'setBlocked') {
		const orgid = this.getNodeParameter('organizationId', i) as string;
		const blocked = this.getNodeParameter('blocked', i) as boolean;
		const params: IDataObject = { orgid, blocked };
		const contactId = this.getNodeParameter('contactId', i, '') as string;
		const phone = this.getNodeParameter('phone', i, '') as string;
		if (contactId) params.id = contactId;
		if (phone) params.phone = phone;
		return await ringotelAdminApiRequest.call(this, 'setContactBlocked', params);
	}

	if (operation === 'update') {
		const orgid = this.getNodeParameter('organizationId', i) as string;
		const contactsJson = this.getNodeParameter('contactsJson', i) as string;
		let contacts: IDataObject[];
		try {
			contacts = JSON.parse(contactsJson) as IDataObject[];
		} catch {
			throw new NodeOperationError(this.getNode(), 'Invalid JSON in Contacts field', {
				itemIndex: i,
			});
		}
		return await ringotelAdminApiRequest.call(this, 'updateContacts', { orgid, contacts });
	}

	throw new NodeOperationError(this.getNode(), `Unknown contact operation: ${operation}`);
}

async function handleSmsTrunk(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	if (operation === 'create') {
		const params: IDataObject = {
			orgid: this.getNodeParameter('organizationId', i) as string,
			name: this.getNodeParameter('name', i) as string,
			number: this.getNodeParameter('number', i) as string,
			service: this.getNodeParameter('service', i) as string,
		};
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		Object.assign(params, additionalFields);
		return await ringotelAdminApiRequest.call(this, 'createSMSTrunk', params);
	}

	if (operation === 'delete') {
		const id = this.getNodeParameter('smsTrunkId', i) as string;
		const orgid = this.getNodeParameter('organizationId', i) as string;
		await ringotelAdminApiRequest.call(this, 'deleteSMSTrunk', { id, orgid });
		return { deleted: true };
	}

	if (operation === 'getChats') {
		const orgid = this.getNodeParameter('organizationId', i) as string;
		const trunkid = this.getNodeParameter('smsTrunkId', i) as string;
		return await ringotelAdminApiRequest.call(this, 'getChats', { orgid, trunkid });
	}

	if (operation === 'getMany') {
		const orgid = this.getNodeParameter('organizationId', i) as string;
		return await ringotelAdminApiRequest.call(this, 'getSMSTrunks', { orgid });
	}

	if (operation === 'getOptoutList') {
		const orgid = this.getNodeParameter('organizationId', i) as string;
		const trunkid = this.getNodeParameter('smsTrunkId', i) as string;
		return await ringotelAdminApiRequest.call(this, 'getOptoutList', { orgid, trunkid });
	}

	if (operation === 'addToOptout') {
		const orgid = this.getNodeParameter('organizationId', i) as string;
		const trunkid = this.getNodeParameter('smsTrunkId', i) as string;
		const phone = this.getNodeParameter('phone', i) as string;
		return await ringotelAdminApiRequest.call(this, 'addToOptout', { orgid, trunkid, phone });
	}

	if (operation === 'removeFromOptout') {
		const orgid = this.getNodeParameter('organizationId', i) as string;
		const trunkid = this.getNodeParameter('smsTrunkId', i) as string;
		const phone = this.getNodeParameter('phone', i) as string;
		return await ringotelAdminApiRequest.call(this, 'removeFromOptout', { orgid, trunkid, phone });
	}

	if (operation === 'update') {
		const params: IDataObject = {
			id: this.getNodeParameter('smsTrunkId', i) as string,
			orgid: this.getNodeParameter('organizationId', i) as string,
		};
		const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
		Object.assign(params, updateFields);
		return await ringotelAdminApiRequest.call(this, 'updateSMSTrunk', params);
	}

	throw new NodeOperationError(this.getNode(), `Unknown SMS trunk operation: ${operation}`);
}

async function handleAccount(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	if (operation === 'get') {
		return await ringotelAdminApiRequest.call(this, 'getAccount', {});
	}

	if (operation === 'getManyUsers') {
		return await ringotelAdminApiRequest.call(this, 'getAccountUsers', {});
	}

	if (operation === 'getHistory') {
		const begin = this.getNodeParameter('begin', i) as number;
		const end = this.getNodeParameter('end', i) as number;
		return await ringotelAdminApiRequest.call(this, 'getAccountHistory', { begin, end });
	}

	if (operation === 'getStatistics') {
		const begin = this.getNodeParameter('begin', i) as number;
		const end = this.getNodeParameter('end', i) as number;
		return await ringotelAdminApiRequest.call(this, 'getAccountStatistics', { begin, end });
	}

	if (operation === 'getAiUsageInfo') {
		const domain = this.getNodeParameter('domain', i) as string;
		const begin = this.getNodeParameter('begin', i) as number;
		const end = this.getNodeParameter('end', i) as number;
		return await ringotelAdminApiRequest.call(this, 'getAIUsageInfo', { domain, begin, end });
	}

	if (operation === 'createAdmin') {
		const params: IDataObject = {
			login: this.getNodeParameter('login', i) as string,
			password: this.getNodeParameter('password', i) as string,
		};
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		Object.assign(params, additionalFields);
		return await ringotelAdminApiRequest.call(this, 'createAccountAdmin', params);
	}

	if (operation === 'updateAdmin') {
		const params: IDataObject = {
			login: this.getNodeParameter('login', i) as string,
		};
		const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
		Object.assign(params, updateFields);
		return await ringotelAdminApiRequest.call(this, 'updateAccountAdmin', params);
	}

	if (operation === 'deleteAdmin') {
		const login = this.getNodeParameter('login', i) as string;
		await ringotelAdminApiRequest.call(this, 'deleteAccountAdmin', { login });
		return { deleted: true };
	}

	throw new NodeOperationError(this.getNode(), `Unknown account operation: ${operation}`);
}

async function handleAiAgent(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	if (operation === 'create') {
		const params: IDataObject = {
			orgid: this.getNodeParameter('organizationId', i) as string,
			name: this.getNodeParameter('name', i) as string,
		};
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		Object.assign(params, additionalFields);
		return await ringotelAdminApiRequest.call(this, 'createAgent', params);
	}

	if (operation === 'delete') {
		const id = this.getNodeParameter('agentId', i) as string;
		const orgid = this.getNodeParameter('organizationId', i) as string;
		await ringotelAdminApiRequest.call(this, 'deleteAgent', { id, orgid });
		return { deleted: true };
	}

	if (operation === 'getMany') {
		const orgid = this.getNodeParameter('organizationId', i) as string;
		return await ringotelAdminApiRequest.call(this, 'getAgents', { orgid });
	}

	if (operation === 'update') {
		const params: IDataObject = {
			id: this.getNodeParameter('agentId', i) as string,
			orgid: this.getNodeParameter('organizationId', i) as string,
		};
		const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
		Object.assign(params, updateFields);
		return await ringotelAdminApiRequest.call(this, 'updateAgent', params);
	}

	throw new NodeOperationError(this.getNode(), `Unknown AI agent operation: ${operation}`);
}

async function handleRegion(
	this: IExecuteFunctions,
	operation: string,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	_i: number,
): Promise<IDataObject | IDataObject[]> {
	if (operation === 'getMany') {
		return await ringotelAdminApiRequest.call(this, 'getRegions', {});
	}

	throw new NodeOperationError(this.getNode(), `Unknown region operation: ${operation}`);
}

async function handleIntegration(
	this: IExecuteFunctions,
	operation: string,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	_i: number,
): Promise<IDataObject | IDataObject[]> {
	if (operation === 'getMany') {
		return await ringotelAdminApiRequest.call(this, 'getServices', {});
	}

	throw new NodeOperationError(this.getNode(), `Unknown integration operation: ${operation}`);
}

async function handlePackage(
	this: IExecuteFunctions,
	operation: string,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	_i: number,
): Promise<IDataObject | IDataObject[]> {
	if (operation === 'getMany') {
		return await ringotelAdminApiRequest.call(this, 'getPackages', {});
	}

	throw new NodeOperationError(this.getNode(), `Unknown package operation: ${operation}`);
}

async function handleCall(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	if (operation === 'initiate') {
		const from = this.getNodeParameter('from', i) as string;
		const tonumber = this.getNodeParameter('tonumber', i) as string;
		const toname = this.getNodeParameter('toname', i) as string;
		const domain = this.getNodeParameter('orgDomain', i) as string;
		await ringotelAdminApiRequest.call(this, 'initCall', { from, tonumber, toname, domain });
		return { success: true };
	}

	if (operation === 'updateActivity') {
		const id = this.getNodeParameter('activityId', i) as string;
		const domain = this.getNodeParameter('orgDomain', i) as string;
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		const params: IDataObject = { id, domain };
		if (additionalFields.subject) params.subject = additionalFields.subject;
		if (additionalFields.comment) params.comment = additionalFields.comment;
		return await ringotelAdminApiRequest.call(this, 'updateActivity', params);
	}

	throw new NodeOperationError(this.getNode(), `Unknown call operation: ${operation}`);
}
