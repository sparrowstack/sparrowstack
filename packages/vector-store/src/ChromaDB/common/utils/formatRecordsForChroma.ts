/**
 * Helper function to format records for ChromaDB operations
 * Takes an array of record objects and returns a formatted object
 * compatible with ChromaDB's upsert/add methods
 */
export const formatRecordsForChroma = ({
	records,
}: {
	records: Array<{
		id: string;
		document: string;
		metadata?: Record<string, any>;
		embeddings?: number[];
	}>;
}) => {
	const ids: string[] = [];
	const documents: string[] = [];
	const metadatas: Record<string, any>[] = [];
	const embeddings: number[][] = [];

	records.forEach((record) => {
		ids.push(record.id);
		documents.push(record.document);
		metadatas.push(record.metadata || {});

		// Add embeddings if they exist
		if (record.embeddings && record.embeddings.length > 0) {
			embeddings.push(record.embeddings);
		}
	});

	return {
		ids,
		documents,
		metadatas,
		...(embeddings.length > 0 ? { embeddings } : {}),
	};
};
