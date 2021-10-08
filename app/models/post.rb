class Post < ApplicationRecord
  belongs_to :user
  has_many :post_comments, dependent: :delete_all
  has_many :users, through: :post_comments
end
