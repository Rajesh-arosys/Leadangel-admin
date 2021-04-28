export class AdminLogin {
    
    username: string
    password: string
    clientid: string

      
}

export class AdminLoginSuccessModel {
    status: string
    data: {
        clientUserId: number
        EmailAddress: string
        clientPartnerID: number
        role: string
        firstname: string
        lastname: string
        UserToken: string
        vyakaradminid
    }
    message: string
}