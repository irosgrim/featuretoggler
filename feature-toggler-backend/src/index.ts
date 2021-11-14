import 'dotenv/config';
import server from "./server";

const app = server();
const PORT = 3010;

app.listen(PORT, () => console.log("SERVER IS ON!"));
