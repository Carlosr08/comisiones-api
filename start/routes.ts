import Route from '@ioc:Adonis/Core/Route'
import './sellers'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('about', async () => {
  return 'carlos'
})