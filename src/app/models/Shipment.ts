import { Manifest } from "./Manifest";

export interface Shipment{
   _id?:string
   id?:string
   customerName:string
   customerTelephone?:string
   title:string
   CBM:number
   totalCost:number
   amountPaid:number
   manifestId?:string
   description?:string
   createdBy?:string
   editedBy?:string
   createdOn?:string
   lastEdited?:string
   currency:string
   picked?:boolean
   status?:string
   trackingId?:string
   manifest?:Manifest
}