import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
	NodeConnectionType,
} from 'n8n-workflow';

import { dentalOfficeApiRequest } from './GenericFunctions';
import {
	userFields,
	userOperations,
} from './descriptions/UserDescription';
import {
	dentistFields,
	dentistOperations,
} from './descriptions/DentistDescription';
import {
	customerFields,
	customerOperations,
} from './descriptions/CustomerDescription';
import {
	scheduleFields,
	scheduleOperations,
} from './descriptions/ScheduleDescription';
import {
	chairFields,
	chairOperations,
} from './descriptions/ChairDescription';

export class DentalOffice implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Dental Office',
		name: 'dentalOffice',
		icon: 'file:dentalOffice.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Integração com a API do Dental Office Cloud',
		defaults: {
			name: 'Dental Office',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'dentalOfficeApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Recurso',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Usuário',
						value: 'user',
					},
					{
						name: 'Dentista',
						value: 'dentist',
					},
					{
						name: 'Paciente',
						value: 'customer',
					},
					{
						name: 'Agendamento',
						value: 'schedule',
					},
					{
						name: 'Cadeira',
						value: 'chair',
					},
				],
				default: 'user',
			},
			...userOperations,
			...userFields,
			...dentistOperations,
			...dentistFields,
			...customerOperations,
			...customerFields,
			...scheduleOperations,
			...scheduleFields,
			...chairOperations,
			...chairFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: any;

				if (resource === 'user') {
					responseData = await executeUserOperation.call(this, operation, i);
				} else if (resource === 'dentist') {
					responseData = await executeDentistOperation.call(this, operation, i);
				} else if (resource === 'customer') {
					responseData = await executeCustomerOperation.call(this, operation, i);
				} else if (resource === 'schedule') {
					responseData = await executeScheduleOperation.call(this, operation, i);
				} else if (resource === 'chair') {
					responseData = await executeChairOperation.call(this, operation, i);
				}

				if (Array.isArray(responseData)) {
					returnData.push(...responseData.map((item: any) => ({ json: item })));
				} else {
					returnData.push({ json: responseData });
				}
			} catch (error: any) {
				if (this.continueOnFail()) {
					returnData.push({ json: {}, error: error.message });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}

async function executeUserOperation(this: IExecuteFunctions, operation: string, itemIndex: number) {
	switch (operation) {
		case 'create':
			return createUser.call(this, itemIndex);
		case 'list':
			return listUsers.call(this, itemIndex);
		case 'get':
			return getUser.call(this, itemIndex);
		case 'update':
			return updateUser.call(this, itemIndex);
		case 'delete':
			return deleteUser.call(this, itemIndex);
		default:
			throw new NodeOperationError(this.getNode(), `Operação "${operation}" não suportada para usuário`);
	}
}

async function executeDentistOperation(this: IExecuteFunctions, operation: string, itemIndex: number) {
	switch (operation) {
		case 'create':
			return createDentist.call(this, itemIndex);
		case 'list':
			return listDentists.call(this, itemIndex);
		case 'get':
			return getDentist.call(this, itemIndex);
		case 'update':
			return updateDentist.call(this, itemIndex);
		case 'delete':
			return deleteDentist.call(this, itemIndex);
		default:
			throw new NodeOperationError(this.getNode(), `Operação "${operation}" não suportada para dentista`);
	}
}

async function executeCustomerOperation(this: IExecuteFunctions, operation: string, itemIndex: number) {
	switch (operation) {
		case 'create':
			return createCustomer.call(this, itemIndex);
		case 'list':
			return listCustomers.call(this, itemIndex);
		case 'get':
			return getCustomer.call(this, itemIndex);
		case 'update':
			return updateCustomer.call(this, itemIndex);
		case 'delete':
			return deleteCustomer.call(this, itemIndex);
		default:
			throw new NodeOperationError(this.getNode(), `Operação "${operation}" não suportada para paciente`);
	}
}

async function executeScheduleOperation(this: IExecuteFunctions, operation: string, itemIndex: number) {
	switch (operation) {
		case 'create':
			return createSchedule.call(this, itemIndex);
		case 'list':
			return listSchedules.call(this, itemIndex);
		case 'get':
			return getSchedule.call(this, itemIndex);
		case 'update':
			return updateSchedule.call(this, itemIndex);
		case 'delete':
			return deleteSchedule.call(this, itemIndex);
		case 'getAvailableHours':
			return getAvailableHours.call(this, itemIndex);
		default:
			throw new NodeOperationError(this.getNode(), `Operação "${operation}" não suportada para agendamento`);
	}
}

async function executeChairOperation(this: IExecuteFunctions, operation: string, itemIndex: number) {
	switch (operation) {
		case 'create':
			return createChair.call(this, itemIndex);
		case 'list':
			return listChairs.call(this, itemIndex);
		case 'get':
			return getChair.call(this, itemIndex);
		case 'update':
			return updateChair.call(this, itemIndex);
		case 'delete':
			return deleteChair.call(this, itemIndex);
		default:
			throw new NodeOperationError(this.getNode(), `Operação "${operation}" não suportada para cadeira`);
	}
}

// User operations
async function createUser(this: IExecuteFunctions, itemIndex: number) {
	const body: any = {};
	
	body.email = this.getNodeParameter('email', itemIndex) as string;
	body.password = this.getNodeParameter('password', itemIndex) as string;
	body.name = this.getNodeParameter('name', itemIndex) as string;
	body.user_group_id = this.getNodeParameter('userGroupId', itemIndex) as number;

	const clinicIds = this.getNodeParameter('clinicIds', itemIndex) as string;
	if (clinicIds) {
		body.clinic_ids = clinicIds.split(',').map(id => parseInt(id.trim(), 10));
	}

	const addressesAttributes = this.getNodeParameter('addressesAttributes', itemIndex) as string;
	if (addressesAttributes) {
		try {
			body.addresses_attributes = JSON.parse(addressesAttributes);
		} catch (error) {
			throw new NodeOperationError(this.getNode(), 'Formato JSON inválido para addressesAttributes');
		}
	}

	const contactsAttributes = this.getNodeParameter('contactsAttributes', itemIndex) as string;
	if (contactsAttributes) {
		try {
			body.contacts_attributes = JSON.parse(contactsAttributes);
		} catch (error) {
			throw new NodeOperationError(this.getNode(), 'Formato JSON inválido para contactsAttributes');
		}
	}

	return dentalOfficeApiRequest.call(this, 'POST', '/v1/users', body);
}

async function listUsers(this: IExecuteFunctions, itemIndex: number) {
	const qs: any = {};

	const q = this.getNodeParameter('q', itemIndex, '') as string;
	if (q) {
		qs.q = q;
	}

	const userGroup = this.getNodeParameter('userGroup', itemIndex, '') as number;
	if (userGroup) {
		qs.user_group = userGroup;
	}

	const page = this.getNodeParameter('page', itemIndex, 1) as number;
	if (page) {
		qs.page = page;
	}

	return dentalOfficeApiRequest.call(this, 'GET', '/v1/users', {}, qs);
}

async function getUser(this: IExecuteFunctions, itemIndex: number) {
	const id = this.getNodeParameter('id', itemIndex) as number;
	return dentalOfficeApiRequest.call(this, 'GET', `/v1/users/${id}`);
}

async function updateUser(this: IExecuteFunctions, itemIndex: number) {
	const id = this.getNodeParameter('id', itemIndex) as number;
	const body: any = {};

	const name = this.getNodeParameter('name', itemIndex, '') as string;
	if (name) {
		body.name = name;
	}

	const email = this.getNodeParameter('email', itemIndex, '') as string;
	if (email) {
		body.email = email;
	}

	const userGroupId = this.getNodeParameter('userGroupId', itemIndex, '') as number;
	if (userGroupId) {
		body.user_group_id = userGroupId;
	}

	const clinicIds = this.getNodeParameter('clinicIds', itemIndex, '') as string;
	if (clinicIds) {
		body.clinic_ids = clinicIds.split(',').map(id => parseInt(id.trim(), 10));
	}

	const contactsAttributes = this.getNodeParameter('contactsAttributes', itemIndex, '') as string;
	if (contactsAttributes) {
		try {
			body.contacts_attributes = JSON.parse(contactsAttributes);
		} catch (error) {
			throw new NodeOperationError(this.getNode(), 'Formato JSON inválido para contactsAttributes');
		}
	}

	return dentalOfficeApiRequest.call(this, 'PUT', `/v1/users/${id}`, body);
}

async function deleteUser(this: IExecuteFunctions, itemIndex: number) {
	const id = this.getNodeParameter('id', itemIndex) as number;
	return dentalOfficeApiRequest.call(this, 'DELETE', `/v1/users/${id}`);
}

// Dentist operations
async function createDentist(this: IExecuteFunctions, itemIndex: number) {
	const body: any = {};

	const name = this.getNodeParameter('name', itemIndex, '') as string;
	if (name) body.name = name;

	const cpf = this.getNodeParameter('cpf', itemIndex, '') as string;
	if (cpf) body.cpf = cpf;

	const rg = this.getNodeParameter('rg', itemIndex, '') as string;
	if (rg) body.rg = rg;

	const birthDate = this.getNodeParameter('birthDate', itemIndex, '') as string;
	if (birthDate) body.birth_date = birthDate;

	const crType = this.getNodeParameter('crType', itemIndex, '') as string;
	if (crType) body.cr_type = crType;

	const crNumber = this.getNodeParameter('crNumber', itemIndex, '') as string;
	if (crNumber) body.cr_number = crNumber;

	const crUf = this.getNodeParameter('crUf', itemIndex, '') as string;
	if (crUf) body.cr_uf = crUf;

	const addressesAttributes = this.getNodeParameter('addressesAttributes', itemIndex, '') as string;
	if (addressesAttributes) {
		try {
			body.addresses_attributes = JSON.parse(addressesAttributes);
		} catch (error) {
			throw new NodeOperationError(this.getNode(), 'Formato JSON inválido para addressesAttributes');
		}
	}

	const contactsAttributes = this.getNodeParameter('contactsAttributes', itemIndex, '') as string;
	if (contactsAttributes) {
		try {
			body.contacts_attributes = JSON.parse(contactsAttributes);
		} catch (error) {
			throw new NodeOperationError(this.getNode(), 'Formato JSON inválido para contactsAttributes');
		}
	}

	return dentalOfficeApiRequest.call(this, 'POST', '/v1/dentists', body);
}

async function listDentists(this: IExecuteFunctions, itemIndex: number) {
	const qs: any = {};

	const q = this.getNodeParameter('q', itemIndex, '') as string;
	if (q) qs.q = q;

	const page = this.getNodeParameter('page', itemIndex, 1) as number;
	if (page) qs.page = page;

	const clinicId = this.getNodeParameter('clinicId', itemIndex, '') as number;
	if (clinicId) qs.clinic_id = clinicId;

	const onlyDeleted = this.getNodeParameter('onlyDeleted', itemIndex, false) as boolean;
	if (onlyDeleted) qs.only_deleted = onlyDeleted;

	return dentalOfficeApiRequest.call(this, 'GET', '/v1/dentists', {}, qs);
}

async function getDentist(this: IExecuteFunctions, itemIndex: number) {
	const id = this.getNodeParameter('id', itemIndex) as number;
	return dentalOfficeApiRequest.call(this, 'GET', `/v1/dentists/${id}`);
}

async function updateDentist(this: IExecuteFunctions, itemIndex: number) {
	const id = this.getNodeParameter('id', itemIndex) as number;
	const body: any = {};

	const name = this.getNodeParameter('name', itemIndex, '') as string;
	if (name) body.name = name;

	const cpf = this.getNodeParameter('cpf', itemIndex, '') as string;
	if (cpf) body.cpf = cpf;

	const rg = this.getNodeParameter('rg', itemIndex, '') as string;
	if (rg) body.rg = rg;

	const birthDate = this.getNodeParameter('birthDate', itemIndex, '') as string;
	if (birthDate) body.birth_date = birthDate;

	const crType = this.getNodeParameter('crType', itemIndex, '') as string;
	if (crType) body.cr_type = crType;

	const crNumber = this.getNodeParameter('crNumber', itemIndex, '') as string;
	if (crNumber) body.cr_number = crNumber;

	const crUf = this.getNodeParameter('crUf', itemIndex, '') as string;
	if (crUf) body.cr_uf = crUf;

	const addressesAttributes = this.getNodeParameter('addressesAttributes', itemIndex, '') as string;
	if (addressesAttributes) {
		try {
			body.addresses_attributes = JSON.parse(addressesAttributes);
		} catch (error) {
			throw new NodeOperationError(this.getNode(), 'Formato JSON inválido para addressesAttributes');
		}
	}

	const contactsAttributes = this.getNodeParameter('contactsAttributes', itemIndex, '') as string;
	if (contactsAttributes) {
		try {
			body.contacts_attributes = JSON.parse(contactsAttributes);
		} catch (error) {
			throw new NodeOperationError(this.getNode(), 'Formato JSON inválido para contactsAttributes');
		}
	}

	return dentalOfficeApiRequest.call(this, 'PUT', `/v1/dentists/${id}`, body);
}

async function deleteDentist(this: IExecuteFunctions, itemIndex: number) {
	const id = this.getNodeParameter('id', itemIndex) as number;
	return dentalOfficeApiRequest.call(this, 'DELETE', `/v1/dentists/${id}`);
}

// Customer operations
async function createCustomer(this: IExecuteFunctions, itemIndex: number) {
	const body: any = {};

	body.name = this.getNodeParameter('name', itemIndex) as string;
	body.clinic_id = this.getNodeParameter('clinicId', itemIndex) as number;

	const birthDate = this.getNodeParameter('birthDate', itemIndex, '') as string;
	if (birthDate) body.birth_date = birthDate;

	const gender = this.getNodeParameter('gender', itemIndex, '') as number | string;
	if (gender !== '' && gender !== undefined) body.gender = Number(gender);

	const customerSituationId = this.getNodeParameter('customerSituationId', itemIndex, '') as number;
	if (customerSituationId) body.customer_situation_id = customerSituationId;

	const customerSpecialty = this.getNodeParameter('customerSpecialty', itemIndex, '') as number;
	if (customerSpecialty) body.customer_specialty = customerSpecialty;

	const addressesAttributes = this.getNodeParameter('addressesAttributes', itemIndex, '') as string;
	if (addressesAttributes) {
		try {
			body.addresses_attributes = JSON.parse(addressesAttributes);
		} catch (error) {
			throw new NodeOperationError(this.getNode(), 'Formato JSON inválido para addressesAttributes');
		}
	}

	const contactsAttributes = this.getNodeParameter('contactsAttributes', itemIndex, '') as string;
	if (contactsAttributes) {
		try {
			body.contacts_attributes = JSON.parse(contactsAttributes);
		} catch (error) {
			throw new NodeOperationError(this.getNode(), 'Formato JSON inválido para contactsAttributes');
		}
	}

	const documentsAttributes = this.getNodeParameter('documentsAttributes', itemIndex, '') as string;
	if (documentsAttributes) {
		try {
			body.documents_attributes = JSON.parse(documentsAttributes);
		} catch (error) {
			throw new NodeOperationError(this.getNode(), 'Formato JSON inválido para documentsAttributes');
		}
	}

	return dentalOfficeApiRequest.call(this, 'POST', '/v1/customers', body);
}

async function listCustomers(this: IExecuteFunctions, itemIndex: number) {
	const qs: any = {};

	const q = this.getNodeParameter('q', itemIndex, '') as string;
	if (q) qs.q = q;

	const page = this.getNodeParameter('page', itemIndex, 1) as number;
	if (page) qs.page = page;

	const clinicId = this.getNodeParameter('clinicId', itemIndex, '') as number;
	if (clinicId) qs.clinic_id = clinicId;

	const active = this.getNodeParameter('active', itemIndex, 'both') as string;
	if (active !== 'both') qs.active = active;

	const onlyDeleted = this.getNodeParameter('onlyDeleted', itemIndex, false) as boolean;
	if (onlyDeleted) qs.only_deleted = onlyDeleted;

	return dentalOfficeApiRequest.call(this, 'GET', '/v1/customers', {}, qs);
}

async function getCustomer(this: IExecuteFunctions, itemIndex: number) {
	const id = this.getNodeParameter('id', itemIndex) as number;
	return dentalOfficeApiRequest.call(this, 'GET', `/v1/customers/${id}`);
}

async function updateCustomer(this: IExecuteFunctions, itemIndex: number) {
	const id = this.getNodeParameter('id', itemIndex) as number;
	const body: any = {};

	const name = this.getNodeParameter('name', itemIndex, '') as string;
	if (name) body.name = name;

	const clinicId = this.getNodeParameter('clinicId', itemIndex, '') as number;
	if (clinicId) body.clinic_id = clinicId;

	const birthDate = this.getNodeParameter('birthDate', itemIndex, '') as string;
	if (birthDate) body.birth_date = birthDate;

	const gender = this.getNodeParameter('gender', itemIndex, '') as number | string;
	if (gender !== '' && gender !== undefined) body.gender = Number(gender);

	const customerSituationId = this.getNodeParameter('customerSituationId', itemIndex, '') as number;
	if (customerSituationId) body.customer_situation_id = customerSituationId;

	const customerSpecialty = this.getNodeParameter('customerSpecialty', itemIndex, '') as number;
	if (customerSpecialty) body.customer_specialty = customerSpecialty;

	const addressesAttributes = this.getNodeParameter('addressesAttributes', itemIndex, '') as string;
	if (addressesAttributes) {
		try {
			body.addresses_attributes = JSON.parse(addressesAttributes);
		} catch (error) {
			throw new NodeOperationError(this.getNode(), 'Formato JSON inválido para addressesAttributes');
		}
	}

	const contactsAttributes = this.getNodeParameter('contactsAttributes', itemIndex, '') as string;
	if (contactsAttributes) {
		try {
			body.contacts_attributes = JSON.parse(contactsAttributes);
		} catch (error) {
			throw new NodeOperationError(this.getNode(), 'Formato JSON inválido para contactsAttributes');
		}
	}

	const documentsAttributes = this.getNodeParameter('documentsAttributes', itemIndex, '') as string;
	if (documentsAttributes) {
		try {
			body.documents_attributes = JSON.parse(documentsAttributes);
		} catch (error) {
			throw new NodeOperationError(this.getNode(), 'Formato JSON inválido para documentsAttributes');
		}
	}

	return dentalOfficeApiRequest.call(this, 'PUT', `/v1/customers/${id}`, body);
}

async function deleteCustomer(this: IExecuteFunctions, itemIndex: number) {
	const id = this.getNodeParameter('id', itemIndex) as number;
	return dentalOfficeApiRequest.call(this, 'DELETE', `/v1/customers/${id}`);
}

// Schedule operations
async function createSchedule(this: IExecuteFunctions, itemIndex: number) {
	const clinicId = this.getNodeParameter('clinicId', itemIndex) as number;
	const body: any = {};

	body.chair_id = this.getNodeParameter('chairId', itemIndex) as number;
	body.schedule_start = this.getNodeParameter('scheduleStart', itemIndex) as string;

	const dentistId = this.getNodeParameter('dentistId', itemIndex, '') as number;
	if (dentistId) {
		body.dentist_id = dentistId;
	}

	const dentistIds = this.getNodeParameter('dentistIds', itemIndex, '') as string;
	if (dentistIds) {
		body.dentist_ids = dentistIds.split(',').map(id => parseInt(id.trim(), 10));
	}

	const customerId = this.getNodeParameter('customerId', itemIndex, '') as number;
	if (customerId) body.customer_id = customerId;

	const personal = this.getNodeParameter('personal', itemIndex, false) as boolean;
	body.personal = personal;

	const description = this.getNodeParameter('description', itemIndex, '') as string;
	if (description) body.description = description;

	const scheduleSituationId = this.getNodeParameter('scheduleSituationId', itemIndex, '') as number;
	if (scheduleSituationId) body.schedule_situation_id = scheduleSituationId;

	return dentalOfficeApiRequest.call(this, 'POST', `/v1/clinics/${clinicId}/schedules`, body);
}

async function listSchedules(this: IExecuteFunctions, itemIndex: number) {
	const qs: any = {};

	const start = this.getNodeParameter('start', itemIndex, '') as string;
	if (start) qs.start = start;

	const end = this.getNodeParameter('end', itemIndex, '') as string;
	if (end) qs.end = end;

	const dentistId = this.getNodeParameter('dentistId', itemIndex, '') as number;
	if (dentistId) qs.dentist_id = dentistId;

	const chairId = this.getNodeParameter('chairId', itemIndex, '') as number;
	if (chairId) qs.chair_id = chairId;

	return dentalOfficeApiRequest.call(this, 'GET', '/v1/schedules', {}, qs);
}

async function getSchedule(this: IExecuteFunctions, itemIndex: number) {
	const clinicId = this.getNodeParameter('clinicId', itemIndex) as number;
	const id = this.getNodeParameter('id', itemIndex) as number;
	return dentalOfficeApiRequest.call(this, 'GET', `/v1/clinics/${clinicId}/schedules/${id}`);
}

async function updateSchedule(this: IExecuteFunctions, itemIndex: number) {
	const clinicId = this.getNodeParameter('clinicId', itemIndex) as number;
	const id = this.getNodeParameter('id', itemIndex) as number;
	const body: any = {};

	const chairId = this.getNodeParameter('chairId', itemIndex, '') as number;
	if (chairId) body.chair_id = chairId;

	const dentistId = this.getNodeParameter('dentistId', itemIndex, '') as number;
	if (dentistId) body.dentist_id = dentistId;

	const dentistIds = this.getNodeParameter('dentistIds', itemIndex, '') as string;
	if (dentistIds) body.dentist_ids = dentistIds.split(',').map(id => parseInt(id.trim(), 10));

	const customerId = this.getNodeParameter('customerId', itemIndex, '') as number;
	if (customerId) body.customer_id = customerId;

	const scheduleStart = this.getNodeParameter('scheduleStart', itemIndex, '') as string;
	if (scheduleStart) body.schedule_start = scheduleStart;

	const personal = this.getNodeParameter('personal', itemIndex) as boolean | undefined;
	if (personal !== undefined) body.personal = personal;

	const description = this.getNodeParameter('description', itemIndex, '') as string;
	if (description) body.description = description;

	const scheduleSituationId = this.getNodeParameter('scheduleSituationId', itemIndex, '') as number;
	if (scheduleSituationId) body.schedule_situation_id = scheduleSituationId;

	return dentalOfficeApiRequest.call(this, 'PUT', `/v1/clinics/${clinicId}/schedules/${id}`, body);
}

async function deleteSchedule(this: IExecuteFunctions, itemIndex: number) {
	const clinicId = this.getNodeParameter('clinicId', itemIndex) as number;
	const id = this.getNodeParameter('id', itemIndex) as number;
	return dentalOfficeApiRequest.call(this, 'DELETE', `/v1/clinics/${clinicId}/schedules/${id}`);
}

async function getAvailableHours(this: IExecuteFunctions, itemIndex: number) {
	const clinicId = this.getNodeParameter('clinicId', itemIndex) as number;
	const dentistId = this.getNodeParameter('dentistId', itemIndex) as number;
	const qs: any = {};

	const next = this.getNodeParameter('next', itemIndex, 7) as number;
	if (next) qs.next = next;

	return dentalOfficeApiRequest.call(this, 'GET', `/v1/clinics/${clinicId}/dentists/${dentistId}/available_hours`, {}, qs);
}

// Chair operations
async function createChair(this: IExecuteFunctions, itemIndex: number) {
	const clinicId = this.getNodeParameter('clinicId', itemIndex) as number;
	const body: any = {};

	const name = this.getNodeParameter('name', itemIndex, '') as string;
	if (name) body.name = name;

	return dentalOfficeApiRequest.call(this, 'POST', `/v1/clinics/${clinicId}/chairs`, body);
}

async function listChairs(this: IExecuteFunctions, itemIndex: number) {
	const clinicId = this.getNodeParameter('clinicId', itemIndex) as number;
	return dentalOfficeApiRequest.call(this, 'GET', `/v1/clinics/${clinicId}/chairs`);
}

async function getChair(this: IExecuteFunctions, itemIndex: number) {
	const clinicId = this.getNodeParameter('clinicId', itemIndex) as number;
	const id = this.getNodeParameter('id', itemIndex) as number;
	return dentalOfficeApiRequest.call(this, 'GET', `/v1/clinics/${clinicId}/chairs/${id}`);
}

async function updateChair(this: IExecuteFunctions, itemIndex: number) {
	const clinicId = this.getNodeParameter('clinicId', itemIndex) as number;
	const id = this.getNodeParameter('id', itemIndex) as number;
	const body: any = {};

	const name = this.getNodeParameter('name', itemIndex, '') as string;
	if (name) body.name = name;

	return dentalOfficeApiRequest.call(this, 'PUT', `/v1/clinics/${clinicId}/chairs/${id}`, body);
}

async function deleteChair(this: IExecuteFunctions, itemIndex: number) {
	const clinicId = this.getNodeParameter('clinicId', itemIndex) as number;
	const id = this.getNodeParameter('id', itemIndex) as number;
	return dentalOfficeApiRequest.call(this, 'DELETE', `/v1/clinics/${clinicId}/chairs/${id}`);
}