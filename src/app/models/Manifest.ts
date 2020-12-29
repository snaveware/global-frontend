import { Shipment } from "./Shipment";
import { User } from "./User";

export interface Manifest{
   _id?:string
   id?:string
   source:string
   destination:string
   departure?:string
   departureLocal?:string
   arrival?:string
   arrivalLocal?:string
   shipperName?:string
   shipperContact?:string
   status?:string
   createdON?:string
   lastUpdated?:string
   shipmentsCount?:number
   description?:string
   createdOn?:string
   trackingId?:string
   shipments?:[Shipment]
   agent?:User
   agentName?:string
   agentTelephone?:string
}