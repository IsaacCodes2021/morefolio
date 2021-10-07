class WatchlistItemsController < ApplicationController
    def create
        wl_item = WatchlistItem.create!(watchlist_item_params)
        render json: wl_item, status: :accepted
    end
    def destroy 
        item = WatchlistItem.find(params[:id])
        wl_id = item[:watchlist_id]
        item.destroy
        rest = Watchlist.find(wl_id).watchlist_items
        render json: rest
    end
    private

    def watchlist_item_params
        params.permit(:watchlist_id, :ticker)
    end
end
