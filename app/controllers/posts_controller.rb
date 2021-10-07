class PostsController < ApplicationController
    before_action :authorize, except: [:index, :show]

    def index 
        render json: Post.all, status: :ok
    end

    def show
        post = Post.find(params[:id])
        render json: post, status: :ok
    end

    def create
        newPost = @user.posts.create!(post_params)
        render json: newPost, status: :accepted
    end

    def update 
        post = Post.find(params[:id])
        post.update(post_params)
        render json: post, status: :ok
    end

    def destroy
        post = Post.find(params[:id])
        post.destroy
        head :no_content
    end

    private 

    def post_params 
        params.permit(:title, :ticker, :content, :likes)
    end
end
