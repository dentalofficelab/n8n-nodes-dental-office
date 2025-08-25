import { INodeProperties } from 'n8n-workflow';

export const dentistOperations: INodeProperties[] = [
	{
		displayName: 'Operação',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['dentist'],
			},
		},
		options: [
			{
				name: 'Criar',
				value: 'create',
				description: 'Criar um novo dentista',
				action: 'Criar dentista',
			},
			{
				name: 'Listar',
				value: 'list',
				description: 'Listar dentistas',
				action: 'Listar dentistas',
			},
			{
				name: 'Obter',
				value: 'get',
				description: 'Obter um dentista',
				action: 'Obter dentista',
			},
			{
				name: 'Atualizar',
				value: 'update',
				description: 'Atualizar um dentista',
				action: 'Atualizar dentista',
			},
			{
				name: 'Remover',
				value: 'delete',
				description: 'Remover um dentista',
				action: 'Remover dentista',
			},
		],
		default: 'create',
	},
];

export const dentistFields: INodeProperties[] = [
	{
		displayName: 'Nome',
		name: 'name',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['dentist'],
				operation: ['create', 'update'],
			},
		},
		description: 'Nome completo do dentista',
	},
	{
		displayName: 'CPF',
		name: 'cpf',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['dentist'],
				operation: ['create', 'update'],
			},
		},
		description: 'CPF do dentista',
	},
	{
		displayName: 'RG',
		name: 'rg',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['dentist'],
				operation: ['create', 'update'],
			},
		},
		description: 'RG do dentista',
	},
	{
		displayName: 'Data de Nascimento',
		name: 'birthDate',
		type: 'dateTime',
		default: '',
		displayOptions: {
			show: {
				resource: ['dentist'],
				operation: ['create', 'update'],
			},
		},
		description: 'Data de nascimento do dentista',
	},
	{
		displayName: 'Tipo de CR',
		name: 'crType',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['dentist'],
				operation: ['create', 'update'],
			},
		},
		description: 'Tipo de Conselho Regional (ex: CRO)',
	},
	{
		displayName: 'Número do CR',
		name: 'crNumber',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['dentist'],
				operation: ['create', 'update'],
			},
		},
		description: 'Número do Conselho Regional',
	},
	{
		displayName: 'UF do CR',
		name: 'crUf',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['dentist'],
				operation: ['create', 'update'],
			},
		},
		description: 'Estado do Conselho Regional',
	},
	{
		displayName: 'Endereços',
		name: 'addressesAttributes',
		type: 'json',
		default: '{}',
		displayOptions: {
			show: {
				resource: ['dentist'],
				operation: ['create', 'update'],
			},
		},
		description: 'Atributos de endereços em formato JSON',
	},
	{
		displayName: 'Contatos',
		name: 'contactsAttributes',
		type: 'json',
		default: '{}',
		displayOptions: {
			show: {
				resource: ['dentist'],
				operation: ['create', 'update'],
			},
		},
		description: 'Atributos de contatos em formato JSON',
	},
	{
		displayName: 'Buscar por Nome',
		name: 'q',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['dentist'],
				operation: ['list'],
			},
		},
		description: 'Buscar dentistas por nome',
	},
	{
		displayName: 'Página',
		name: 'page',
		type: 'number',
		default: 1,
		displayOptions: {
			show: {
				resource: ['dentist'],
				operation: ['list'],
			},
		},
		description: 'Número da página para paginação',
	},
	{
		displayName: 'ID da Clínica',
		name: 'clinicId',
		type: 'number',
		default: '',
		displayOptions: {
			show: {
				resource: ['dentist'],
				operation: ['list'],
			},
		},
		description: 'Filtrar por ID da clínica',
	},
	{
		displayName: 'Apenas Excluídos',
		name: 'onlyDeleted',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['dentist'],
				operation: ['list'],
			},
		},
		description: 'Listar apenas dentistas excluídos',
	},
	{
		displayName: 'ID do Dentista',
		name: 'id',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['dentist'],
				operation: ['get', 'update', 'delete'],
			},
		},
		description: 'ID único do dentista',
	},
];