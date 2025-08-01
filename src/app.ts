import configureOpenAPI from "./lib/configure-open";
import createApp from "./lib/create-app";
import index from "@/routes/index.routes";
import tasks from "@/routes/tasks/tasks.index"

const app=createApp();
// const routes=[
//   index,
//   tasks,
//   ]as const;


// configureOpenAPI(app);
// routes.forEach((route)=>{
//   app.route("/", route);
// });

const _app=app;
app.route("/", index);
app.route("/tasks", tasks);

export type AppType=typeof _app;

 //export type AppType=typeof routes[number];

export default app;