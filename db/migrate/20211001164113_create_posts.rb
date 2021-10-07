class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :ticker
      t.text :content
      t.integer :likes
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
