class Api::V2::BeersController < ApplicationController
  def index
    @beers = Beer.all
    render "index.json.jbuilder"
  end

  def create
    @beer = Beer.new(
      name: params[:name],
      style: params[:style],
      alcohol: params[:alcohol]
    )
    if @beer.save
      render "show.json.jbuilder"
    else
      render json: { errors: @beer.errors.full_messages }, status: 422
    end
  end

  def show
    @beer = Beer.find_by(id: params[:id])
    render "show.json.jbuilder"
  end

  def update
    @beer = Beer.find_by(id: params[:id])
    @beer.name = params[:name] || @beer.name
    @beer.style = params[:style] || @beer.style
    @beer.alcohol = params[:alcohol] || @beer.alcohol
    @beer.save
    render "show.json.jbuilder"
  end

  def destroy
    @beer = Beer.find_by(id: params[:id])
    @beer.destroy
    render json: {message: "The item has been deleted!"}
  end
end
