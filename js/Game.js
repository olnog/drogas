class Game {
  contractors = new Contractor()
  dealer = new Dealer()
  drugs = new Drug()
  employees = new Employee()
  runner = new Runner()
  cash = {}
  connects = []
  day = 1
  minuteIncrement = 5
  money = 10000
  numOfConnects = 1
  numOfEmployees = 4
  story = []
  time = {hour: 9, minute: 0}

  constructor(){
    let cities = geography.fetchCities()
    for (let i = 0; i < 10; i++){
      this.cash[cities[i]] = 0
    }
  }

  incrementTime(){
    this.time.minute += this.minuteIncrement
    if (this.time.minute > 59){
      this.time.hour++
      this.time.minute = 0
    }
    if (this.time.hour > 23){
      this.nextDay()
      this.time.hour = 0

    }
  }

  init(){
    for (let i = 1; i <= this.numOfConnects; i++){
      this.connects.push(new Connect(i))
    }
    this.contractors.spawn('runner', this.connects[0].city)
    this.contractors.spawn('dealer', this.connects[0].city)

    let howManyContractors = this.contractors.labor.length
    for (let i = howManyContractors + 1; i <= this.numOfEmployees; i++){
      this.contractors.spawn('dealer', null)

    }
    this.drugs.front(0, this.connects[0].maxFront)

  }

  isThereAnythingHere(cityName){
    for (let employee of this.employees.labor){
      if (employee.city == cityName){
        return true
      }
    }
    return (this.cash[cityName] > 0 || this.drugs.inv[cityName] > 0)
  }

  loop(){
    game.incrementTime()
    for (let connect of game.connects){
      connect.doAutoPay()
    }
    game.dealer.allSell()
    game.dealer.coolOff()
    game.runner.allRun()
    ui.refresh()
  }

  nextDay(){
    let story = ""
    for (let employeeID in this.story ){
      this.story.splice(employeeID, 1)
      story += this.story[employeeID] + " "
      this.employees.labor[employeeID].unavailable = false

    }
    if (story != ""){
      ui.status(story)
    }

    for (let connect of this.connects){
      connect.resupply()
      if (connect.paidToday < connect.interestDue){
        ui.status("You missed a payment. GAME OVER")
      }
      connect.paidToday = 0
    }
    for (let city of geography.fetchCities()){
      this.dealer.weight.perCityToday[city] = 0
      for (let section of geography.fetchSections()){
        this.dealer.weight.perSectionToday[city][section] = 0
      }
    }
    this.day++
  }






}
