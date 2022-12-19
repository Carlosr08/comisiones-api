import Route from '@ioc:Adonis/Core/Route'
import './sellers'

Route.get('/', async () => {
  return { hello: 'world' }
})