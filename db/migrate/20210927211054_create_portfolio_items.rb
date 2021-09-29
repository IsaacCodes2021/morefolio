class CreatePortfolioItems < ActiveRecord::Migration[6.1]
  def change
    create_table :portfolio_items do |t|
      t.string :ticker
      t.float :quantity
      t.float :purchase_price
      t.datetime :purchase_date
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
