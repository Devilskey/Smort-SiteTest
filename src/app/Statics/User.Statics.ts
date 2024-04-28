export class User { 
   public static Id:string = window.localStorage.getItem('id') ?? "";
   public static token:string = window.localStorage.getItem('token') ?? "";
   public static UserName:string = window.localStorage.getItem('username') ?? "";
   public static ProfilePicture: string = window.localStorage.getItem('pic') ?? "";
}