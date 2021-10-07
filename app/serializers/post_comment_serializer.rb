class PostCommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :profile
  has_one :user
  has_one :post

  def profile
    user = User.find(object.user_id)
    {profile_img: user[:profile_img], username: user[:username]}
  end
end
