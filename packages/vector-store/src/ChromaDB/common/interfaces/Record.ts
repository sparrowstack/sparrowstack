export interface Record {
	id: string;
	document: string;
	embeddings?: number[][];
	metadata?: { [key: string]: any };
}
