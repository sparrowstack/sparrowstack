import type { Record } from '@chromadb/common/interfaces';
import type { OpenAIEmbeddingFunction, AddRecordsParams } from 'chromadb';
/**
 * Helper function to format records for ChromaDB operations
 * Takes an array of record objects and returns a formatted object
 * compatible with ChromaDB's upsert/add methods
 */
export const formatRecordsForChroma = async ({
	records,
	embeddingFunction,
}: {
	records: Record[];
	embeddingFunction: OpenAIEmbeddingFunction;
}): Promise<AddRecordsParams> => {
	const ids: string[] = [];
	const documents: string[] = [];
	const metadatas: { [key: string]: any }[] = [];

	records.forEach((record) => {
		ids.push(record.id);
		documents.push(record.document);
		metadatas.push(record.metadata || {});
	});

	const embeddings = await embeddingFunction.generate(documents);

	return {
		ids,
		documents,
		metadatas,
		embeddings,
	};
};
