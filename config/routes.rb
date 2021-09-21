Rails.application.routes.draw do
  # users
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  patch '/users/:id', to: 'users#update'
  delete '/users/:id', to: 'users#destroy'

  # Sessions Controller
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end