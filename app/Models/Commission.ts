import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Commission extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public seller_id: number

  @column()
  public company_id: number

  @column()
  public n_facture: number

  @column()
  public f_facture: Date

  @column()
  public condition: string

  @column()
  public amount: number

  @column()
  public credit: number

  @column()
  public rest: number

  @column()
  public percentage: number

  @column()
  public commission: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
