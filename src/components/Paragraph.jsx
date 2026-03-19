import React from 'react';

export const portableTextComponents = {
	block: {
		normal: ({ children, value }) => {
			const isEmpty = !value?.children?.some(child => child._type === 'span' && child.text?.trim());

			if (isEmpty) {
				return <div className='h-4' />;
			}

			return <p className='leading-[1.3]'>{children}</p>;
		},
	},
	marks: {
		strong: ({ children }) => <strong>{children}</strong>,
		em: ({ children }) => <em>{children}</em>,
	},
};
