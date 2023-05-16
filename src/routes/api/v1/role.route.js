import {RoleValidator} from "../../../lib/validator";
import Controllers from "../../../controllers";

export default (app)=> {
    // app.use('/role')
    app.get('/role/:id',Controllers.Role.show)
    app.put('/role/:id',RoleValidator.update,Controllers.Role.update)
    app.delete('/role/:id',Controllers.Role.delete)
    app.patch('/role/rollback/:id',Controllers.Role.rollback)
    app.post('/role',RoleValidator.create,Controllers.Role.create)
    app.get('/role',Controllers.Role.list)
}