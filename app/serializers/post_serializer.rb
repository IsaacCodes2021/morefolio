class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :ticker, :content, :likes
  has_one :user
  has_many :post_comments
end
