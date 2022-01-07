import { IAlert } from "../../utills/TypeScript";


export const ALERT = 'ALERT'

export interface IAlertType {
    type: typeof ALERT;
    payload: IAlert
}