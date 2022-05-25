class UI{
  currentTab = null
  connects = new UIConnects()
  fadingOutInterval = null
  tabs = new UITabs()
  openMap = false
  constructor(){
  }

  animating(){
    for (let employeeID in game.dealer.dealing){
      if (!game.dealer.dealing[employeeID]){
        continue
      }
      $("#dealingAnimation-" + employeeID).html($("#dealingAnimation-"
        + employeeID).html() + ".")
      if($("#dealingAnimation-" + employeeID).html().length > 3){
        $("#dealingAnimation-" + employeeID).html('')
      }
    }
  }

  display(what){
    this.currentTab = what
    let functionArr = {map: 'displayMap', contractors: 'displayContractors'}
    $(".tabs").addClass('d-none')
    $("#" + what).removeClass('d-none')
    $(".tab").removeClass('fw-bold')
    $("#tab-"  + what).addClass('fw-bold')
    if (what == 'connects'){
      this.connects.display()
      return
    }
    this.tabs[functionArr[what]]()
  }

  displaySold(employeeID, cashIncrease, drugsDelta){
    let cities = geography.fetchCities()
    let cityID = cities.indexOf(game.employees.labor[employeeID].city)
    if (drugsDelta < 1){
      drugsDelta = parseFloat((drugsDelta * 1000).toFixed(1))
    }
    $("#cityCashChange-" + cityID).html("(<span class='text-success'>+$"
      + cashIncrease.toLocaleString() + "</span>)")
    $("#cityDrugsChange-" + cityID).html("(<span class='text-danger'>-"
      + drugsDelta + "g</span>)")
  }

  displayTime(){
    let time = this.formatTime()
    $("#hour").html(time.hour)
    $("#minute").html(time.minute)
  }

  error(msg){
    $("#error").css('opacity', 1)
    $("#error").html(msg)
    $("#status").html('')
    this.startFadingOut("#error")
  }



  fadeout(id){
    $(id).css('opacity', $(id).css('opacity') - .01)
    if ($(id).css('opacity') <= 0){
      clearInterval(this.fadingOutInterval)
      this.fadingOutInterval = null
    }
  }

  formatTime(){
    let hour = game.time.hour
    let minute = game.time.minute
    if (hour < 10){
      hour = "0" + hour
    }
    if (minute < 10){
      minute = "0" + minute
    }
    return {hour: hour, minute: minute}
  }

  refresh(){
    this.displayTime()
    $("#dayNum").html(game.day)
    $("#money").removeClass('text-danger')
    if (game.money < 0 ){
      $("#money").addClass('text-danger')
    }
    $("#money").html("$" + game.money.toLocaleString())
    if (ui.openMap && $("#tab-map").hasClass('d-none')){
      $("#tab-map").removeClass('d-none')
    }
  }

  startFadingOut(id){
    this.fadingOutInterval = setInterval(function(){ui.fadeout(id)}, 100)
  }

  status(msg){
    $("#status").css('opacity', 1)
    let time = this.formatTime()
    $("#error").html('')
    $("#status").html("[" + time.hour + ":" + time.minute
      + "] " + msg)
    this.startFadingOut("#status")
  }
}
