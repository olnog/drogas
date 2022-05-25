class UIDealer{
  html = ""
  constructor(employee, i, cityName){
    let bgCSS = "background-color:mintcream;"
    if (!game.dealer.dealing[i]){
      bgCSS = 'background-color:lightgreen;'
    }
    let html =  "<div id='' class='ms-3 p-1 ps-3  mb-3 card style='" + bgCSS + "''>"
    html += "<div class='row'><div class='col-3'><span class='fw-bold'>Dealer<span> (<span class='text-secondary'>"
      + employee.city + "</span>)"

    if (!game.dealer.dealing[i] && !employee.unavailable){
     html += "<button id='fireEmployee-" + i
     + "' class='fireEmployee btn btn-outline-danger float-end'>fire</button>"
    }
    html +=  " " + employee.split + "% split"
    if (employee.unavailable){
      html += "<span class='text-decoration-underline text-secondary'>[unavailable]</span>"
    }
    html += "</div><div class='col'>"
    if (game.dealer.dealing[i]){
      html += "<span id='dealerDealing-" + i
        + "' class='text-decoration-underline'>dealing in "
        + game.dealer.where[i] + " " + employee.city
        + "<span id='dealingAnimation-" + i + "'></span></span>"
    }
    html += "</div></div>"
    if (employee.unavailable){
      this.html = html
      return
    }
    html += "<div class='ms-3'>"
    html += this.displayWhere(i)
    let disabledStatus = ' disabled '
    if (game.drugs.inv[cityName] != undefined && game.drugs.inv[cityName] > 0){
      disabledStatus = ''
    }
    let dealButton = "<button id='deal-" + i
      + "' class='deal btn btn-outline-success me-3 ms-3' " + disabledStatus
      + ">deal</button>"
    if (game.dealer.dealing[i]){
      dealButton = "<button id='stopDealing-" + i
        + "' class='stopDealing btn btn-outline-warning me-3 ms-3'>stop</button>"
    }

    html += dealButton

    if (game.dealer.weight.perSectionToday[cityName][game.dealer.where[i]] > 0){
      let sectionTodayClass = ''
      console.log(game.dealer.weight.allowedPerSectionToday[cityName][game.dealer.where[i]])
      if (game.dealer.weight.perSectionToday[cityName][game.dealer.where[i]]
        > game.dealer.weight.allowedPerSectionToday[cityName][game.dealer.where[i]]){
          sectionTodayClass = ' text-danger '
        }
      html += "<div class='" +  sectionTodayClass + "'>sold "
        + game.dealer.weight.perSectionToday[cityName][game.dealer.where[i]]
        + "g here today </div>"
    }
    html += "</div><div class='ms-4'>Reputation:</div>"
      +"<div class='progress ms-4'><div class='progress-bar bg-success' "
      + " role='progressbar' style='width: " + (game.dealer.rep[i] / 10 * 100)
      + "%' aria-valuenow='25' aria-valuemin='0' aria-valuemax='100'></div></div>"
      + "<div class='ms-4'>Heat ("
      + game.dealer.strikes[cityName][game.dealer.where[i]] + "/"
      + game.dealer.maxStrikes +  "):</div>"
      +"<div class='progress ms-4'><div class='progress-bar bg-danger' "
      + " role='progressbar' style='width: " + (game.dealer.fetchHeat(i))
      + "%' aria-valuenow='25' aria-valuemin='0' aria-valuemax='100'></div></div>"
    html += "</div>"
    this.html =  html

  }

  displayWhere(employeeID){
    let html = ""
    let wheres = ['east', 'west', 'south', 'north']
    for (let i in wheres){
      let buttonColor = ' btn-outline-dark '
      let disabledStatus = ''
      if (game.dealer.where[employeeID] == [wheres[i]]){
        buttonColor = ' btn-outline-success '
        disabledStatus = ' disabled '
      }
      let buttonCaption = "<button id='dealerWhere-" + employeeID
        + "-" + wheres[i] + "' class='dealerWhere btn " + buttonColor + "' " + disabledStatus
        + ">" + wheres[i] + "</button>"
      html += buttonCaption
    }
    return html
  }
}
