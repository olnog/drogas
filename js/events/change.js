$(document).on('change', '.loanAutoPay', function(e){
  console.log(this.val())

})

$(document).on('change', '.buyDrugAmount', function(e){
  let connectID = this.id.split('-')[1]
  let connect = game.connects[connectID]
  if (Number($("#buyDrugAmount-" + connectID).val()) > connect.supply){
    $("#buyDrugAmount-" + connectID).val(connect.supply)
  }
  $("#buyDrugCost-" + connectID).html(Math.round(connect.cost
    * Number($("#buyDrugAmount-" + connectID).val()), 2).toLocaleString())
})

$(document).on('change', '.sellDrugAmount', function(e){
  let connectID = this.id.split('-')[1]
  let connect = game.connects[connectID]
  if (Number($("#sellDrugAmount-" + connectID).val()) > game.drugs.inv[connect.city]){
    $("#sellDrugAmount-" + connectID).val(game.drugs.inv[connect.city])
  }
  $("#sellDrugCost-" + connectID).html(Math.round(connect.wholesalePrice
    * Number($("#sellDrugAmount-" + connectID).val()), 2).toLocaleString())
})


$(document).on('change', '.runnerCity', function(e){
  let employeeID = this.id.split("-")[1]
  let employee = game.employees.labor[employeeID]
  let goingTo = this.id.split("-")[2]
  if (goingTo == ""){
    $(".travelRunner-" + employeeID).prop('disabled', true)
    $("#runnerRuns-" + employeeID + "-drive").html("drive")
    $("#runnerRuns-" + employeeID + "-flight")
    return
  }
  travelData = geography.fetchTravel(game.employees.labor[employeeID].city, geography.fetchCities()[goingTo])
  $("#runnerRuns-" + employeeID + "-drive").html("drive (" + travelData.drive + "h / $"
    + Math.round(travelData.drive * employee.wage).toLocaleString() +  ")")
  $("#runnerRuns-" + employeeID + "-flight").html("fly (" + travelData.flight + "h / $"
    + (Math.round(travelData.flight * employee.wage ) + travelData.ticket).toLocaleString() + ")")
  if (game.money > travelData.ticket){
    $("#runnerRuns-" + employeeID + "-flight").prop('disabled', false)
  }
  $("#runnerRuns-" + employeeID + "-drive").prop('disabled', false)
  console.log()
})
