#! /usr/bin/env node
import fs from 'fs';
import path from 'path';

import { Configuration } from '../types/Configuration';
import runServer from './runServer';

const fsPromisses = fs.promises;
const defaultConfigFileName = 'types.config.json';

const main = async () => {
	let configPath = process.argv.find((item) => item.includes('--config-path'));
	const defaultFileExists = await fs.existsSync(`./${defaultConfigFileName}`);

	if (!configPath && !defaultFileExists)
		throw new Error(
			`--config-path parameter is missing! \nPlease consider as alternative to define default configuration file ${defaultConfigFileName}!`,
		);

	if (!configPath && defaultFileExists) configPath = `./${defaultConfigFileName}`;
	else if (configPath) [, configPath] = configPath?.split('=');

	if (!configPath?.endsWith('.json')) {
		throw new Error('Not a valid json file!');
	}

	configPath = path.resolve(configPath);

	const config: Configuration = {} as Configuration;

	try {
		const file = await fsPromisses.readFile(configPath, 'utf8');

		const json = JSON.parse(file);

		Object.keys(json).forEach((key) => {
			if (key === 'SWAGGER_DOCUMENT_DIRECTORY') config[key] = path.resolve(json[key]);
			else config[key] = json[key];
		});

		if (!config.SWAGGER_DOCUMENT_DIRECTORY) {
			throw new Error('Missing variable SWAGGER_DOCUMENT_DIRECTORY!');
		}

		if (!config.PROXY_ADDRESS) {
			throw new Error('Missing variable PROXY_ADDRESS!');
		}

		if (!config.PROXY_PORT) {
			throw new Error('Missing variable PROXY_PORT!');
		}

		if (!config.SERVER_PORT) {
			throw new Error('Missing variable SERVER_PORT!');
		}

		await runServer(config);
	} catch (error) {
		console.error(error);
	}
};

main();
