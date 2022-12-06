export interface IUser {
  id: number,
  username?: string,
  role?: string,
  email: string,
  password: string
}

export interface IEmailAndPassword {
  email: string,
  password: string
}

export interface IStatusAndMessage {
  status: number,
  message: string
}
