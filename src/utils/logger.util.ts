import winston from 'winston';

const levels = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	debug: 4,
};

const level = () => {
	const env = process.env.NODE_ENV || 'development';
	const isDevelopment = env === 'development';
	return isDevelopment ? 'debug' : 'http';
};

const colors = {
	error: 'red',
	warn: 'yellow',
	info: 'green',
	http: 'magenta',
	debug: 'white',
};
if (process.env.NODE_ENV === 'development') {
	winston.addColors(colors);
}

const consoleFormat = winston.format.combine(
	winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
	winston.format.colorize({ all: true }),
	winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);

const fileFormat = winston.format.combine(winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }), winston.format.json());

/* eslint-disable */
const getTransports = (): winston.transport[] => {
	switch(process.env.NODE_ENV) {
		case 'test': return [];
		case 'development':
			return [
				new winston.transports.Console({
					format: consoleFormat,
				}),
				new winston.transports.File({
					filename: 'logs/error.log',
					level: 'error',
					format: fileFormat,
					eol: ',',
				}),
				new winston.transports.File({
					filename: 'logs/all.log',
					format: fileFormat,
					eol: ',',
				}),
			];
		case 'production':
			return [
				new winston.transports.Console({
					format: consoleFormat,
				}),
			];
		default:
			return [
				new winston.transports.Console({
					format: consoleFormat,
				}),
			];
	}
}
/* eslint-enable */

const logger = winston.createLogger({
	level: level(),
	levels,
	transports: getTransports(),
});

export default logger;
