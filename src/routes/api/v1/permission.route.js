
import {PermissionValidator} from "../../../lib/validator";
import Controllers from "../../../controllers";

export default (app)=> {
    app.get('/permission/:id',Controllers.Permission.show)
    app.put('/permission/:id',PermissionValidator.update,Controllers.Permission.update)
    app.delete('/permission/:id',Controllers.Permission.delete)
    app.post('/permission',PermissionValidator.create,Controllers.Permission.create)
    app.get('/permission',Controllers.Permission.list)
}