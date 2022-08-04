import app from "./app.js";

app.set("port", process.env.PORT || 1000);

app.listen(app.get("port"), () => console.log(app.get("port")));