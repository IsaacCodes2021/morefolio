# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(username: "isaac", password: "password", email:"isaac.businessiq@gmail.com" profile_img:"https://pbs.twimg.com/profile_images/1399138406525927424/ev5NY5pW_400x400.jpg")
puts "seeded me"
puts "seeding my initial portfolio"
PortfolioItem.create(ticker: "ETC/USD", purchase_date: nil, purchase_price:54.08, quantity:5, user_id: User.first[:id])
PortfolioItem.create(ticker: "SQQQ", purchase_date: nil, purchase_price:7.32, quantity:500, user_id: User.first[:id])

