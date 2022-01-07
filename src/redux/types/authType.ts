
import { IUser } from "../../utills/TypeScript"

export const AUTH = 'AUTH'
export const CREATE_USER = 'CREATE_USER'


export interface IAuth {
    token?: string;
    user?: IUser;
}

export interface IAuthType {
    // type: typeof AUTH,
    type: string,
    payload: IAuth
}
