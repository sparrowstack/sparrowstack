import { ChromaVectorStore } from '../src/ChromaDB/ChromaVectorStore';

/**
 * Simple example demonstrating ChromaVectorStore usage
 *
 * Make sure ChromaDB is running:
 * $ bun run chromadb:start
 *
 * Then run this example:
 * $ bun run examples/simple-usage.ts
 */
async function main() {
	console.log('📚 ChromaDB Vector Store Example');

	// Create a new ChromaDB vector store
	const vectorStore = new ChromaVectorStore({
		collectionName: 'demo-collection',
	});

	console.log('🔄 Checking if collection exists...');
	const exists = await vectorStore.collectionExists();
	console.log(`Collection exists: ${exists}`);

	if (exists) {
		console.log('🗑️ Deleting existing collection...');
		await vectorStore.deleteCollection();
		console.log('✅ Collection deleted');
	}

	// Sample documents
	const documents = [
		{
			id: 'doc1',
			text: 'SparrowStack is a powerful agent framework for building AI applications',
			metadata: { type: 'framework', domain: 'AI' },
		},
		{
			id: 'doc2',
			text: 'Vector databases store and retrieve information based on semantic similarity',
			metadata: { type: 'technology', domain: 'databases' },
		},
		{
			id: 'doc3',
			text: 'ChromaDB is an open-source vector database built for AI applications',
			metadata: { type: 'technology', domain: 'AI' },
		},
		{
			id: 'doc4',
			text: 'Embedding models transform text into vector representations',
			metadata: { type: 'concept', domain: 'machine learning' },
		},
		{
			id: 'doc5',
			text: 'TypeScript provides strong typing for JavaScript applications',
			metadata: { type: 'language', domain: 'programming' },
		},
	];

	console.log(`📝 Adding ${documents.length} documents to vector store...`);
	await vectorStore.addDocuments(documents);
	console.log('✅ Documents added');

	// Search examples
	const queries = [
		'AI frameworks',
		'vector databases',
		'programming language',
		'machine learning concepts',
	];

	for (const query of queries) {
		console.log(`\n🔎 Searching for: "${query}"`);
		const results = await vectorStore.search(query, 2);

		console.log(`Found ${results.length} results:`);
		for (const result of results) {
			console.log(
				`- [${result.score.toFixed(4)}] ${result.document.text}`,
			);
			console.log(
				`  metadata: ${JSON.stringify(result.document.metadata)}`,
			);
		}
	}
}

main()
	.catch(console.error)
	.finally(() => {
		console.log('\n✨ Done');
	});
