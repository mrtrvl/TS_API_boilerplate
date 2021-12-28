import app from './app';
import config from './config';
import { logger } from './components/general';

const port = config.port || 4000;

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
