import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'commissions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('seller_id').unsigned().references('sellers.id').notNullable()
      table.integer('company_id').unsigned().references('companies.id').notNullable()
      table.integer('n_facture').notNullable()
      table.timestamp('f_facture', { useTz: true }).notNullable()
      table.string('condition').notNullable()
      table.decimal('amount').notNullable()
      table.decimal('credit').notNullable()
      table.decimal('rest').notNullable()
      table.decimal('percentage').notNullable()
      table.decimal('commission').notNullable()
      table.timestamp('created_at', { useTz: true }).nullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
