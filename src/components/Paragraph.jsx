import React from 'react';

export const portableTextComponents = {
	block: {
		normal: ({ children, value }) => {
			const isEmpty = !value?.children?.some(child => child._type === 'span' && child.text?.trim());

			if (isEmpty) {
				return <div className='h-4' />;
			}

			return <p className='leading-[1.2]'>{children}</p>;
		},
	},
	marks: {
		strong: ({ children }) => <span className='font-[500]'>{children}</span>,
		em: ({ children }) => <em>{children}</em>,
	},
};
