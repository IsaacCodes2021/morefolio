class PortfolioItemSerializer < ActiveModel::Serializer
  attributes :id, :ticker, :quantity, :purchase_price, :purchase_date
  has_one :user
end
