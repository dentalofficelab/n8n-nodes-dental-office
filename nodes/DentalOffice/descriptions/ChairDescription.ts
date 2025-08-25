import { INodeProperties } from 'n8n-workflow';

export const chairOperations: INodeProperties[] = [
	{
		displayName: 'Operação',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['chair'],
			},
		},
		options: [
			{
				name: 'Criar',
				value: 'create',
				description: 'Criar uma nova cadeira',
				action: 'Criar cadeira',
			},
			{
				name: 'Listar',
				value: 'list',
				description: 'Listar cadeiras',
				action: 'Listar cadeiras',
			},
			{
				name: 'Obter',
				value: 'get',
				description: 'Obter uma cadeira',
				action: 'Obter cadeira',
			},
			{
				name: 'Atualizar',
				value: 'update',
				description: 'Atualizar uma cadeira',
				action: 'Atualizar cadeira',
			},
			{
				name: 'Remover',
				value: 'delete',
				description: 'Remover uma cadeira',
				action: 'Remover cadeira',
			},
		],
		default: 'create',
	},
];

export const chairFields: INodeProperties[] = [
	{
		displayName: 'ID da Clínica',
		name: 'clinicId',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['chair'],
				operation: ['create', 'list', 'get', 'update', 'delete'],
			},
		},
		description: 'ID da clínica onde a cadeira está localizada',
	},
	{
		displayName: 'Nome',
		name: 'name',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['chair'],
				operation: ['create', 'update'],
			},
		},
		description: 'Nome ou identificação da cadeira',
	},
	{
		displayName: 'ID da Cadeira',
		name: 'id',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['chair'],
				operation: ['get', 'update', 'delete'],
			},
		},
		description: 'ID único da cadeira',
	},
];