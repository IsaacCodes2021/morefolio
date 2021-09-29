class User < ApplicationRecord
    has_many :portfolio_items
    has_many :watchlists
    has_secure_password
    validates :username, presence: true, uniqueness: true
end
