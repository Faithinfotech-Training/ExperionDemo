import { Role } from "./role";

export class User{
    Id: number;
    UserName: string;
    Userpassword: string;
    RoleId: number;
    //Object Oriented Model
    Role: Role;
    isActive: boolean;

}