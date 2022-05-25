class UIRunner{
  html = ""
  constructor(employee, i, cityName){
    let cities = geography.fetchCities()
    let bgCSS = "background-color:mintcream;"
    if (game.runner.running[i] != undefined){
      bgCSS = 'background-color:lightgreen;'
    } else if (game.runner.holding.drugs[i] != undefined
      || game.runner.holding.cash[i] != undefined){
      bgCSS = 'background-color:ivory;'
    }
    let html = "<div id='' class='ms-3 p-1 ps-3 mb-3 card' style='" + bgCSS + "'>"
    html += "<div class=''><span class='fw-bold'>Runner</span> (<span class='text-secondary'>"
    if (game.runner.running[i] != undefined){
      html += "moving from "
    }
    html += employee.city
    if (game.runner.running[i] != undefined){
      html += " to " + game.runner.running[i].to
    }
    html += "</span>)"
    if (game.runner.running[i] == undefined){
      html += "<button id='fireEmployee-" + i
      + "' class='fireEmployee btn btn-outline-danger  ms-3 float-end'>fire</button>"
    }
      + "</div><div><span class='text-decoration-underline'>$"
      + employee.wage + " per hour </span>"
    if (game.runner.running[i] != undefined){
      html += " <span id='traveling-" + i + "' class=''></span>"
    }
    html += "</div>"
    let holding = "<div>"
    if (game.cash[employee.city] >= 1000 || ( game.runner.holding.cash[i] > 0)){
      let cashMax = game.runner.maxCashHeld - game.runner.holding.cash[i]
      if (game.cash[employee.city] < cashMax){
        cashMax = game.cash[employee.city]
      }
      console.log(cashMax.toLocaleString())
      if (game.cash[employee.city] >= 1000 && game.runner.running[i] == undefined
        && cashMax > 0){
        holding += "How much cash do you want them to move?"
        + "$<input id='runnerHoldsCashAmount-"
        + i + "' type='number' min=1000 max=" + cashMax
        + " value='1000' step='1000' class='text-start' style='width:100px;'>"
        + "<button id='runnerHoldsCash-" + i
        + "' class='runnerHoldsCash btn btn-outline-secondary ms-3'>take</button>"
        + "<button id='runnerHoldsAllCash-" + i
        + "' class='runnerHoldsAllCash btn btn-outline-secondary ms-3'>take all</button>"
      }
      if (game.runner.holding.cash[i] != undefined && game.runner.holding.cash[i] > 0){
        let holdingCaption = " Moving: "
        if (game.runner.running[i] == undefined){
          holdingCaption = " Holding: "
        }
        holding += holdingCaption + " $" + (game.runner.holding.cash[i]).toLocaleString()
        if (game.runner.running[i] == undefined){
          holding += "<button id='runnerDropsCash-" + i
            + "' class='runnerDropsCash btn btn-outline-warning ms-3'>drop</button>"
        }
      }
    }
    holding += "</div><div>"
    if (game.drugs.inv[employee.city] > 0 || (game.runner.holding.drugs[i] > 0)){
      let drugsMax = game.runner.maxDrugsHeld - game.runner.holding.drugs[i]
      if (game.drugs.inv[employee.city] < drugsMax){
        drugsMax = game.drugs.inv[employee.city]
      }
      if (game.drugs.inv[employee.city] > 0 && game.runner.running[i] == undefined
        && drugsMax > 0){
        let minValue = 1
        if (game.drugs.inv[employee.city] < 1){
          minValue = game.drugs.inv[employee.city] < 1
        }
        holding += "How many kilos do you want them to move?<input id='runnerHoldsDrugsAmount-"
        + i + "' type='number' min=.1 max=" + drugsMax
        + " value=" + minValue + " step='.1' class='ms-2 text-center' style='width:75px;'>"
        + "<button id='runnerHoldsDrugs-" + i
        + "' class='runnerHoldsDrugs btn btn-outline-dark ms-3'>take</button>"
        + "<button id='runnerHoldsAllDrugs-" + i
        + "' class='runnerHoldsAllDrugs btn btn-outline-dark ms-3'>take all</button>"
      }
      if (game.runner.holding.drugs[i] != undefined && game.runner.holding.drugs[i] > 0){
        let holdingCaption = " Moving: "
        if (game.runner.running[i] == undefined){
          holdingCaption = " Holding: "
        }
        holding += holdingCaption + game.runner.holding.drugs[i] + " kilos"
        if (game.runner.running[i] == undefined){
          holding += "<input id='runnerDropDrugsAmount-" + i +"' type='number' min='.1' max="
            + game.runner.holding.drugs[i] +" value="
            + game.runner.holding.drugs[i] + " step=.1 style='width:100px; text-align:center;'><button id='runnerDropsDrugs-" + i
            + "' class='runnerDropsDrugs btn btn-outline-warning ms-3'>drop</button>"
        }
      }
    }
    holding += "</div>"
    let transpo = "<div class='ms-3'>"
      + "<span class='text-secondary fw-bold'>Destination:</span>"
    for (let city in cities){
      if (cities[city] == cityName){
        continue
      }
      transpo += "<label  id='runnerCity-" + i + "-"
        + cities.indexOf(cities[city])
        + "' class='runnerCity ms-1 me-1'>"
        + "<input name='runnerCity-" + i + "' value='"
        + cities[city] + "' type='radio' autocomplete='off'> "
        +  cities[city] +  "</label>"
    }
    transpo += "<button id='runnerRuns-" + i
      + "-drive' class='runnerRuns btn btn-outline-danger ms-3  me-3 -"
      + i + "' disabled>drive</button><button id='runnerRuns-" + i
      + "-flight' class='runnerRuns btn btn-outline-danger me-3 travelRunner-"
      + i + "' disabled>fly</button></div>"
    if (game.runner.running[i] == undefined){
      html += holding + transpo
    } else {
      html += holding
    }
    html += "</div>"
    this.html = html
  }
}
