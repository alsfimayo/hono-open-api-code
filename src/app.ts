import configureOpenAPI from "./lib/configure-open";
import createApp from "./lib/create-app";
import index from "./routes/index.routes";
import tasks from "./routes/tasks/tasks.index"

const app=createApp();
const _app=app
.route("/", index)
.route("/tasks", tasks);
export type AppType=typeof _app;
export default app;