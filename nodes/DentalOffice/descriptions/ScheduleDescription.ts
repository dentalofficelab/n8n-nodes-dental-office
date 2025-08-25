import { INodeProperties } from 'n8n-workflow';

export const scheduleOperations: INodeProperties[] = [
	{
		displayName: 'Operação',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['schedule'],
			},
		},
		options: [
			{
				name: 'Criar',
				value: 'create',
				description: 'Criar um novo agendamento',
				action: 'Criar agendamento',
			},
			{
				name: 'Listar',
				value: 'list',
				description: 'Listar agendamentos',
				action: 'Listar agendamentos',
			},
			{
				name: 'Obter',
				value: 'get',
				description: 'Obter um agendamento',
				action: 'Obter agendamento',
			},
			{
				name: 'Atualizar',
				value: 'update',
				description: 'Atualizar um agendamento',
				action: 'Atualizar agendamento',
			},
			{
				name: 'Remover',
				value: 'delete',
				description: 'Remover um agendamento',
				action: 'Remover agendamento',
			},
			{
				name: 'Obter Horários Disponíveis',
				value: 'getAvailableHours',
				description: 'Obter horários disponíveis de um dentista',
				action: 'Obter horários disponíveis',
			},
		],
		default: 'create',
	},
];

export const scheduleFields: INodeProperties[] = [
	{
		displayName: 'ID da Clínica',
		name: 'clinicId',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['schedule'],
				operation: ['create', 'get', 'update', 'delete', 'getAvailableHours'],
			},
		},
		description: 'ID da clínica',
	},
	{
		displayName: 'ID da Cadeira',
		name: 'chairId',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['schedule'],
				operation: ['create'],
			},
		},
		description: 'ID da cadeira para o agendamento',
	},
	{
		displayName: 'ID do Dentista',
		name: 'dentistId',
		type: 'number',
		default: '',
		displayOptions: {
			show: {
				resource: ['schedule'],
				operation: ['create', 'list', 'update', 'getAvailableHours'],
			},
		},
		description: 'ID do dentista responsável',
	},
	{
		displayName: 'IDs dos Dentistas',
		name: 'dentistIds',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['schedule'],
				operation: ['create', 'update'],
			},
		},
		description: 'IDs dos dentistas separados por vírgula (ex: 1,2,3)',
	},
	{
		displayName: 'ID do Paciente',
		name: 'customerId',
		type: 'number',
		default: '',
		displayOptions: {
			show: {
				resource: ['schedule'],
				operation: ['create', 'update'],
			},
		},
		description: 'ID do paciente',
	},
	{
		displayName: 'Data e Hora do Agendamento',
		name: 'scheduleStart',
		type: 'dateTime',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['schedule'],
				operation: ['create'],
			},
		},
		description: 'Data e hora de início do agendamento',
	},
	{
		displayName: 'Agendamento Pessoal',
		name: 'personal',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['schedule'],
				operation: ['create', 'update'],
			},
		},
		description: 'Indica se é um agendamento pessoal do dentista',
	},
	{
		displayName: 'Descrição',
		name: 'description',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['schedule'],
				operation: ['create', 'update'],
			},
		},
		description: 'Descrição do agendamento',
	},
	{
		displayName: 'Situação do Agendamento',
		name: 'scheduleSituationId',
		type: 'options',
		options: [
			{
				name: 'Confirmar',
				value: 1,
			},
			{
				name: 'Confirmado',
				value: 2,
			},
			{
				name: 'Em Atendimento',
				value: 3,
			},
			{
				name: 'Atendido',
				value: 4,
			},
			{
				name: 'Faltou',
				value: 5,
			},
			{
				name: 'Cancelado',
				value: 6,
			},
		],
		default: '',
		displayOptions: {
			show: {
				resource: ['schedule'],
				operation: ['create', 'update'],
			},
		},
		description: 'Situação atual do agendamento',
	},
	{
		displayName: 'Data de Início',
		name: 'start',
		type: 'dateTime',
		default: '',
		displayOptions: {
			show: {
				resource: ['schedule'],
				operation: ['list'],
			},
		},
		description: 'Data de início para filtrar agendamentos',
	},
	{
		displayName: 'Data de Fim',
		name: 'end',
		type: 'dateTime',
		default: '',
		displayOptions: {
			show: {
				resource: ['schedule'],
				operation: ['list'],
			},
		},
		description: 'Data de fim para filtrar agendamentos',
	},
	{
		displayName: 'ID da Cadeira',
		name: 'chairId',
		type: 'number',
		default: '',
		displayOptions: {
			show: {
				resource: ['schedule'],
				operation: ['list', 'update'],
			},
		},
		description: 'Filtrar por ID da cadeira',
	},
	{
		displayName: 'ID do Agendamento',
		name: 'id',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['schedule'],
				operation: ['get', 'update', 'delete'],
			},
		},
		description: 'ID único do agendamento',
	},
	{
		displayName: 'Data e Hora do Agendamento',
		name: 'scheduleStart',
		type: 'dateTime',
		default: '',
		displayOptions: {
			show: {
				resource: ['schedule'],
				operation: ['update'],
			},
		},
		description: 'Data e hora de início do agendamento',
	},
	{
		displayName: 'Próximos Dias',
		name: 'next',
		type: 'number',
		default: 7,
		displayOptions: {
			show: {
				resource: ['schedule'],
				operation: ['getAvailableHours'],
			},
		},
		description: 'Número de dias após hoje para buscar horários disponíveis',
	},
];