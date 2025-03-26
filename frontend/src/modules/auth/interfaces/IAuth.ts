 interface ILogin{
    User_Email:string,
    User_Password:string
}

 interface ILoginResponse {
    id:       number;
    name:     string;
    email:    string;
    redirect: string;
}

 interface ILoginErrorResponse {
   status:  number;
   campo:   string;
   error:   string;
   message: string;
}

interface IValidateToken {
   acceso: boolean;
   msg:    string;
}

interface IRegister{
   User_Name:string;
   User_Email:string;
   User_Password:string;
}

export {
   type ILogin,
   type ILoginResponse,
   type ILoginErrorResponse,
   type IRegister,
   type IValidateToken
}