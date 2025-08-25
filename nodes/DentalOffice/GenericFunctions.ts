import {
	IExecuteFunctions,
	ICredentialDataDecryptedObject,
	IHttpRequestOptions,
	IDataObject,
	NodeOperationError,
	NodeApiError,
	IHttpRequestMethods,
} from 'n8n-workflow';

interface TokenCache {
	token: string;
	expiry: number;
}

const tokenCache = new Map<string, TokenCache>();

async function getAccessToken(
	this: IExecuteFunctions,
	credentials: ICredentialDataDecryptedObject,
): Promise<string> {
	const baseUrl = credentials.baseUrl as string;
	const clientId = credentials.clientId as string;
	const secret = credentials.secret as string;

	const cacheKey = `${baseUrl}:${clientId}`;
	const cachedToken = tokenCache.get(cacheKey);

	if (cachedToken && cachedToken.expiry > Date.now()) {
		return cachedToken.token;
	}

	const options: IHttpRequestOptions = {
		method: 'POST',
		url: `${baseUrl.replace(/\/$/, '')}/v1/auth/tokens`,
		headers: {
			'Content-Type': 'application/json',
		},
		body: {
			client_id: clientId,
			secret: secret,
		},
		json: true,
	};

	try {
		const response = (await this.helpers.httpRequest(options)) as any;

		if (!response.token) {
			throw new NodeOperationError(this.getNode(), 'Token de acesso não retornado pela API');
		}

		const token = response.token as string;
		const expiryTime = Date.now() + 23 * 60 * 60 * 1000;

		tokenCache.set(cacheKey, {
			token,
			expiry: expiryTime,
		});

		return token;
	} catch (error: any) {
		if (error.response?.status === 401) {
			throw new NodeOperationError(
				this.getNode(),
				'Credenciais inválidas. Verifique o Client ID e Secret.',
			);
		}
		throw new NodeApiError(this.getNode(), error);
	}
}

export async function dentalOfficeApiRequest(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
): Promise<any> {
	const credentials = await this.getCredentials('dentalOfficeApi');
	const baseUrl = credentials.baseUrl as string;

	let token: string;
	try {
		token = await getAccessToken.call(this, credentials);
	} catch (error: any) {
		throw new NodeOperationError(this.getNode(), `Erro na autenticação: ${error.message}`);
	}

	const options: IHttpRequestOptions = {
		method,
		url: `${baseUrl.replace(/\/$/, '')}${endpoint}`,
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		json: true,
	};

	if (Object.keys(body).length > 0) {
		options.body = body;
	}

	if (Object.keys(qs).length > 0) {
		options.qs = qs;
	}

	try {
		const response = await this.helpers.httpRequest(options);
		return response;
	} catch (error: any) {
		if (error.response?.status === 401) {
			const cacheKey = `${baseUrl}:${credentials.clientId}`;
			tokenCache.delete(cacheKey);

			try {
				token = await getAccessToken.call(this, credentials);
				options.headers!['Authorization'] = `Bearer ${token}`;
				const retryResponse = await this.helpers.httpRequest(options);
				return retryResponse;
			} catch (retryError: any) {
				throw new NodeOperationError(this.getNode(), `Erro de autenticação: ${retryError.message}`);
			}
		}

		let errorMessage = 'Erro na requisição à API';
		if (error.response?.body?.message) {
			errorMessage = error.response.body.message;
		} else if (error.response?.body?.error) {
			errorMessage = error.response.body.error;
		} else if (error.message) {
			errorMessage = error.message;
		}

		throw new NodeApiError(this.getNode(), error, {
			message: `Dental Office API Error (${error.response?.status || 'Unknown'}): ${errorMessage}`,
			description: `Endpoint: ${method} ${endpoint}`,
		});
	}
}
