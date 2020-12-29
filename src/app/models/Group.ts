import { Permissions } from "./Permissions";

export interface Group{
   _id?:string
   name:string
   level:number
   permissions:Permissions
   description?:string
   createdBy?:string
   editedBy?:string
   lastUpdate?:string
   createdOn?:string

}