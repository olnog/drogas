class Runner{
  holding = {cash: [], drugs: []}
  maxDrugsHeld = 10
  maxCashHeld = 1000000
  running = []


  allRun(){
    for (let i in this.running){
      let time = this.running[i].time
      if (time>59){
        time = (time / 60).toFixed(2) + "h"
      } else {
        time = time + "m"
      }
      $("#traveling-" + i).html(time)
      this.running[i].time -= game.minuteIncrement

      if (this.running[i].caught && this.running[i].caughtWhen >= this.running[i].time){
        game.runner.caught(i)
        if (this.running[i] == undefined){
          ui.display(ui.currentTab)
        }
      }
      if (this.running[i] != undefined && this.running[i].time <= 0){
        game.employees.labor[i].city = this.running[i].to
        this.running.splice(i, 1)
        if (ui.currentTab == 'map'){
          ui.display('map')
        }
      }
    }
  }

  caught(employeeID){
    let cashStatus = "", drugStatus = "", letGo = ""
    let employee = game.employees.labor[employeeID]
    let status = "Your runner heading to " + this.running[employeeID].to
      + " was stopped by law enforcement."
    if (this.holding.drugs[employeeID] != undefined
      && this.holding.drugs[employeeID] > 0){
      status += " They found the drugs and placed them under arrest."
      game.employees.arrest(employeeID)
      drugStatus  = this.holding.drugs[employeeID] + " kilos."
      game.drugs.lose(this.holding.drugs[employeeID])
      this.holding.drugs.splice(employeeID, 1)
    } else {
      letGo = " But since they weren't carrying any drugs, they had to let them go."
    }
    if (this.holding.cash[employeeID] != undefined
      && this.holding.cash[employeeID] > 0){
      cashStatus = "$" + (this.holding.cash[employeeID]).toLocaleString()
      this.holding.cash.splice(employeeID, 1)
    }
    if (cashStatus != "" || drugStatus != ""){
      status += "They siezed "
      status += cashStatus
      if (cashStatus != "" && drugStatus != ""){
        status += " and "
      }
      status += drugStatus + "."
    }
    ui.status(status + letGo)
  }

  despawn(employeeID){
    if (this.running[employeedID] != undefined){
      this.running.splice(employeeID, 1)
    }
  }

  drops(employeeID, amount, type){
    let employee = game.employees.labor[employeeID]
    if (this.holding[type][employeeID] < amount){
      ui.error("You aren't holding that much.")
      return
    }

    this.holding[type][employeeID] -= amount
    if (type == 'drugs'){
      game.drugs.inv[employee.city] += amount
      return
    }
    game[type][employee.city] += amount
  }

  fetch(){
    let runnersRunning = []
    for (let i in running){
      runnersRunning.push(i)
    }
    return runnersRunning
  }

  holds(employeeID, amount, type){
    amount = Number(amount).toFixed(1)
    let employee = game.employees.labor[employeeID]
    let thingBeingPickedUp = null
    if (type == 'drugs'){
      thingBeingPickedUp = game.drugs.inv[employee.city]
    } else {
      thingBeingPickedUp = game[type][employee.city]
    }

    if (employee.role != 'runner'){
      ui.error("They are not a runner. ")
      return
    } else if (thingBeingPickedUp < amount){
      ui.error("Can't pick that much up. Sorry.")
      return
    }

    if (type == 'drugs'){
      if (Number(this.holding[type][employeeID]) + Number(amount) > this.maxDrugsHeld){
        game.drugs.inv[employee.city] -= Number(this.maxDrugsHeld - amount)
        this.holding[type][employeeID] = Number(this.maxDrugsHeld)
        return
      }
      this.holding[type][employeeID] += Number(amount)
      game.drugs.inv[employee.city] -= Number(amount)
      return
    }
    if (Number(this.holding[type][employeeID]) + Number(amount) > this.maxCashHeld){
      game[type][employee.city] -= Number(this.maxCashHeld - amount)
      this.holding[type][employeeID] = Number(this.maxCashHeld)
      return
    }
    game[type][employee.city] -= Number(amount)
    this.holding[type][employeeID] += Number(amount)
  }

  spawn(employeeID){
    this.holding.cash[employeeID] = 0
    this.holding.drugs[employeeID] = 0
  }

  run(employeeID, cityName, type){
    if (this.running[employeeID] != undefined ){
      ui.error("They're already headed somewhere right now.")
      return
    }
    let employee = game.employees.labor[employeeID]
    let travel = geography.fetchTravel(game.employees.labor[employeeID].city, cityName)
    let cost = Number(travel.drive * employee.wage).toFixed(2)
    if (type == 'flight'){
      cost = Number((travel.flight * employee.wage ) + travel.ticket).toFixed(2)
    }
    if (game.money < ((travel.flight * employee.wage ) + travel.ticket).toFixed(2)){
      ui.error("You don't have enough money.")
      return
    }
    game.money -= cost
    let maxChance = 10
    if (type == 'drive'){
      maxChance = 100
    }
    console.log(maxChance)
    let wereTheyCaught = Math.floor(Math.random() * (maxChance - 1 + 1) + 1) == 1
    let whenWereTheyCaught = Math.floor(Math.random() * ((travel[type] * 60) - 1 + 1) + 1)
    this.running[employeeID] = {time: travel[type] * 60,  to: cityName,
      caught: wereTheyCaught, caughtWhen: whenWereTheyCaught}
  }
}
