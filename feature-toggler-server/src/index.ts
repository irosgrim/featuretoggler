import "dotenv/config";
import server from "./server";

const app = server();
const PORT = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT, 10) : 3010;

app.listen(PORT, () => console.log("SERVER IS ON!"));
