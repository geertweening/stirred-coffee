window.Dish = class Dish
  constructor: (rawDescription="") ->
    [all, @title, @price] = @parseRawDescription rawDescription
    @price = new Money @price
    
  parseRawDescription: (rawDescription) ->
    pattern = ///
      ([^$]+)       # Title
      (\$\d+\.\d+)  # Price
    ///
    result = rawDescription.match pattern
    r.trim() for r in result
    
  toJSON: -> { @title, price: @price.toString() }
    
window.Money = class Money
  constructor: (rawString='') ->
    @cents = @parseCents rawString
    
  parseCents: (rawString) ->
    [dollars, cents] = (rawString.match /(\d+)/g) ? [0,0]
    +cents + 100*dollars
    
  toString: ->
    printCents = @cents % 100
    if printCents < 10
      "$#{Math.floor(@cents / 100)}.0#{printCents}"
    else
      "$#{Math.floor(@cents / 100)}.#{printCents}"
      
window.Meal = class Meal
  constructor: ->
    @dishes = []
    
  add: (dishes...) -> @dishes.push dishes...
  
  totalPrice: ->
    total = new Money
    total.cents = total.cents + dish.price.cents for dish in @dishes
    total
    
  toJSON: ->
    price: @totalPrice().toString()
    dishes: dish.toJSON() for dish in @dishes