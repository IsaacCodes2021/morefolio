class WatchlistItemsController < ApplicationController
    def create
        wl_item = WatchlistItem.create!(watchlist_item_params)
        render json: wl_item, status: :accepted
    end
    private

    def watchlist_item_params
        params.permit(:watchlist_id, :ticker)
    end
end
