class Connect {
  autoPay = true
  baseCost = 40000
  city = null
  cost = null
  front = 0

  id = null
  interestDue = 0
  interestRate = .01
  loan = 0
  maxFront = null
  minimumOrder = null
  paidToday = 0
  state = null
  supply = null
  wholesalePrice = null

  calculateInterest(){
    this.interestDue = Math.round(this.loan * this.interestRate)
  }

  constructor(id){
    let where = geography.fetchRandom()
    this.city = where.city
    this.state = where.state
    this.cost = game.drugs.regionalWholesale[this.city] * (1 + (.1 * Math.floor(Math.random() * (3 - -3 + 1) + -3)))
    this.wholesalePrice = Number(this.cost * (1 - (Math.floor(Math.random() * (15 - 5 + 1) + 5) * .01)))
    this.id = id
    this.minimumOrder = Math.floor(Math.random() * (10 - 1 + 1) + 1)
    this.maxFront = this.minimumOrder
    this.supply = Math.floor(Math.random() * (100 - 10 + 1) + 10)
  }

  doAutoPay(){
    
  }
  payLoan(amount){
    if (game.cash[this.city] < amount && game.money < amount){
      ui.error("You don't have enough money or cash to pay $" + amount)
      return
    } else if (this.loan < amount) {
      ui.error ("Your loan isn't as high as $" + amount)
      return
    }
    this.loan -= amount
    this.paidToday += amount
    this.calculateInterest()
    if (this.loan < 1){
      this.front = 0
      this.front++
      if (this.front > this.supply){
        this.front = this.supply
      }
    }
    if (game.cash[this.city] >= amount){
      game.cash[this.city] -= amount
      return
    }

    game.money -= amount
  }

  resupply(){
    let shipment = 0
    if (Math.floor(Math.random() * (10 - 1 + 1) + 1) == 1){
      shipment = this.supply * (1 - (Math.floor(Math.random() * (99 - 90) + 90) * .01))
    }
    shipment = shipment.toFixed(1)
    this.supply += Number(shipment)
  }

}
