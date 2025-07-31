import {sql} from "drizzle-orm";
import {integer, sqliteTable, text} from "drizzle-orm/sqlite-core";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
const defaultNow=sql`(cast((julianday('now')- 2440587.5) * 86400 as integer   ))`;


export const tasks = sqliteTable('tasks',{
    id:integer('id', {mode:'number'})
    .primaryKey({autoIncrement:true}),
    name:text('name')
    .notNull(),
    done:integer("done", {mode:'boolean'})
    .notNull()
    .default(false),
    createdAt:integer('created_at', {mode:"timestamp"})
    .default(defaultNow),
    updatedAt:integer('updated_at', {mode:"timestamp"})
    .default(defaultNow),  

});

export const selectTaskSchema = createSelectSchema(tasks);
export const insertTaskSchema = createInsertSchema(tasks,{
    name:schema=>schema.name.min(1).max(100),
})
.required({
   done:true, 
})
.omit({
    id:true,
    createdAt:true,
    updatedAt:true,
});

export const patchTaskSchema = insertTaskSchema.partial();