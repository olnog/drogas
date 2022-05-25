
$(document).on('click', '.buyDrugs', function(e){
  game.drugs.buy(e.target.id.split('-')[1], $("#buyDrugAmount-" + e.target.id.split('-')[1]).val())
  ui.display('connects')
})

$(document).on('click', '.deal', function(e){
  game.dealer.start(e.target.id.split('-')[1], )
  ui.display('map')
})

$(document).on('click', '.dealerWhere', function(e){
  game.dealer.changeWhere(e.target.id.split('-')[1], e.target.id.split('-')[2])
  ui.display('map')
})

$(document).on('click', '.fireEmployee', function(e){
  game.employees.fire(e.target.id.split('-')[1])
  ui.display('map')
})

$(document).on('click', '.frontDrugs', function(e){
  game.drugs.front(Number(e.target.id.split('-')[1]), Number($("#buyDrugAmount-" + e.target.id.split('-')[1]).val()))
  ui.display('connects')

})

$(document).on('click', '.hire', function(e){
  game.contractors.hire(e.target.id.split('-')[1])
  ui.display('contractors')
})

$(document).on('click', '.payLoan', function(e){
  console.log("?", e.target.id.split('-')[1])
  game.connects[Number( e.target.id.split('-')[1])]
    .payLoan(Number($("#loanPayment-" + e.target.id.split('-')[1]).val()))
  ui.display('connects')
})

$(document).on('click', '.runnerDropsCash', function(e){
  game.runner.drops(e.target.id.split('-')[1], null, 'cash')
  ui.display('map')
})

$(document).on('click', '.runnerDropsDrugs', function(e){
  game.runner.drops(e.target.id.split('-')[1],
    Number($("#runnerDropDrugsAmount-" + e.target.id.split('-')[1]).val()), 'drugs')
  ui.display('map')
})

$(document).on('click', '.runnerHoldsAllCash', function(e){
  game.runner.holds(e.target.id.split('-')[1],
    Number($("#runnerHoldsCashAmount-" + e.target.id.split('-')[1]).attr('max')), 'cash')
  ui.display('map')
})

$(document).on('click', '.runnerHoldsAllDrugs', function(e){
  game.runner.holds(e.target.id.split('-')[1],
    $("#runnerHoldsDrugsAmount-" + e.target.id.split('-')[1]).attr('max'), 'drugs')
  ui.display('map')
})

$(document).on('click', '.runnerHoldsCash', function(e){
  game.runner.holds(e.target.id.split('-')[1],
    $("#runnerHoldsCashAmount-" + e.target.id.split('-')[1]).val(), 'cash')
  ui.display('map')
})

$(document).on('click', '.runnerHoldsDrugs', function(e){
  game.runner.holds(e.target.id.split('-')[1],
    $("#runnerHoldsDrugsAmount-" + e.target.id.split('-')[1]).val(), 'drugs')
  ui.display('map')
})


$(document).on('click', '.runnerRuns', function(e){
  game.runner.run(e.target.id.split('-')[1], $("[name='runnerCity-" + e.target.id.split('-')[1] + "']:checked").val(), e.target.id.split('-')[2])
  ui.display('map')
})


$(document).on('click', '.sellDrugs', function(e){
  game.drugs.sell(e.target.id.split('-')[1], $("#sellDrugAmount-" + e.target.id.split('-')[1]).val())
  ui.display('connects')
})

$(document).on('click', '.showBuy', function(e){
  let id = this.id.split('-')[1]
  ui.connects.displayBuy(id)
})

$(document).on('click', '.stopDealing', function(e){
  game.dealer.stop(e.target.id.split('-')[1])
  ui.display('map')
})

$(document).on('click', '.tab', function(e){

  ui.display(e.target.id.split('-')[1])
})

$(document).on('click', 'button', function(e){
  ui.refresh()
})
