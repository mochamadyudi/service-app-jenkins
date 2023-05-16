
import {CategoryValidator} from "../../../lib/validator";
import Controllers from "../../../controllers";

export default (app)=> {
    app.get('/category/:id',Controllers.Category.detail)
    app.put('/category/:id',Controllers.Category.update)
    app.delete('/category/:id',Controllers.Category.delete)
    app.post('/category',CategoryValidator.create,Controllers.Category.create)
    app.get('/category',Controllers.Category.list)
}