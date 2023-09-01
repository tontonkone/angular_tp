import { User } from "./user";

export interface ITask{
    id: string;
    description: string;
    done: boolean;
    userId: string;
    user: User;
    categoryId: string;
}