import sanityClient from '../SanityClient';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source) {
	return builder.image(source);
}

export const IMAGE_PRESETS = {
	home: {
		width: 2200,
		quality: 74,
		widths: [640, 960, 1280, 1600, 2200],
		sizes: '100vw',
	},

	workCard: {
		width: 1200,
		quality: 70,
		widths: [320, 480, 640, 900, 1200],
		sizes: '(max-width: 1023px) 50vw, 25vw',
	},

	workHover: {
		width: 1200,
		quality: 70,
		widths: [320, 480, 640, 900, 1200],
		sizes: '(max-width: 1023px) 50vw, 25vw',
	},

	singleMain: {
		width: 2000,
		quality: 78,
		widths: [640, 960, 1280, 1600, 2000],
		sizes: '(max-width: 1023px) 100vw, 60vw',
	},

	singleSide: {
		width: 700,
		quality: 64,
		widths: [240, 360, 500, 700],
		sizes: '(max-width: 1023px) 40vw, 20vw',
	},

	singleList: {
		width: 700,
		quality: 68,
		widths: [240, 360, 500, 700],
		sizes: '(max-width: 1023px) 50vw, 16vw',
	},

	pressThumb: {
		width: 500,
		quality: 68,
		widths: [240, 360, 500],
		sizes: '300px',
	},

	iadInfoCard: {
		width: 1200,
		quality: 70,
		widths: [320, 480, 640, 900, 1200],
		sizes: '(max-width: 1023px) 50vw, 25vw',
	},
};

export function imageUrl(source, preset = 'workCard', overrides = {}) {
	if (!source) return '';

	const config = {
		...(IMAGE_PRESETS[preset] || IMAGE_PRESETS.workCard),
		...overrides,
	};

	let image = builder.image(source);

	if (config.width) image = image.width(config.width);
	if (config.quality) image = image.quality(config.quality);

	image = image.auto('format');

	return image.url();
}

export function imageSrcSet(source, preset = 'workCard', overrides = {}) {
	if (!source) return '';

	const config = {
		...(IMAGE_PRESETS[preset] || IMAGE_PRESETS.workCard),
		...overrides,
	};

	const widths = config.widths || [config.width].filter(Boolean);

	return widths
		.map(w => {
			let image = builder.image(source).width(w);

			if (config.quality) image = image.quality(config.quality);

			image = image.auto('format');

			return `${image.url()} ${w}w`;
		})
		.join(', ');
}

export function imageAttrs(source, preset = 'workCard', overrides = {}) {
	const config = {
		...(IMAGE_PRESETS[preset] || IMAGE_PRESETS.workCard),
		...overrides,
	};

	return {
		src: imageUrl(source, preset, overrides),
		srcSet: imageSrcSet(source, preset, overrides),
		sizes: config.sizes,
	};
}
