export interface JWTSubject {
  user : RequestUser
}

export interface RequestUser {
  sub : number;
  iat : number;
  exp : number;
  id_site : number;
  username : string;
  email : string;
  isMaster : boolean;
}