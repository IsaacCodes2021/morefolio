class PostCommentsController < ApplicationController
    # before_action :authorize

    def create 
        comment = PostComment.create!(comment_params)
        render json: comment, status: :created
    end

    def update 
        comment = PostComment.find(params[:id])
        comment.update(comment_params)
        render json: comment, status: :updated
    end

    def delete 
        comment = PostComment.find(params[:id])
    end

    def index
        render json: PostComment.all
    end

    private

    def comment_params
        params.permit(:post_id, :user_id, :content)
    end
end
