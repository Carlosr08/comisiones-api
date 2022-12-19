// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Seller from "App/Models/Seller"

export default class SellersController {
  public async getSellers() {
    const sellers = await Seller.query()
    return {
      error: false,
      data: sellers
    }
  }
}
