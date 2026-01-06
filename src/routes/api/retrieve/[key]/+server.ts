import { getStore } from '@netlify/blobs';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	try {
		const { key } = params;

		if (!key) {
			return json({ error: 'Key is required' }, { status: 400 });
		}

		// Dev: use explicit credentials from .envrc, Prod: auto-detect on Netlify Edge
		const store = import.meta.env.DEV
			? getStore({
					name: 'my-store',
					siteID: process.env.NETLIFY_SITE_ID,
					token: process.env.NETLIFY_BLOBS_CONTEXT
				})
			: getStore('my-store');

		const rawValue = await store.get(key);

		if (rawValue === null) {
			return json({ error: 'Key not found' }, { status: 404 });
		}

		// Handle both string (old format) and ArrayBuffer (new format)
		const textValue = typeof rawValue === 'string'
			? rawValue
			: new TextDecoder().decode(rawValue);
		const value = JSON.parse(textValue);

		return json({ success: true, key, value });
	} catch (error) {
		console.error('Error retrieving data:', error);
		return json(
			{ error: 'Failed to retrieve data', details: error instanceof Error ? error.message : String(error) },
			{ status: 500 }
		);
	}
};
