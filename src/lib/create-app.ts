import { OpenAPIHono } from "@hono/zod-openapi";
import {notFound, onError, serveEmojiFavicon} from 'stoker/middlewares'
import { pinoLogger } from "@/middleware/pino-logger";
import type { AppBindings, AppOpenAPI } from "@/lib/types";
import { defaultHook } from "stoker/openapi";


export default function createRouter(){
return new OpenAPIHono<AppBindings>({
    strict:false,
    defaultHook,
});
}

export  function createApp(){

const app = createRouter();
app.use(serveEmojiFavicon("💕"));
app.use(pinoLogger());
app.notFound(notFound);
app.onError(onError)
return app;

}


export function createTestApp(router:AppOpenAPI){
    const testApp=createApp();
    testApp.route("/", router);
    return testApp;
}