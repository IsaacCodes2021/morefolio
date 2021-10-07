class User < ApplicationRecord
    has_many :portfolio_items
    has_many :watchlists
    has_secure_password
    validates :username, presence: true, uniqueness: true
    has_many :posts, through: :post_comments
    has_many :posts
    has_many :post_comments
end
