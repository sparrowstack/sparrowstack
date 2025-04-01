export interface ChromaRecords {
	ids: string[];
	documents: string[];
	metadatas?: { [key: string]: any }[];
	embeddings?: number[][];
}
