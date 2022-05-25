class UIConnects{
display(){
    let html = ""
    let cities = geography.fetchCities()
    for (let n in cities){
      let city = cities[n]
      let cityHeading = "<div class=''><span class='fw-bold'>" + city
        + "</span> <span class='text-secondary'>(Retail: $"
        + game.drugs.regionalRetail[city].toLocaleString() + ")</span></div>"
      for (let i in game.connects){
        let connect = game.connects[i]
        if (connect.city != city){
          continue
        } else {
          html += cityHeading
          cityHeading = ""
        }
        html += ui.tabs.displayCityAssets(city)
        let drugCaption = ' kilo '
        if (connect.minimumOrder > 1){
          drugCaption = ' kilos '
        }
        html += "</div><div class='ms-3 text-secondary'><span class='fw-bold'>Wholesaler</span> "
        if (game.money > connect.cost * connect.minimumOrder || connect.front < connect.maxFront || game.drugs.inv[connect.city] > 0 )
        html += "<button id='showBuy-" + i + "' class='showBuy btn btn-link'>[ show ]</button>"
          + "</div>"
        if (connect.interestDue > 0){
          let minPayment = 1000
          if (connect.interestDue < 1000){
            minPayment = connect.interestDue
          }
          let maxPayment = game.money
          if (game.money > connect.loan){
            maxPayment = connect.loan
          }

          html += "<div class='ms-4 text-secondary'>Loan: $"
            + connect.loan.toLocaleString() + " ("
          let interestClass = ' text-danger '
          if (connect.paidToday >= connect.interestDue){
            interestClass = " text-success "
          }
          html += "<span class='" + interestClass + "'>$"
            + connect.paidToday.toLocaleString()
            + "</span> / $" + connect.interestDue.toLocaleString()
            + " due every day)"
          if (game.money > connect.interestDue){
            let payFrom = 'money'
            if (game.cash[connect.city] >= minPayment){
              payFrom = 'cash'
            }
            let autoPayChecked = ''
            if (connect.autoPay){
              autoPayChecked = ' checked '
            }
            html += "<input type='checkbox' class='loanAutoPay-" + i
              + " ms-2 me-1 '" + autoPayChecked
              + " value='" + i + "'> Autopay? <input type='number' id='loanPayment-" + i
              + "' min=" + minPayment + " max=" + maxPayment
              + " step=1000 class='text-center' value='" + minPayment
              + "'><button id='payLoan-" + i
              + "' class='payLoan btn btn-outline-danger'>pay (" + payFrom + ")</button> "
          }
        }
        html += "<div class='ms-4'>"
          + "<span class='text-secondary text-decoration-underline'>Selling</span> @ $"
          + connect.cost.toLocaleString() + " per kilo (Min: "
          + connect.minimumOrder + " " + drugCaption + " / Max: " + connect.supply
          + " kilos)</div><div id='buyDrugDiv-" + i + "' class='ms-5'></div>"
          + "<div class='ms-4'><span class='text-secondary text-decoration-underline'>"
          + "Buying</span> @ $" + connect.wholesalePrice.toLocaleString()
          + " per kilo"

          + "</div><div id='sellDrugDiv-" + i + "' class='ms-5'></div>"
      }
    }
    $("#connects").html(html)
  }

  displayBuy(connectID){
    let connect = game.connects[connectID]
    let drugMax = connect.supply
    if (game.money < connect.supply * connect.cost
      && game.money > connect.minimumOrder * connect.cost ){
      drugMax = Math.round(game.money / connect.cost)
    } else {
      drugMax = connect.minimumOrder
    }
    let buying = ""
    if (game.money > connect.cost * connect.minimumOrder || connect.front < connect.maxFront){
      buying = "<div class=''>How much do you want? <input type='number' id='buyDrugAmount-"
        + connectID + "' class='buyDrugAmount text-center' value='"
        + connect.minimumOrder + "'  step='1' min='" + connect.minimumOrder
        + "' max='" + drugMax
        + "' style='width:50px;'> kilos ($<span id='buyDrugCost-" + connectID
        + "'>" + Math.round(connect.cost * connect.minimumOrder, 2).toLocaleString()
        + "</span>)"
      if (game.money > connect.minimumOrder * connect.cost){
        buying += "<button id='buyDrugs-" + connectID
          + "' class='buyDrugs ms-3 btn btn-outline-danger'>buy</button>"
      }
      buying += "<button id='frontDrugs-" + connectID
        + "' class='frontDrugs ms-3 btn btn-outline-danger'>loan</button></div> "
    }
    $("#buyDrugDiv-" + connectID).html(buying)
    let selling = ""
    if (game.drugs.inv[game.connects[connectID].city] > 0){
      selling = "<div class=''>How much do you want to sell?"
        + "<input type='number' id='sellDrugAmount-"
        + connectID + "' class='sellDrugAmount text-center' value=1  step=.1 min=.1 max=" + game.drugs.inv[game.connects[connectID].city]
        + " style='width:75px;'> kilos ($<span id='sellDrugCost-" + connectID
        + "'>" + Math.round(connect.wholesalePrice).toLocaleString()
        + "</span>) <button id='sellDrugs-" + connectID
        + "' class='sellDrugs btn btn-outline-dark'>sell</button></div> "
    }
    $("#sellDrugDiv-" + connectID).html(selling)
    $("#showBuy-" + connectID).addClass("d-none")
  }
}
