class PostComment < ApplicationRecord
  belongs_to :user
  belongs_to :post, dependent: :destroy
end
