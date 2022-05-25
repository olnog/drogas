class Drug{
  avgCost = {}
  baseRetail = 100000
  baseWholesale = 40000
  inv = {}
  regionalRetail = {}
  regionalWholesale = {}


  avg(){

  }

  constructor(){
    let cities = geography.fetchCities()
    for (let i = 0; i < cities.length; i++){
      this.avgCost[cities[i]] = 0
      this.inv[cities[i]] = 0
      this.regionalRetail[cities[i]] = this.baseRetail * (1 + (.1 * Math.floor(Math.random() * (3 - -3 + 1) + -3)))
      this.regionalWholesale[cities[i]] = this.baseWholesale * (1 + (.1 * Math.floor(Math.random() * (3 - -3 + 1) + -3)))
    }
  }

  buy (connectID, amount){
    amount = Number(amount)
    let connect = game.connects[connectID]
    if (game.cash[connect.city] < amount
      && game.money < connect.cost * amount){
      ui.error("You don't have enough cash here or money in your account to buy this.")
      return
    } else if (amount > connect.supply){
      ui.error("They can't supply you with this much.")
      return
    }
    if (!ui.openMap){
      ui.openMap = true
    }
    if (game.cash[connect.city] >= amount){
      game.cash[connect.city] -= connect.cost * amount
    } else {
      game.money -= connect.cost * amount
    }

    this.inv[connect.city] += amount

    if (this.avgCost[connect.city] == 0 ){
      this.avgCost[connect.city] = connect.cost
    }
    game.connects[connectID].supply -= amount
  }

  front(connectID, amount){
    console.log('hello')
    amount = Number(amount)
    let connect = game.connects[connectID]
    if (connect.front + amount  > connect.maxFront){
      ui.error("You aren't able to be fronted this much.")
      return
    }
    if (!ui.openMap){
      ui.openMap = true
    }
    this.inv[connect.city] += amount
    if (this.avgCost[connect.city] == 0 ){
      this.avgCost[connect.city] = connect.cost
    }
    game.front += amount
    game.connects[connectID].loan += amount * connect.cost
    game.connects[connectID].calculateInterest()
    game.connects[connectID].supply -= amount
    ui.status("You now owe your connect in " + connect.city + " a minimum of $"
      + connect.interestDue.toLocaleString() + " every day.")
  }

  lose(amount){
  }

  sell(connectID, amount){
    amount = Number(amount)
    let connect = game.connects[connectID]
    if (game.drugs.inv[connect.city] < amount){
      ui.error("You don't have that amount of drugs to sell.")
      return
    }
    game.drugs.inv[connect.city] -= amount
    game.cash[connect.city] += Number((connect.wholesalePrice * amount).toFixed(2))
    if (game.drugs.inv[connect.city] == 0){
      game.drugs.avgCost[connect.city] = 0
    }
  }
}
