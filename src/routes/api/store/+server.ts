import { getStore } from '@netlify/blobs';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { key, value } = await request.json();

		if (!key || value === undefined) {
			return json({ error: 'Key and value are required' }, { status: 400 });
		}

		// Auto-detects credentials when deployed on Netlify
		const store = getStore('my-store');

		await store.set(key, JSON.stringify(value));

		return json({ success: true, key, message: 'Data stored successfully' });
	} catch (error) {
		console.error('Error storing data:', error);
		return json(
			{ error: 'Failed to store data', details: error instanceof Error ? error.message : String(error) },
			{ status: 500 }
		);
	}
};
