$( document ).ready(function() {
    if(localStorage.getItem('favcoin') == null){
      var favcoins = [];
    }else{
      var favcoins = JSON.parse(localStorage.getItem('favcoin'));
    }

    $.ajax({
      url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1", 
      success: function(res){
        res.forEach((coin,index) => {
          var checked = ''
          for(i=0;i<favcoins.length; i++){
            if(favcoins[i]===coin.symbol){
              checked='checked=true'
            }
          }
          const divcoin = `
                          <div data-id="${coin.symbol}" class="coin col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                            <div class="first-coin">
                              <div class="switch-symbol">
                                <p>${coin.symbol.toUpperCase()}</p>
                                <label class="switch">
                                  <input ${checked} type="checkbox">
                                  <p class="slider round"></p>
                                </label>
                              </div>
                              <p class="coin-id">${coin.id}</p>
                              <button data-id="${coin.id}" type="button" class="btn btn-primary moreinfo">More Info</button>
                            </div>
                          </div>`
          $('#allcoins').append(divcoin)

        });
      }});  
    


  $('#allcoins').on("click",".moreinfo",function(){
    var that = $(this).parent().parent()
    $(this).parent().hide()
    that.append('<span class="loader"></span>')
    $.ajax({
      url:`https://api.coingecko.com/api/v3/coins/${$(this).attr("data-id")}`,
      success:function(res){
        console.log(res)
          $('.loader').remove()
          const moreinfo = `
          <div class="image-moreinfo" style="background-image:url(${res.image.large}); ">
                <p>ILS: ${res.market_data.current_price.ils}</p>
                <p>USD: ${res.market_data.current_price.usd}</p>
                <p>EUR: ${res.market_data.current_price.eur}</p>
                <button type="button" class="btn btn-primary lessinfo">Less Info</button>
          </div>
          `  
          that.append(moreinfo)
      }
    })
  })

  $('#allcoins').on("click",".lessinfo",function(){
    $(this).parent().siblings().show()
    $(this).parent().remove()
  })

  function findcoin(){
    if($('#input-search').val().length==0){
       $('.coin').show()
       return
    }
      var found = false
      $('.coin').each((index,element)=>{
        if(element.dataset.id.toUpperCase()===$('#input-search').val()||element.dataset.id===$('#input-search').val()){
          $('.coin').hide()
          $(element).show()
          $('#input-search').val('')
          found = true
        }
      })

      if(!found){
        alert('Pls type a valid symbol from one of the cards')
        $('#input-search').val('')
      }
      
  }

  $('#btn-search').on("click",function(){
      findcoin() 
  })  

  function removeItem(array, removed) {
    return array.filter(item => item !== removed);
  }

    function isIn(array, item) {
      for (let i = 0; i < array.length; i++) {
          if (array[i] === item) {
              return true;
          }
      }
      return false;
    }

    function replaceItem(array, oldItem, newItem) {
      array[array.indexOf(oldItem)] = newItem;
      return array;
    }



    

    $('#allcoins').on("click",".slider",function(){

      var symbol= $(this).parent().parent().parent().parent().attr("data-id")
      var that = $(this)
      if(isIn(favcoins,symbol)){
        favcoins = removeItem(favcoins,symbol)      
      }else{
        if(favcoins.length < 5){
          favcoins.push(symbol) 
        }else{
          $('#allcoins').append('<div id="fav"><div class="fav"></div></div>')
          favcoins.forEach((fav,index)=>{
            $('.fav').append(`<button 
             type="button" class="btn btn-success margin favcurrency">${fav.toUpperCase()}</button>`)
          })
          $('.fav').append(`<div id="cancelconfirm"><button id="confirm" type="button" class="btn btn-primary margin">Confirm</button><button id="cancel" type="button" class="btn btn-danger margin">Cancel</button></div>`)
        }
        $('#cancel').on("click",function(){
          $('#fav').remove()
          that.prev().prop('checked',false)
        })
        var selectedsymbol;
        $('#confirm').on("click",function(){
          if(!selectedsymbol){
            alert('No currency as been selected') 
          }else{
            favcoins  = replaceItem(favcoins,selectedsymbol.toLowerCase(),symbol)
            $(`.coin[data-id="${selectedsymbol.toLowerCase()}"]`).find('input').prop('checked',false)
            localStorage.setItem('favcoin', JSON.stringify(favcoins));
            $('#fav').remove()
          }
        })

        $('#allcoins').off("click",".favcurrency")
        $('#allcoins').on("click",".favcurrency",function(){
          if($('.border-fav').length){
            $('.border-fav').removeClass( "border-fav" )
            selectedsymbol = undefined
          }else{
            $(this).addClass( "border-fav" )
            selectedsymbol = $(this).text()
          }
        })
      }
      localStorage.setItem('favcoin', JSON.stringify(favcoins));
    })


  $('#btn-home').on("click",function(){
    $('.coin').css("display","block");
    $( "#btn-live-report,#btn-about" ).removeClass(" btn-primary");
    $( "#btn-live-report,#btn-about" ).addClass(" btn-link");
    $( "#btn-home" ).removeClass("btn-link");
    $( "#btn-home" ).addClass( "btn-primary" );
    $( "#about" ).css("display", "none")
    $( "#live-report" ).css("display", "none")
    $('#allcoins').css("display", "flex")
    $('#search-div').css("display", "flex");   
  })

});   