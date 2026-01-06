import { getStore } from '@netlify/blobs';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { key, value } = await request.json();

		if (!key || value === undefined) {
			return json({ error: 'Key and value are required' }, { status: 400 });
		}

		// Dev: use explicit credentials from .envrc, Prod: auto-detect on Netlify Edge
		const store = import.meta.env.DEV
			? getStore({
					name: 'my-store',
					siteID: process.env.NETLIFY_SITE_ID,
					token: process.env.NETLIFY_BLOBS_CONTEXT
				})
			: getStore('my-store');

		const jsonString = JSON.stringify(value);
		const encoder = new TextEncoder();
		await store.set(key, encoder.encode(jsonString));

		return json({ success: true, key, message: 'Data stored successfully' });
	} catch (error) {
		console.error('Error storing data:', error);
		return json(
			{ error: 'Failed to store data', details: error instanceof Error ? error.message : String(error) },
			{ status: 500 }
		);
	}
};
