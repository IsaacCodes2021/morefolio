class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :profile_img, :password_digest
end
