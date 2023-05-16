export * from './body-response'
export * from './default.handler'
import ErrorHandler from './error.handler'

export default (app)=> {
  app.use(ErrorHandler)
}