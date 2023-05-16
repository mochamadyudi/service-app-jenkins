import {AuthValidator} from "../../../lib/validator";
import Controllers from "../../../controllers";

export default (app)=> {
  app.get('/auth', (req,res)=>{
    return res.status(200).send(`OK! <pre>${JSON.stringify(req.headers,0,2)}</pre>`)
  })

  app.post('/auth/signUp', AuthValidator.signUpValidator, Controllers.Auth.signUp)
  app.post('/auth/signIn', AuthValidator.signIn, Controllers.Auth.signIn)
}