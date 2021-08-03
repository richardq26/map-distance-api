require("dotenv").config();
const app = require("./server");
const puerto = app.get("port");

app.listen(puerto, () => {
  console.log("Server listening on", puerto);
});
