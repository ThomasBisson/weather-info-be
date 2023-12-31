import dotenv from 'dotenv';

import app from './app';
import logger from './utils/logger.util';

dotenv.config();

const port = process.env.PORT || 6000;

app.listen(port, () => {
	logger.info(`Server is running at http://localhost:${port}`);
});
