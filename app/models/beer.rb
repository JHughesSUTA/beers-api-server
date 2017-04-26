class Beer < ApplicationRecord
  validates :name, presence: true
  validates :style, presence: true
  validates :alcohol, presence: true
end
