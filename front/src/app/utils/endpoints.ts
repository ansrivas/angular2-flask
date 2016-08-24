
export class EndPoints {
  public static get LOGIN(): string { return 'http://localhost:8081/api/loginuser'; }
  public static get LOGOUT(): string { return 'http://localhost:8081/api/logoutuser'; }
  public static get GETDATA(): string { return 'http://localhost:8081/api/getdata'; }
}
