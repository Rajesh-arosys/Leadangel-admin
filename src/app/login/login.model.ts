export class Login {
    
    username: string
    password: string
    clientid: string

      
}

export class loginSuccessModel {
    status: string
    data: {
        clientUserId: any
        EmailAddress: string
        clientPartnerID: any
        role: string
        firstname: string
        lastname: string
        UserToken: string
    }
    message: string
}