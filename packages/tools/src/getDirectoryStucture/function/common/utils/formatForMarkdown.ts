import type { IDirectoryNode } from '@tools/getDirectoryStucture/function/common/interfaces';

export const formatForMarkdown = (
	node: IDirectoryNode,
	indent: string = '',
	isLast: boolean = true,
): string => {
	let output = '';
	const prefix = isLast ? '└── ' : '├── ';
	const nextIndent = indent + (isLast ? '    ' : '│   ');

	output += `${indent}${prefix}${node.name}\n`;

	if (node.children) {
		node.children.forEach((child, index) => {
			const isLastItem = index === node.children!.length - 1;
			output += formatForMarkdown(child, nextIndent, isLastItem);
		});
	}

	return output;
};
