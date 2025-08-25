import { INodeProperties } from 'n8n-workflow';

export const customerOperations: INodeProperties[] = [
	{
		displayName: 'Operação',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['customer'],
			},
		},
		options: [
			{
				name: 'Criar',
				value: 'create',
				description: 'Criar um novo paciente',
				action: 'Criar paciente',
			},
			{
				name: 'Listar',
				value: 'list',
				description: 'Listar pacientes',
				action: 'Listar pacientes',
			},
			{
				name: 'Obter',
				value: 'get',
				description: 'Obter um paciente',
				action: 'Obter paciente',
			},
			{
				name: 'Atualizar',
				value: 'update',
				description: 'Atualizar um paciente',
				action: 'Atualizar paciente',
			},
			{
				name: 'Remover',
				value: 'delete',
				description: 'Remover um paciente',
				action: 'Remover paciente',
			},
		],
		default: 'create',
	},
];

export const customerFields: INodeProperties[] = [
	{
		displayName: 'Nome',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['create'],
			},
		},
		description: 'Nome completo do paciente',
	},
	{
		displayName: 'ID da Clínica',
		name: 'clinicId',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['create'],
			},
		},
		description: 'ID da clínica onde o paciente será cadastrado',
	},
	{
		displayName: 'Data de Nascimento',
		name: 'birthDate',
		type: 'dateTime',
		default: '',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['create', 'update'],
			},
		},
		description: 'Data de nascimento do paciente',
	},
	{
		displayName: 'Gênero',
		name: 'gender',
		type: 'options',
		options: [
			{
				name: 'Masculino',
				value: 0,
			},
			{
				name: 'Feminino',
				value: 1,
			},
		],
		default: '',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['create', 'update'],
			},
		},
		description: 'Gênero do paciente',
	},
	{
		displayName: 'Situação do Paciente',
		name: 'customerSituationId',
		type: 'options',
		options: [
			{
				name: '1ª Consulta',
				value: 1,
			},
			{
				name: 'Em Tratamento',
				value: 2,
			},
			{
				name: 'Tratamento Concluído',
				value: 3,
			},
			{
				name: 'Alta',
				value: 4,
			},
			{
				name: 'Abandono',
				value: 7,
			},
		],
		default: '',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['create', 'update'],
			},
		},
		description: 'Situação atual do paciente',
	},
	{
		displayName: 'Especialidade',
		name: 'customerSpecialty',
		type: 'options',
		options: [
			{
				name: 'Cirurgia',
				value: 2,
			},
			{
				name: 'Endodontia',
				value: 4,
			},
			{
				name: 'Ortodontia',
				value: 5,
			},
			{
				name: 'Periodontia',
				value: 6,
			},
			{
				name: 'Prótese',
				value: 7,
			},
			{
				name: 'Implantodontia',
				value: 8,
			},
		],
		default: '',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['create', 'update'],
			},
		},
		description: 'Especialidade de tratamento do paciente',
	},
	{
		displayName: 'Endereços',
		name: 'addressesAttributes',
		type: 'json',
		default: '{}',
		displayOptions: {
			show: {
				resource: ['customer'],
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
				resource: ['customer'],
				operation: ['create', 'update'],
			},
		},
		description: 'Atributos de contatos em formato JSON',
	},
	{
		displayName: 'Documentos',
		name: 'documentsAttributes',
		type: 'json',
		default: '{}',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['create', 'update'],
			},
		},
		description: 'Atributos de documentos em formato JSON',
	},
	{
		displayName: 'Buscar por Nome',
		name: 'q',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['list'],
			},
		},
		description: 'Buscar pacientes por nome',
	},
	{
		displayName: 'Página',
		name: 'page',
		type: 'number',
		default: 1,
		displayOptions: {
			show: {
				resource: ['customer'],
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
				resource: ['customer'],
				operation: ['list', 'update'],
			},
		},
		description: 'ID da clínica para filtrar ou atualizar',
	},
	{
		displayName: 'Status Ativo',
		name: 'active',
		type: 'options',
		options: [
			{
				name: 'Ativo',
				value: 'true',
			},
			{
				name: 'Inativo',
				value: 'false',
			},
			{
				name: 'Ambos',
				value: 'both',
			},
		],
		default: 'both',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['list'],
			},
		},
		description: 'Filtrar por status ativo do paciente',
	},
	{
		displayName: 'Apenas Excluídos',
		name: 'onlyDeleted',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['list'],
			},
		},
		description: 'Listar apenas pacientes excluídos',
	},
	{
		displayName: 'ID do Paciente',
		name: 'id',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['get', 'update', 'delete'],
			},
		},
		description: 'ID único do paciente',
	},
	{
		displayName: 'Nome',
		name: 'name',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['update'],
			},
		},
		description: 'Nome completo do paciente',
	},
];