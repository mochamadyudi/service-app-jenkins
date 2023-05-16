import {ClearSequel} from "@yid/helpers";
import {YidException} from "@yid/handlers";
import moment from "moment";
class Service{
    /**
     *
     * @param {(Object| {})} props
     * @param {(Object|String|boolean|Number|false|""|undefined|null)} props.fields
     * @param {(Object)} props.condition
     * @param props.schema
     * @param {(String|Number|Boolean|undefined|null)} props.value
     * @param {String} props.key
     * @param {Function} props.callback
     * @param {(Object|{}|String|Number|Boolean)} props.params
     * @param {(Object|null|{}|undefined)} props.query
     * @param {(Array|[])} props.modules
     * @param {(String|undefined)} props.model
     */
    constructor(props) {
        this.schema = props?.schema ?? undefined
        this._validateSchema();
        this.fields = props?.fields ?? {}
        this.key = props?.key ?? undefined
        this.value = props?.value ?? null
        this.condition = props?.condition ?? {}
        this.query = props?.query ?? {}
        this.params = props?.params ?? {}
        this.model = props?.model ?? undefined
        this.callback = props?.callback ?? function(){}
        this.modules = props?.modules ?? []
    }

    /**
     * @name _validateSchema
     * @returns {Error[]}
     * @private
     */
    _validateSchema(){
        if(typeof(this.schema) === 'undefined') return [new Error('Error: Must be defined schema'),null]
    }


    /**
     * ## Save to Database
     * @name create
     * @description Create data or Save data to database
     * @returns {Promise<*[]>}
     */
    async create(){
        try {
            return await this.schema.create(this.fields, { returning: true, nest: true, raw: true })
                .then((result) => {
                    result = ClearSequel((result)?.toJSON())
                    this.callback(result)
                    return [null, result]
                })
                .catch((err) => {
                    if (err?.original?.code) {
                        if (err?.original?.code === 'ER_DUP_ENTRY') {
                            const fields = []
                            if (err?.fields) {
                                Object.keys(err?.fields).forEach((key) => {
                                    fields.push(`${key} = ${err?.fields[key]}`)
                                })
                            }
                            throw YidException.Conflict(new Error(['Error: Duplicate', fields.join(',')].join(' ')))
                        }
                    }

                    return [err?.original, null]
                })
        } catch (err) {
            return [err, null]
        }
    }

    /**
     * ## Detail Data
     * @method detail
     * @description method detail get 1 row in the database
      * @returns {Promise<void>}
     */
    async detail(){
        let condition = {
            ...this.condition,
            where: {
                ...this.condition.where,
                [this.key]: this.value
            },
            subQuery:false,
            nest:true,
            returning:true
        }
        try {
            const [err,data] =  await this.schema.findOne(condition)
                .then((result)=> {
                    result = ClearSequel(result)
                    if(this.callback && result){
                        this.callback(result)
                    }
                    return [ null , result ]
                })
                .catch((err)=> {
                    return [ err, null ]
                })

            return [err, data ]
        }catch(err){
            return [ err, null ]
        }
    }


    /**
     * ## Data Row List
     * @description get Array of data in database
     * @returns {Promise<void>}
     */
    async list(args = {}){
            let condition = {
                ...this.condition,
                subQuery: false,
                nest: true
            }
            let response = {
                pagination: {
                    page:args?.page ?? 1,
                    max_page: 0,
                    total_record: 0,
                    limit:args?.limit ?? 10
                },
                params: {
                    page: args?.page ?? 1,
                    limit:args?.limit ?? 10
                },
                data: []
            }
            try {
                if (typeof (this.schema) === "undefined") return [new Error("schema notfound!"), null]
                return this.schema.findAndCountAll({...condition,logging:false})
                    .then(({count,rows})=> {
                        Reflect.set(response.pagination,'max_page' , Math.round(count/(args?.limit ?? 10)))
                        Reflect.set(response.pagination,'total_record' ,count)
                        this.callback({count,rows},response)

                        Reflect.set(response,'data',rows)
                        return [ null , response]
                    })
                    .catch((err)=> {
                        return [ err, response ]
                    })
            }catch(err){
                return [ err, response ]
            }

    }


    /**
     * ## Update Single Row
     * @method update()
     * @description method to change the data in the database
     * @returns {Promise<void>}
     */
    async update(){
        try{
            const [ err ,data ] = await this.detail();
            if(err) return [ err, null]
            if(!data) return [ new Error('Error: Data not found!'),null]
            let condition = {
                ...this.condition,
                where: {
                    ...this.condition.where,
                    [this.key]: this.value,
                },
                plain:true,
                returning: true,
                nest:true,
                raw:true
            }
            return await this.schema.update(this.fields,condition)
                .then(([_,result])=> {
                    result = ClearSequel(result)
                    this.callback(result)
                    return [ null , result]
                })
                .catch((err) => {
                    if (err?.original?.code) {
                        if (err?.original?.code === 'ER_DUP_ENTRY') {
                            const fields = []
                            if (err?.fields) {
                                Object.keys(err?.fields).forEach((key) => {
                                    fields.push(`${key} = ${err?.fields[key]}`)
                                })
                            }
                            throw YidException.Conflict(new Error(['Error: Duplicate', fields.join(',')].join(' ')))
                        }
                    }

                    return [err?.original, null]
                })
        }catch (err){
            return [ err, null ]
        }
    }

    /**
     * ## Update Bulk Row
     * @method bulkUpdate()
     * @description method to change the data in the database
     * @returns {Promise<void>}
     */
    async bulkUpdate(){
        
    }

    /**
     * ## Update Bulk Delete in Row
     * @method bulkDelete()
     * @description method to change the data in the database
     * @returns {Promise<void>}
     */
    async bulkDelete(){
        
    }

    /**
     * ## Delete in Row
     * @method delete()
     * @description method to delete data in the database
     * @returns {Promise<void>}
     */
    async delete(){
        try {
            let condition = {
                ...this.condition,
                where: {
                    ...this.condition?.where,
                    [this.key ?? "id"]: this.value
                }
            }
            if (typeof (this.schema) === "undefined") return [new Error("schema notfound!"), null]
            return await this.schema.destroy(condition)
                .then((result) => {
                    if (result > 0) {
                        this.callback(this.value,this.key)
                        return [null, true]
                    }
                    return [new Error(`Failed! row by ${this.key} = ${this.value} Not found!`), null]
                })
                .catch((err) => {
                    return [err, null]
                })
        } catch (err) {
            return [err, null]
        }
    }

    /**
     * ## SoftDelete in Row
     * @method softDelete()
     * @description method to softDelete data in the database
     * @description update column deleteAt in the database
     * @returns {Promise<void>}
     */
    async softDelete(){
        try{
            const [ err, data ] = await this.detail();
            if(err) return [ err, null]
            if(!data) return [null, null]
            let condition = {
                ...this.condition,
                where: {
                    ...this.condition.where,
                    [this.key]: this.value
                },
                returning: true,
                plain:true
            }
            this.fields = {
                deletedAt: moment()
            }
            return await this.schema.update(this.fields,condition)
                .then(([_,result])=> {
                    result = ClearSequel(result)
                    this.callback(result)
                    return [ null, result]
                })
                .catch((err)=> {
                    return [ err, null ]
                })

        }catch(err){

        }
    }

}

export { Service }