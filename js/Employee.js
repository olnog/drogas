class Employee{

  labor = []
  arrest(employeeID){
    game[this.labor[employeeID].role].despawn(employeeID)
    if (!game.contractors.neededRole.incudes(this.labor[employeeID].role)){
      game.contractors.neededRole.push(this.labor[employeeID].role)
    }
    this.labor.splice(employeeID, 1)
  }

  event(employeeID){
    let employee = this.labor[employeeID]
    if (game.dealer.dealing[employeeID]){
      game.dealer.dealing[employeeID] = false
    }
    this.labor[employeeID].unavailable = true
    let beingInvestigated = Math.floor(Math.random() * (3 - 1 + 1) + 1) == 1
    this.labor[employeeID].beingInvestigated = beingInvestigated
    game.story[employeeID] = this.story(employeeID, employee.forthright, employee.rat, beingInvestigated)
  }

  fire(employeeID){
    let employee = this.labor[employeeID]
    for (let i in game.runner.holding){
      if (employee.role == 'runner'){
        if (i == 'drugs'){
          game.drugs.inv[employee.city] += game.runner.holding[i][employeeID]
        } else if (i == 'cash'){
          game.cash[employee.city] += game.runner.holding[i][employeeID]
        }
        game.runner.holding[i].splice(employeeID, 1)
      }
    }
    if (employee.role=='dealer'){
      game.dealer.dealing.splice(employeeID, 1)
      game.dealer.rep.splice(employeeID, 1)
      game.dealer.fails.splice(employeeID, 1)
    }
    let contractor = this.labor.splice(employeeID, 1)
    if (game.contractors.labor.length < game.contractors.max){
      game.contractors.labor.push(contractor[0])
    }
  }


  countRole(role){
    let n = 0
    for (let i in this.labor){
      if (this.labor[i].role == role){
        n++
      }
    }
    for (let i in game.contractors.labor){
      if (game.contractors.labor[i].role == role){
        n++
      }
    }
    return n
  }
  isThisRoleAvailable(role){
    for (let i in this.labor){
      if (this.labor[i].role == role){
        return true
      }
    }
    for (let i in game.contractors.labor){
      if (game.contractors.labor[i].role == role){
        return true
      }
    }
    return false
  }

  story(employeeID, forthright, rat, beingInvestigated){
    if (forthright && !rat && beingInvestigated){
      return "Employee #" + employeeID + " lets you know they were pulled in "
        + "by police for questioning but they reassure you that they are not "
        + " a rat."
    }
    return "Employee #" + employeeID + " apologizes and lets you know they were in a "
    + "car accident and that's why they were unavailable yesterday."
  }
}
