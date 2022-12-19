import Route from '@ioc:Adonis/Core/Route'

Route.get('sellers', 'SellersController.getSellers')
Route.post('seller', 'SellersController.createSeller')
Route.put('seller/:code', 'SellersController.updateSeller')