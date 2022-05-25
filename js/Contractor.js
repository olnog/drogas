class Contractor{
  hireCost = 1000
  labor = []
  neededRole = []
  max = 7

  hire(contractorID){
    if (game.cash[contractors[contractorID]] < this.hireCost && game.money < this.hireCost){
      ui.error("You don't have enough money or cash to hire any contractors.")
    }
    game[this.labor[contractorID].role].spawn(game.employees.labor.length)
    game.employees.labor.push(this.labor.splice(contractorID, 1)[0])
    if (!ui.openMap){
      ui.openMap = true
    }
    if (game.cash[contractors[contractorID]] >= this.hireCost){
      game.cash[contractors[contractorID]] -= this.hireCost
      return
    }
    game.money -= this.hireCost
  }

  spawn(role, city){
    for (let i in this.neededRole){
      if (!this.isThisRoleAvailable(this.neededRole[i]) && role == null){
        role = this.neededRole[i]
        this.neededRole.splice(i, 1)
        break
      }
      this.neededRole.splice(i, 1)
    }
    let spawnSearch = true
    while (spawnSearch){
      spawnSearch = false
      let possEmployee = new Labor(role, city)
      for (let i in this.labor){
        if (this.labor[i] == possEmployee){
          spawnSearch = true
        }
      }
      if (!spawnSearch){
        this.labor.push(possEmployee)
      }
    }
    if (game.contractors.length > this.max
      && game.employees.countRole(this.labor[0].role) > 1){
      this.labor.shift()
    } else {
      this.labor.push(this.labor.shift())
    }
  }
}
