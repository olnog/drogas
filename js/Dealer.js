class Dealer{
  dealing = []
  fails = []
  heat = {}
  maxStrikes = 3
  rep = []
  strikes = {}
  weight = {
    allowedPerSectionToday:{},
    perCity: {},
    perCityToday: {},
    perSection: {},
    perSectionToday: {},

  }
  police = { today: {}, tomorrow: {} }
  where = []
  constructor(){
    let cities = geography.fetchCities()
    for (let i in cities){
      let wheres = ['east', 'north', 'south','west']
      this.heat[cities[i]] = { east: 0, west: 0, north: 0, south: 0}
      this.strikes[cities[i]] = { east: 0, west: 0, north: 0, south: 0}
      this.weight.perCity[cities[i]] = 0
      this.weight.perCityToday[cities[i]] = 0
      this.weight.perSection[cities[i]] = { east: 0, west: 0, north: 0, south: 0}
      this.weight.perSectionToday[cities[i]] = { east: 0, west: 0, north: 0, south: 0}
      this.police.today[cities[i]] = { east: false, west: false,
        north: false, south: false}
      this.police.tomorrow[cities[i]] = { east: false, west: false,
        north: false, south: false}
      this.weight.allowedPerSectionToday[cities[i]] = {}
      for (let where of wheres){
        this.weight.allowedPerSectionToday[cities[i]][where]
          = Math.floor(Math.random() * (1000 - 1 + 1) + 1)
      }

    }
  }

  addWeight(city, section, weight){
    this.weight.perCity[city] += parseFloat((weight * 1000).toFixed(1))
    this.weight.perCityToday[city] += parseFloat((weight * 1000).toFixed(1))
    this.weight.perCityToday[city] = parseFloat(this.weight.perCityToday[city].toFixed(1))
    this.weight.perSection[city][section] += parseFloat((weight * 1000).toFixed(1))
    this.weight.perSectionToday[city][section] += parseFloat((weight * 1000).toFixed(1))
    this.weight.perSectionToday[city][section] = parseFloat(this.weight.perSectionToday[city][section].toFixed(1))
  }

  allSell(){
    let dealersDealing = this.fetch()
    for (let i in dealersDealing){
      this.sell(dealersDealing[i])
    }
  }

  anyoneDealingHere(city, where){
    for (let employeeID in this.dealing){
      if (!this.dealing[employeeID]){
        continue
      }
      if (this.where[employeeID] == where
        && game.employees.labor[employeeID].city == city){
          return true
      }
    }
    return false
  }

  areTheyCaught(employeeID){
    let randChance = Math.floor(Math.random() * (100 - 1 + 1) + 1)
    return this.fetchHeat(employeeID) >= randChance
  }

  arrest(employeeID){
    let employee = game.employees.labor[employeeID]
    this.strikes[employee.city][this.where[employeeID]]++
    ui.status("Your dealer in  " + this.where[employeeID] + " " + employee.city
    + " is attracting police attention where they're selling. ("
    + this.strikes[employee.city][this.where[employeeID]] + "/" + this.maxStrikes + ")")
    if (this.strikes[employee.city][this.where[employeeID]] >= this.maxStrikes){
      game.employees.labor[employeeID].unavailable = true
      this.stop(employeeID)
      ui.status("Your dealer in " + this.where[employeeID] + " " + employee.city + " was arrested.")
    }
  }

  changeWhere(employeeID, newArea){
    this.where[employeeID] = newArea
  }

  coolOff(){
    for (let city in this.heat){
      for (let where in this.heat[city]){
        if (!this.anyoneDealingHere(city, where) && this.heat[city][where] > 0
          && Math.floor(Math.random() * (this.heat[city][where] - 1 + 1) + 1) == 1){
          this.heat[city][where] -= game.minuteIncrement
          if (this.heat[city][where]){
            this.heat[city][where] = 0
          }
        }
      }
    }
  }
  deal(employeeID){
    let employee = game.employees.labor[employeeID]
    let min = .0001
    let max = .003
    if (max > game.drugs.inv[employee.city]){
      max = game.drugs.inv[employee.city]
    }
    let amountSold = parseFloat(((Math.random() * (max - min) + min)
      * game.minuteIncrement).toFixed(4))
    let cashIncrease = Number(parseFloat((game.drugs.regionalRetail[employee.city]
    * amountSold).toFixed(2)) * ( 1 - (employee.split
    / 100)))
    game.drugs.inv[employee.city] -= amountSold
    game.drugs.inv[employee.city] = game.drugs.inv[employee.city].toFixed(4)
    this.addWeight(employee.city, this.where[employeeID], amountSold)
    game.cash[employee.city] += cashIncrease
    $(".cashInCity-" + geography.fetchCities().indexOf(employee.city)).html(parseFloat(game.cash[employee.city].toFixed(2)).toLocaleString())
    $(".drugsInCity-" + geography.fetchCities().indexOf(employee.city)).html(game.drugs.inv[employee.city])
    ui.displaySold(employeeID, cashIncrease, amountSold)
  }

  despawn(employeeID){
    this.dealing.splice(employeeID, 1)
    this.rep.splice(employeeID, 1)
    this.fails.splice(employeeID, 1)
    this.where.splice(employeeID, 1)
  }

  fetch(){
    let whoIsDealing = []
    for (let i in this.dealing){
      if (this.dealing[i]){
        whoIsDealing.push(i)
      }
    }
    return whoIsDealing
  }

  fetchHeat(employeeID){
    return this.heat[game.employees.labor[employeeID].city][this.where[employeeID]]
  }

  sell(employeeID){
    let employee = game.employees.labor[employeeID]
    let didTheySell = Math.floor(Math.random() * (10 - 1 + 1) + 1)
    if (this.rep[employeeID] >= didTheySell){
      if (Math.floor(Math.random() * (1000 - 1 + 1) + 1) == 1){
        game.employees.event(employeeID)
        if (ui.currentTab == 'map'){
          ui.display('map')
        }
        return
      }
      if (this.weight.perSectionToday[employee.city][this.where[employeeID]]
        >= this.weight.allowedPerSectionToday[employee.city][this.where[employeeID]]
        && !this.police.tomorrow[employee.city][this.where[employeeID]]){
        ui.status("There seems to be more police presence in the "
          + this.where[employeeID] + " part of " + employee.city)
        this.police.tomorrow[employee.city][this.where[employeeID]] = true
      }
      this.deal(employeeID)
    } else {
      this.fails[employeeID]++
    }
    if (this.fails[employeeID] >= 100 && this.rep[employeeID] < 10){
      this.rep[employeeID]++
      this.fails[employeeID] = 0
    }
    if (game.drugs.inv[employee.city] == 0){
      this.dealing[employeeID] = false
    }
    if (ui.currentTab == 'map' && this.rep[employeeID] >= didTheySell){
      ui.display('map')
    }
  }

  spawn(employeeID){
    let wheres = ['east', 'west', 'south', 'north']
    this.dealing[employeeID] = false
    this.rep[employeeID] = 1
    this.fails[employeeID] = 0
    this.where[employeeID] = wheres[Math.floor(Math.random() * (this.where.length - 1 - 0 + 1) + 0)]
  }

  start(employeeID){
    this.dealing[employeeID] = true
  }

  stop(employeeID){
    this.dealing[employeeID] =  false
  }


}
