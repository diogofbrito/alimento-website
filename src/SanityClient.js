import { createClient } from '@sanity/client';


const sanityClient = createClient({
	projectId: 'vybb0bag',
	dataset: 'production',
	apiVersion: '2023-10-25',
	useCdn: false,
});

export default sanityClient;

