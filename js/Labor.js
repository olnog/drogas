class Labor {
  baseWage = 150
  forthright = null
  id = null
  beingInvestigated = false
  role = null
  wage = null
  city =  null
  rat = null
  state = null
  split = null
  unavailable = false

  constructor(role, city){
    let roles = ['dealer', 'runner', 'dealer']
    this.role = roles[Math.floor(Math.random() * (roles.length - 1 - 0 + 1) + 0)]
    if (role != null){
      this.role = role
    }

    let where = geography.fetchRandom()
    this.city = where.city
    this.state = where.state
    if (city != null){
      this.city = city
    }
    if (this.role == 'runner'){
      this.wage = this.baseWage * (1 + (.1 * Math.floor(Math.random() * (3 - -3 + 1) + -3)))
    } else if (this.role == 'dealer'){
      this.split = Math.floor(Math.random() * (49 - 10 + 1) + 10)
    }
    this.forthright = Math.floor(Math.random() * (2 - 1 + 1) + 1)
    this.rat = false
    if (Math.floor(Math.random() * (10 - 1 + 1) + 1) == 1){
      this.rat = true
    }
  }
}
