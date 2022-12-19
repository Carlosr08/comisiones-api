import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'commissions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('seller_id').unsigned().references('sellers.id')
      table.integer('company_id').unsigned().references('companies.id')
      table.integer('n_facture')
      table.date('f_facture')
      table.string('condition')
      table.decimal('amount')
      table.decimal('credit')
      table.decimal('rest')
      table.decimal('percentage')
      table.decimal('commission')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
