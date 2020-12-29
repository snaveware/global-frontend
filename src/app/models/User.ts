import { Group } from "./Group";

export interface User{
   _id?:string
   firstName:string
   lastName:string
   email:string
   password:string
   confirmPassword?:string
   telephone?:string
   branch:string
   userGroup?:string
   status?:string
   createdOn?:string
   createdBy?:string
   lastLogin?:string
   profilePicUrl?:string
   group?:Group
}