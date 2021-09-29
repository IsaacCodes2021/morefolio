class WatchlistItemSerializer < ActiveModel::Serializer
  attributes :id, :ticker
  has_one :watchlist
end
