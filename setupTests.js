import { Database } from "./src/bootstrap/database.bootstrap";

const database = new Database();

global.beforeAll(async () => {
  database.bootstrap();
});

global.afterEach(async () => {
  await database.reset();
});

global.afterAll(async () => {
  await database.close();
});
