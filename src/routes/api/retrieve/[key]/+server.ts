import { getStore } from '@netlify/blobs';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	try {
		const { key } = params;

		if (!key) {
			return json({ error: 'Key is required' }, { status: 400 });
		}

		// Auto-detects credentials when deployed on Netlify
		const store = getStore('my-store');

		const rawValue = await store.get(key);

		if (rawValue === null) {
			return json({ error: 'Key not found' }, { status: 404 });
		}

		const textValue = new TextDecoder().decode(rawValue);
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
