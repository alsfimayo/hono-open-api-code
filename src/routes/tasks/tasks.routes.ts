import { insertTaskSchema, patchTaskSchema, selectTaskSchema } from "@/db/schema";
import { notFoundSchema } from "@/lib/constant";
import { createRoute,z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import {jsonContentOneOf} from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";
const tags=['Tasks'];

export const list=createRoute({
    path:"/tasks",
    method:"get",
    tags,

    responses:{
        [HttpStatusCodes.OK]:jsonContent(
          z.array(selectTaskSchema),
            'List of tasks',  
        )
    }
});

export const create=createRoute({
  path:"/tasks",
  method:"post",
  request:{
    body:jsonContentRequired(
      insertTaskSchema,
      'Task to create',
    )
  },
  tags,
  responses:{
    [HttpStatusCodes.OK]:jsonContent(
      selectTaskSchema,
      'Created task',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]:jsonContent(
      createErrorSchema(insertTaskSchema),
      "the validation error(s)",
    )
  },

});

export const getOne=createRoute({
  path:"/tasks/{id}",
  method:"get",
  request:{
    params:IdParamsSchema,
  },
  tags,
  responses:{
    [HttpStatusCodes.OK]:jsonContent(
      selectTaskSchema,
      'The requested task',

    ),
    [HttpStatusCodes.NOT_FOUND]:jsonContent(
       notFoundSchema,     
      "task not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]:jsonContent(
      createErrorSchema(insertTaskSchema),
      "invalid id error(s)",
    )
  }
});

export const patch=createRoute({
  path:"/tasks/{id}",
  method:"patch",
  request:{
    params:IdParamsSchema,
    body:jsonContentRequired(
      patchTaskSchema,
      "The task to update",
    ),
  },
  tags,
  responses:{
    [HttpStatusCodes.OK]:jsonContent(
      selectTaskSchema,
      'the updated task',
    ),
    [HttpStatusCodes.NOT_FOUND]:jsonContent(
       notFoundSchema,     
      "task not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]:jsonContentOneOf(
      [
        createErrorSchema(patchTaskSchema),
        createErrorSchema(IdParamsSchema),
      ],
      "the validation error(s)"
    ),
  },
});


export const remove=createRoute({
  path:"/tasks/{id}",
  method:"delete",
  request:{
    params:IdParamsSchema,
    
  },
  tags,
  responses:{
    [HttpStatusCodes.NO_CONTENT]:{
      description:"Task deleted successfully",
    },
    [HttpStatusCodes.NOT_FOUND]:jsonContent(
       notFoundSchema,     
      "task not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]:jsonContent(
      createErrorSchema(IdParamsSchema),
      "INvalid id error(s)"
    ),
  },
});


export type ListRoute=typeof list;
export type CreateRoute=typeof create;
export type GetOneRoute=typeof getOne;
export type PatchRoute=typeof patch;
export type RemoveRoute=typeof remove;

// notFoundSchema = z.object({
//         message:z.string(),
//       }).openapi({
//         message:"Not Found",
//       }),