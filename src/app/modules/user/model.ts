export interface RegisterUser {
   name: string;
   surname: string;
   username: string;
   password: string;
   email: string;
   genres: number[];
}

export interface LoginUser{
   username: string;
   password: string;
}

export interface JWTResponse{
   access_token:string;
}
