
import {OptionsValidator, PermissionValidator} from "../../../lib/validator";
import Controllers from "../../../controllers";

export default (app)=> {
    app.get('/options/:id',Controllers.Options.show)
    app.put('/options/:id',OptionsValidator.update,Controllers.Options.update)
    app.delete('/options/:id',Controllers.Options.delete)
    app.post('/options',OptionsValidator.create,Controllers.Options.create)
    app.get('/options',Controllers.Options.list)
}