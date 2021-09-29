class User < ApplicationRecord
    has_many :portfolio_items
    has_many :watchlists
    has_secure_password
end
