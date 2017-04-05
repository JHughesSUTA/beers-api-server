50.times do 
  Beer.create(
    name: Faker::Beer.name,
    style: Faker::Beer.style,
    alcohol: Faker::Beer.alcohol
  )
end

puts "done"