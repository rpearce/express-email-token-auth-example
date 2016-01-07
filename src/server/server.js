import app from './index';
import { express } from '../config';

const { protocol, host, port } = express;

app.listen(port, host, (error) => {
  if (error) {
    console.error(error);
    process.exit(10);
  }

  console.log(`express is listening on ${protocol}://${host}:${port}`);
});
