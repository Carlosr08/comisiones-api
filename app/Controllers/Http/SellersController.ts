// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database"
import Seller from "App/Models/Seller"

export default class SellersController {
  public async getSellers() {
    const sellers = await Seller.query()
    return {
      error: false,
      data: sellers,
    }
  }

  public async createSeller({ request, response }) {
    // agregar el request a constante body
    const body = request.all()

    // iniciar transaccion
    const trx = await Database.transaction()

    try {
      // verificacion de datos mandados por el body
      if (!body.name) throw new Error("Ingrese un nombre")
      if (!body.code) throw new Error("Ingrese un codigo")
      if (!body.position) throw new Error("Ingrese un cargo")
      if (!body.document) throw new Error("Ingrese un documento de identidad")

      // verificar si exite el codigo
      const verifyCode = await Seller.findBy("code", body.code)
      if (verifyCode) throw new Error("Codigo ya registrado")

      // verificar si exite el documento de identidad
      const verifyDocument = await Seller.findBy("document", body.document)
      if (verifyDocument) throw new Error("Documento ya registrado")

      // crear comerciante si no hay errores
      await Seller.create({
        name: body.name,
        code: body.code,
        position: body.position,
        document: body.document,
      }, { client: trx }
      ).catch((e) => {
        // retornar error si hay en la base de datos
        throw new Error("Comerciante no creado " + e)
      })

      // guardar transaccion
      await trx.commit()


      // si no existe error rotornará
      return {
        error: false,
        message: "Comerciante creado",
      }
    } catch (error) {
      // cerrar transaccion se existe error
      await trx.rollback()

      // retorno si hay error
      return response.badRequest({
        error: true,
        message: error.message,
      })
    }
  }

  public async updateSeller({ request, response }) {
    // agregar el request a constante body y obteniendo el parametro code desde la url
    const body = request.all()
    const code = request.param('code')

    // iniciar transaccion
    const trx = await Database.transaction()

    try {
      // verificacion de datos mandados por el body
      if (!body.name) throw new Error("Ingrese un nombre")
      if (!body.code) throw new Error("Ingrese un codigo")
      if (!body.position) throw new Error("Ingrese un cargo")
      if (!body.document) throw new Error("Ingrese un documento de identidad")

      // verificar si exite el codigo del param
      const verifyCodeParam = await Seller.findBy("code", code)
      if (!verifyCodeParam) throw new Error("Comerciante no encontrado")

      // verificar si exite el codigo
      if (body.code !== verifyCodeParam.code) {
        const verifyCode = await Seller.findBy("code", body.code)
        if (verifyCode) throw new Error("Codigo ya registrado")
      }

      // verificar si exite el documento de identidad
      if (body.document !== verifyCodeParam.document) {
        const verifyDocument = await Seller.findBy("document", body.document)
        if (verifyDocument) throw new Error("Documento ya registrado")
      }

      // actualizar si no hay errores
      await Seller.query({ client: trx })
        .where('code', code)
        .update({
          name: body.name,
          code: body.code,
          position: body.position,
          document: body.document
        })

      // guardar transaccion
      trx.commit()

      // si no existe error rotornará
      return {
        error: false,
        message: "Comerciante actualizado",
      }

    } catch (error) {
      // cerrar transaccion se existe error
      await trx.rollback()

      // retorno si hay error
      return response.badRequest({
        error: true,
        message: error.message,
      })
    }
  }
}
