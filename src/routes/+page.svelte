<script lang="ts">
	let key = '';
	let value = '';
	let retrieveKey = '';
	let result = '';

	async function storeData() {
		const response = await fetch('/api/store', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ key, value })
		});
		const data = await response.json();
		result = JSON.stringify(data, null, 2);
	}

	async function retrieveData() {
		const response = await fetch(`/api/retrieve/${retrieveKey}`);
		const data = await response.json();
		result = JSON.stringify(data, null, 2);
	}
</script>

<main>
	<h1>SvelteKit + Netlify Blobs API</h1>

	<section>
		<h2>Store Data</h2>
		<input bind:value={key} placeholder="Key" />
		<input bind:value={value} placeholder="Value" />
		<button onclick={storeData}>Store</button>
	</section>

	<section>
		<h2>Retrieve Data</h2>
		<input bind:value={retrieveKey} placeholder="Key" />
		<button onclick={retrieveData}>Retrieve</button>
	</section>

	{#if result}
		<section>
			<h2>Result</h2>
			<pre>{result}</pre>
		</section>
	{/if}
</main>

<style>
	main {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
		font-family: system-ui, -apple-system, sans-serif;
	}

	section {
		margin: 2rem 0;
		padding: 1rem;
		border: 1px solid #ccc;
		border-radius: 8px;
	}

	input {
		padding: 0.5rem;
		margin-right: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	button {
		padding: 0.5rem 1rem;
		background: #0070f3;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	button:hover {
		background: #0051cc;
	}

	pre {
		background: #f4f4f4;
		padding: 1rem;
		border-radius: 4px;
		overflow-x: auto;
	}
</style>
