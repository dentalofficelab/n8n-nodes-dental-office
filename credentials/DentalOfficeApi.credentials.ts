import { ICredentialType, INodeProperties, Icon } from 'n8n-workflow';

export class DentalOfficeApi implements ICredentialType {
	name = 'dentalOfficeApi';
	displayName = 'Dental Office API';
	icon: Icon = 'file:DentalOffice.svg';
	documentationUrl = 'https://apidocs.dentaloffice.com.br/#1c21804a-d311-475f-9f0d-4f0070499fc3';
	properties: INodeProperties[] = [
		{
			displayName: 'URL Base',
			name: 'baseUrl',
			type: 'string',
			default: '',
			placeholder: 'https://meu-cliente.api.app.dentaloffice.com.br',
			description: 'URL base da API do Dental Office específica do cliente',
			required: true,
		},
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'string',
			default: '',
			description: 'Client ID fornecido pelo Dental Office',
			required: true,
		},
		{
			displayName: 'Secret',
			name: 'secret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'Secret fornecido pelo Dental Office',
			required: true,
		},
	];
}
