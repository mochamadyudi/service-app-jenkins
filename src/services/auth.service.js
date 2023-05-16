import {Service} from "@yid/services";
import {Database} from "../lib/database";

export class AuthService extends Service{
    constructor(props) {
        super(props);
        this.schema = Database.users
    }

    async signUp(){
        try{
            this.condition = {
                where:  {
                    email: this.fields.email
                }
            }
            const [ errCheck,dataCheck] = await this.detail();
            if(errCheck) throw new Error(errCheck?.message ?? "Error: Check Detail")
            if(dataCheck) return [ new Error('Error: the user has been registered'),null]
            return await this.create()
        }catch(err){
            return [ err ,null ]
        }
    }

    async signIn(){
        try{
            this.condition = {
                where:  {
                    email: this.fields.email
                },
                attributes: ['id','email','username','isConfirm','isDeleted']
            }
            return await this.detail();
        }catch(err){
            return [ err, null]
        }
    }
}