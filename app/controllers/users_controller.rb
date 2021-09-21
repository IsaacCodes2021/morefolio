class UsersController < ApplicationController
    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def show
        render json: @user, status: :accepted
    end

    def update
        @user.update!(user_params)
        render json: @user, status: :accepted
    end

    def destroy
        user.find(params[:id]).destroy
        head :no_content
    end

    private

    def user_params
        params.permit(:username, :email, :profile_img, :password)
    end
end