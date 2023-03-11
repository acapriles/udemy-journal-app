// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // <-- yarn add whatwg-fetch
import 'setimmediate';

// Para obtener las variables de entorno en el lado del testing
require('dotenv').config({
	path: '.env.test',
});

jest.mock('./src/helpers/getEnvironments', () => ({
	getEnvironments: () => ({ ...process.env }),
}));
