import {Service} from "./service";
import {Database} from "../lib/database";
import {isJSONString, Pagination} from "@yid/helpers";

export class OptionsService extends Service{
    constructor(props) {
        super(props);
        this.schema = Database?.exp_options ?? undefined
    }

    async listData(){
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
            raw:true,
            subQuery: false,
            nest: true
        }

        this.callback = function({count,rows}){
            rows.map((item)=> {
                const [ err, data ] = isJSONString(item?.opt_value);
                if(!err && data ) item.opt_value = data
                return item;
            })
        }
        return await this.list({page, limit, direction})
    }

    async show(){
        try{
            this.callback = function(result){
                if(result){
                    const [ err, data ] = isJSONString(result.opt_value)
                    if(!err && data) Reflect.set(result,'opt_value',data ?? result?.opt_value)
                }
            }
            return await this.detail()
        }catch (err){
            return [ err, null ]
        }
    }
}