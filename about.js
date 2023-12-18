$( document ).ready(function() {
  $('#btn-about').on("click",function(){
    $( "#btn-home,#btn-live-report" ).removeClass(" btn-primary");
    $( "#btn-home,#btn-live-report" ).addClass(" btn-link");
    $( "#btn-about" ).removeClass("btn-link");
    $( "#btn-about" ).addClass( "btn-primary" );
    $( "#allcoins" ).css("display", "none");
    $( "#live-report" ).css("display", "none"); 
    $('#search-div').css("display", "none");   
    $('#about').css("display", "flex")
    $('#about').html(
                      `<div id="div-about">
                        <div>
                          <p>פרויקט זה נעשה ע"י רועי רזניק.</p>
                          <p> מטרת הפרויקט היא יצירה של אתר אינטרנט אינטרקטיבי על מנת לצפות בשינויי שוק המטבעות הדיגיטליים.</p>
                          <p>הפרויקט משתמש ב:</p>
                          <ul>
                            <li>HTML</li>
                            <li>CSS</li>
                            <li>JavaScript</li>
                            <li>ספריית JQuery. <a href="https://jquery.org/license/">רשיון</a></li>
                            <li>מאגר המידע של CoinGecko לתצוגת הבית. <a href="https://www.coingecko.com/en/api_terms">רשיון</a></li>
                          </ul>
                        </div>`
    )
  })


  
})
