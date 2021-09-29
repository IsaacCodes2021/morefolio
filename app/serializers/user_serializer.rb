class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :profile_img, :password_digest
  has_many :portfolio_items
  has_many :watchlists

end
