class PortfolioItemsController < ApplicationController

    before_action :authorize
    def create
        asset_set = @user.portfolio_items.create!(portfolio_items_params)
        render json: asset_set, status: :accepted 
    end

    def update
        asset = PortfolioItem.find(params[:id])
        asset.update(portfolio_items_params)
        render json: asset, status: :updated
    end

    def destroy
        delete_port_item = PortfolioItem.find(params[:id])
        delete_port_item.destroy
        head :no_content, status: :ok
    end

    private

    def portfolio_items_params
        params.permit(:ticker, :quantity, :purchase_price, :purchase_date)
    end
end
