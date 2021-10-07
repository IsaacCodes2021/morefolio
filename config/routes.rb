Rails.application.routes.draw do

  resources :post_comments
  resources :posts
  resources :watchlist_items
  resources :watchlists
  resources :portfolio_items

  # users
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  patch '/users/:id', to: 'users#update'
  delete '/users/:id', to: 'users#destroy'
  get '/avatar/:id', to: 'users#avatar'
  
  # portfolio_items
  post '/portfolio_item', to: 'portfolio_items#create'
  patch '/portfolio_item/:id', to: 'portfolio_items#update'
  delete '/portfolio-item/:id', to: 'portfolio_items#destroy'

  # watchlists
  post '/watchlists', to: 'watchlists#create'
  patch '/watchlists/:id', to: 'watchlists#update'
  delete '/watchlists/:id', to: 'watchlists#destroy'
  get '/watchlists/:id', to: 'watchlists#show'

  # watchlist_items
  post '/watchlist-items', to: 'watchlist_items#create'
  patch '/watchlist-items/:id', to: 'watchlist_items#update'
  delete '/watchlist-items/:id', to: 'watchlist_items#destroy' 

  # posts
  get '/posts', to: 'posts#index'
  get 'posts/:id', to: 'posts#show'
  post '/posts', to: 'posts#create'
  patch '/posts/:id', to: 'posts#update'
  delete '/posts/:id', to: 'posts#destroy'
  
  # post_comments
  get '/post-comments', to: 'post_comments#index'
  post '/post-comments', to: 'post_comments#create'
  patch '/post-comments/:id', to: 'post_comments#update'
  delete '/post-comments/:id', to: 'post_comments#destroy'
  
  # Sessions Controller
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end