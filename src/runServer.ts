import express from 'express';
import proxy from 'express-http-proxy';
import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';

import { Configuration } from '../types/Configuration';

const app = express();
const fsPromisses = fs.promises;

const runServer = async (config: Configuration) => {
	const fileContent = await fsPromisses.readFile(path.resolve(config.SWAGGER_DOCUMENT_DIRECTORY), 'utf8');
	const swaggerDocument = JSON.parse(fileContent);

	app.use(
		'/api',
		proxy(`http://${config.PROXY_ADDRESS}:${config.PROXY_PORT}`, {
			proxyReqPathResolver(req: express.Request) {
				const { url } = req;
				return `/api${url}`;
			},
		}),
	);

	app.use('/swagger.json', (req: express.Request, res: express.Response) => {
		res.json(swaggerDocument);
	});

	app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

	app.listen(config.SERVER_PORT, () => {
		console.log(`Server UI listening at http://localhost:${config.SERVER_PORT}`);
	});
};

export default runServer;
