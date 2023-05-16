import {Service} from "./service";
import {Database} from "../lib/database";
import {Pagination} from "@yid/helpers";

export class RoleService extends Service{
    constructor(props) {
        super(props);
        this.schema = Database.role
    }

    async listData(){
        try{
            const {page, limit, direction} = Pagination(this.query)
            let order = [['id', 'DESC']]
            if (direction.toString().toLowerCase() === "asc" || direction.toLowerCase() === "desc") order = [['id', direction]]
            this.condition = {
                required:true,
                limit,
                offset: limit * (page > 1 ? page - 1 : 0),
                order,
                where: {},
                include: [],
                attributes: ['id','name','createdAt'],
                raw:true,
                subQuery: false,
                nest: true
            }
            return await this.list()
        }catch (err){
            return [ err , null ]
        }
    }

}