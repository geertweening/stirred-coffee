(function() {

  describe("Dish", function() {
    beforeEach(function() {
      return this.dish = new Dish('Sirloin Steak $18.99 main');
    });
    it("extracts title", function() {
      return expect(this.dish.title).toEqual('Sirloin Steak');
    });
    return it("extracts price", function() {
      return expect(this.dish.price.cents).toEqual(1899);
    });
  });

  describe("Money", function() {
    return describe("valid value", function() {
      beforeEach(function() {
        this.money = new Money('$15.99');
        return this.money2 = new Money('$9.09');
      });
      it("parses to cents", function() {
        return (expect(this.money.cents)).toEqual(1599);
      });
      it("formats to string", function() {
        return (expect(this.money.toString())).toEqual('$15.99');
      });
      it("formats to string with leading 0 for cents", function() {
        return (expect(this.money2.toString())).toEqual('$9.09');
      });
      return describe("invalid value", function() {
        return it("sets cents to zero if a valid value can't be parsed", function() {
          var money;
          money = new Money('NOT A MONETARY VALUE');
          return (expect(money.cents)).toEqual(0);
        });
      });
    });
  });

  describe("Meal", function() {
    beforeEach(function() {
      this.donut = new Dish('Maple Bacon Donut $1.99');
      return this.fish = new Dish('Salmon Filet $14.99');
    });
    return describe("blank object", function() {
      beforeEach(function() {
        return this.meal = new Meal;
      });
      it("adds a single dish", function() {
        this.meal.add(this.donut);
        return (expect(this.meal.dishes.length)).toEqual(1);
      });
      it("adds two dishes", function() {
        this.meal.add(this.donut, this.fish);
        return (expect(this.meal.dishes.length)).toEqual(2);
      });
      return it("calculates the total price", function() {
        this.meal.add(this.donut, this.fish);
        return (expect(this.meal.totalPrice().cents)).toEqual(1698);
      });
    });
  });

}).call(this);
