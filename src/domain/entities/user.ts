import { IUser } from "../interface/user";

export class User implements IUser {
    id?: string;
    email: string = "";
    name: string = "";
}