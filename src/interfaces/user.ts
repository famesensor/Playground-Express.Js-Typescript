export interface IUser {
    username: string;
    password: string;
    email: string;
    picture: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserSignup {
    username: string;
    password: string;
    email: string;
}

export interface UserSignin {
    username: string;
    password: string;
}
