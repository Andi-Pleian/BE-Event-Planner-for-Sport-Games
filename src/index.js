import app from "./app";
import { Database } from "./bootstrap/database.bootstrap";

const port = process.env.PORT || 3001;
const database = new Database();

database.bootstrap();

//  Starting the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

export default app;
