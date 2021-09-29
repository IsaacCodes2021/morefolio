class WatchlistSerializer < ActiveModel::Serializer
  attributes :id, :name, :watchlist_items
  has_one :user
  has_many :watchlist_items
end
