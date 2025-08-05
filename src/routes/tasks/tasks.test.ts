import { describe,it,expect,expectTypeOf } from "vitest";
import { createApp, createTestApp } from "@/lib/create-app";
import router from "./tasks.index";
import { testClient } from "hono/testing";
describe("Tasks list",()=>{
    it("responds with an array", async()=>{
        const testRouter=createTestApp(router);
        const response=await testRouter.request("/tasks");
        const result=await response.json();
        console.log(result);
        //@ts-ignore
        expectTypeOf(result).toBeArray();
    });

     it("responds with an array", async()=>{
        const client=testClient(createApp().route("/",router));
        const response= await client.tasks.$get();
        const json=await response.json();
        // @ts-ignore;
        expectTypeOf(json).toBeArray();
    });

     it("validates the id param", async()=>{
        const client=testClient(createApp().route("/",router));
       
        const response= await client.tasks[':id'].$get({
           param:{
            // @ts-ignore   
                id:"wat",
            },
       });
       expect (response.status).toBe(422);
    });

    it("validates the body when we creating", async()=>{
        const client=testClient(createApp().route("/",router));
       const response= await client.tasks.$post({
       //@ts-ignore
        json:{
        name:"ali ahamd",
       },           
       });
       expect (response.status).toBe(422);
    });
});