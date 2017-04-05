json.array! @beers.each do |beer|
  json.id beer.id
  json.name beer.name
  json.style beer.style
  json.alcohol_content beer.alcohol
end
