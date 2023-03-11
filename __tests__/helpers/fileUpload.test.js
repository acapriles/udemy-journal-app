import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../src/helpers/fileUpload';

cloudinary.config({
	cloud_name: 'df0qvzflc',
	api_key: '512683727193514',
	api_secret: 'zkO1oOBdMv8JSCSprUcuvV1KwoU',
	secure: true,
});

describe('Tests on fileUpload()', () => {
	test('should upload the file successfully to Cloudinary', async () => {
		const imageUrl =
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlUARRTXvdy4XcjC9RcdrGKuC6y3pEMJ5rBw&usqp=CAU';
		const resp = await fetch(imageUrl);
		const blog = await resp.blob();
		const file = new File([blog], 'image.jpg');

		const url = await fileUpload(file);

		expect(typeof url).toBe('string');
		expect(url.length).toBeGreaterThan(1);
		expect(url).not.toBe(null);

		//Delete Image from Cloudinary
		const segments = url.split('/');
		const imageId = segments[segments.length - 1].replace('.jpg', '');
		await cloudinary.api.delete_resources([`journal/${imageId}`], {
			resource_type: 'image',
		});
	});

	test('should return null', async () => {
		const file = new File([], 'image.jpg');
		const url = await fileUpload(file);

		expect(url).toBe(null);
	});
});
