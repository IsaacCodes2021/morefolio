class WatchlistsController < ApplicationController
    before_action :authorize, except: :show
    def create
        wl = Watchlist.create!(watchlist_params)
        render json: wl, status: :accepted
    end

    def update
        wl = Watchlist.find(params[:id])
        wl.update(watchlist_params)
        render json: wl, status: :updated
    end

    def destroy
        wl = Watchlist.find(params[:id])
        wl.destroy
        head :no_content
    end

    def show 
        wl = Watchlist.find(params[:id])
        render json: wl, status: :ok
    end

    private

    def watchlist_params
        params.permit(:name, :user_id)
    end
end
