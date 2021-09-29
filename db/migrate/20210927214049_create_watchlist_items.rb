class CreateWatchlistItems < ActiveRecord::Migration[6.1]
  def change
    create_table :watchlist_items do |t|
      t.belongs_to :watchlist, null: false, foreign_key: true
      t.string :ticker
    end
  end
end
