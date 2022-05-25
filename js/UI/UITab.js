class UITabs{
  displayCityAssets(i){
    let cityID = geography.fetchCities().indexOf(i)
    let html = ""
    if(game.drugs.inv[i] > 0 || game.cash[i] > 0){
      html += "<div class='ms-3 mb-2 text-secondary'>"
    }
    if (game.drugs.inv[i] > 0 ){

      html +=  "Drugs: <span class='drugsInCity-" + cityID
        + "'>" + game.drugs.inv[i] + "</span> kilos @ $"
        + game.drugs.avgCost[i].toLocaleString() + "</span> <span id='cityDrugsChange-"
        + geography.fetchCities().indexOf(i) + "'></span>"
    }
    if(game.drugs.inv[i] > 0 && game.cash[i] > 0){
      html += " / "
    }
    if (game.cash[i] > 0){
      html += " Cash: $<span class='cashInCity-" + cityID + "'>"
        + game.cash[i].toLocaleString() + "</span> <span id='cityCashChange-"
        + geography.fetchCities().indexOf(i) + "'></span>"
    }
    if(game.drugs.inv[i] > 0 || game.cash[i] > 0){
      html += "</div>"
    }
    return html
  }

  displayContractors(){
    let html = ""
    let cities = geography.fetchCities()
    for (let n in cities){
      let city = cities[n]
      let cityHeading = "<div class='fw-bold mt-3'>" + city + "</div>"
      for (let i in game.contractors.labor){
        let contractor = game.contractors.labor[i]
        if (contractor.city != city){
          continue
        } else {
          html += cityHeading
          cityHeading = ""
        }
        html += this.displayCityAssets(city)
        html += "<div id='' class='ms-3'><span class='fw-bold text-secondary'>"
          + contractor.role + "</span>"
        if (contractor.role == 'runner'){
          html += " - $" + contractor.wage + " per hour"
        } else if (contractor.role == 'dealer'){
          html += " - min. " + contractor.split + "% split"
        }
        html += "</div><div class='ms-3 mb-2'><button id='hire-" + i
          + "' class='hire btn btn-outline-dark me-1'>hire " + contractor.role + "</button> "

        html += "</div>"
      }
    }
    $("#contractors").html(html)
  }

  displayEmployees(cityName){
    let cities = geography.fetchCities()
    let html = ""
    for (let i in game.employees.labor){
      let employee = game.employees.labor[i]
      if (employee.city != cityName){
        continue
      }
      if (employee.role == 'dealer'){
        //console.log(new UIDealer(employee, i, cityName).html)
        html += new UIDealer(employee, i, cityName).html


      } else if (employee.role == 'runner'){
        html += new UIRunner(employee, i, cityName).html
      }
    }
    return html
  }



  displayMap(){
    let html = ''
    for (let i in game.drugs.regionalRetail){
      if (!game.isThereAnythingHere(i)){
        continue
      }
      html += "<div><span class='fw-bold fs-3'>" + i + "</span> "
        + "<span class='text-secondary'>(Retail: $"
        + game.drugs.regionalRetail[i].toLocaleString() + ")</span>"
      if (game.dealer.weight.perCityToday[i]){
        html += " sold " + game.dealer.weight.perCityToday[i] + "g today"
      }
      html += "</div>"
      html += this.displayCityAssets(i)
      html += "<div>"
      html += this.displayEmployees(i)
      html += "</div>"
    }
    $("#map").html(html)
  }

  fadeout(id){
    if ($("#" + id)){

    }
  }
}
