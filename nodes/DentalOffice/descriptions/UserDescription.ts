import { INodeProperties } from 'n8n-workflow';

export const userOperations: INodeProperties[] = [
	{
		displayName: 'Operação',
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
				name: 'Criar',
				value: 'create',
				description: 'Criar um novo usuário',
				action: 'Criar usuário',
			},
			{
				name: 'Listar',
				value: 'list',
				description: 'Listar usuários',
				action: 'Listar usuários',
			},
			{
				name: 'Obter',
				value: 'get',
				description: 'Obter um usuário',
				action: 'Obter usuário',
			},
			{
				name: 'Atualizar',
				value: 'update',
				description: 'Atualizar um usuário',
				action: 'Atualizar usuário',
			},
			{
				name: 'Remover',
				value: 'delete',
				description: 'Remover um usuário',
				action: 'Remover usuário',
			},
		],
		default: 'create',
	},
];

export const userFields: INodeProperties[] = [
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'usuario@exemplo.com',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create'],
			},
		},
		description: 'Email do usuário',
	},
	{
		displayName: 'Senha',
		name: 'password',
		type: 'string',
		typeOptions: {
			password: true,
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create'],
			},
		},
		description: 'Senha do usuário',
	},
	{
		displayName: 'Nome',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create'],
			},
		},
		description: 'Nome completo do usuário',
	},
	{
		displayName: 'Grupo de Usuário',
		name: 'userGroupId',
		type: 'options',
		options: [
			{
				name: 'Administrador',
				value: 1,
			},
			{
				name: 'Atendente',
				value: 2,
			},
			{
				name: 'Dentista',
				value: 3,
			},
		],
		default: 1,
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create'],
			},
		},
		description: 'Grupo de usuário',
	},
	{
		displayName: 'IDs das Clínicas',
		name: 'clinicIds',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create', 'update'],
			},
		},
		description: 'IDs das clínicas separados por vírgula (ex: 1,2,3)',
	},
	{
		displayName: 'Endereços',
		name: 'addressesAttributes',
		type: 'json',
		default: '{}',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create'],
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
				resource: ['user'],
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
				resource: ['user'],
				operation: ['list'],
			},
		},
		description: 'Buscar usuários por nome',
	},
	{
		displayName: 'Grupo de Usuário',
		name: 'userGroup',
		type: 'number',
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['list'],
			},
		},
		description: 'Filtrar por ID do grupo de usuário',
	},
	{
		displayName: 'Página',
		name: 'page',
		type: 'number',
		default: 1,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['list'],
			},
		},
		description: 'Número da página para paginação',
	},
	{
		displayName: 'ID do Usuário',
		name: 'id',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['get', 'update', 'delete'],
			},
		},
		description: 'ID único do usuário',
	},
	{
		displayName: 'Nome',
		name: 'name',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['update'],
			},
		},
		description: 'Nome completo do usuário',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'usuario@exemplo.com',
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['update'],
			},
		},
		description: 'Email do usuário',
	},
	{
		displayName: 'Grupo de Usuário',
		name: 'userGroupId',
		type: 'options',
		options: [
			{
				name: 'Administrador',
				value: 1,
			},
			{
				name: 'Atendente',
				value: 2,
			},
			{
				name: 'Dentista',
				value: 3,
			},
		],
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['update'],
			},
		},
		description: 'Grupo de usuário',
	},
];