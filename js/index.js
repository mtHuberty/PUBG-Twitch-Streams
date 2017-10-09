'use strict'

var streamerArray = ["9679595", "37402112", "17337557", "90020006", "89751602", "19571641", "26610234", "23161357", "26490481", "22998189", "29285735"];

$.ajax({
 type: 'GET',
 url: 'https://api.twitch.tv/helix/users?login=grimmmz&login=shroud&login=drdisrespectlive&login=tsm_viss&login=anthonykongphan&login=ninja&login=cohhcarnage&login=Lirik&login=summit1g&login=stonemountain64&login=rhinocrunch&login=freecodecamp',
 headers: {
   'Client-ID': 'n5k7f09cimopkzv9atfwj6r05ikwqv'
 },
 success: function(data) {
   console.log(data);
   $.ajax({
     type: 'GET',
     url: 'https://api.twitch.tv/helix/streams?user_login=grimmmz&user_login=shroud&user_login=drdisrespectlive&user_login=tsm_viss&user_login=anthonykongphan&user_login=ninja&user_login=cohhcarnage&user_login=Lirik&user_login=Summit1G&user_login=stonemountain64&user_login=rhinocrunch&user_login=freecodecamp',
     headers: {
       'Client-ID': 'n5k7f09cimopkzv9atfwj6r05ikwqv'
     },
     success: function(data2) {
       console.log(data2);
       var streamersOnline = [];
       var streamersOffline = streamerArray;
       for(var i = 0; i < data2.data.length; i++) {
         streamersOnline.push(data2.data[i].user_id);
         var index = streamerArray.indexOf(data2.data[i].user_id);
         if (index > -1) {
           streamersOffline.splice(index, 1);
         }
       }
       makeTable(data, data2, streamersOnline, streamersOffline);
       
       }
   })}
});



function makeTable (tData, tData2, online, offline) {
  for(var j = 0; j < tData.data.length; j++) {
    var tr = document.createElement("tr");
    tr.id = "tr"+(j+1);
    document.getElementById("mainTable").appendChild(tr);
    
    var td1 = document.createElement("td");
    td1.innerHTML = "<img src=\"" + tData.data[j].profile_image_url + "\" class='profPic'></img>";
    document.getElementById(tr.id).appendChild(td1);
    
    var td2 = document.createElement("td");
    td2.innerHTML = tData.data[j].display_name;
    document.getElementById(tr.id).appendChild(td2);
    
    var tdLink = document.createElement("td");
    tdLink.innerHTML = '<a href="http://www.twitch.tv/' + tData.data[j].display_name + '" target="_blank">Weee</a>';
    tdLink.className = "noshow";
    document.getElementById(tr.id).appendChild(tdLink);
    
    var td3 = document.createElement("td");
    td3.innerHTML = "OFFLINE";
    td3.className = "middle";
    document.getElementById(tr.id).appendChild(td3);
    
    if (online.indexOf(tData.data[j].id) > -1) {
      //Streamer is online!
      console.log(tData.data[j].login + " is online!");
      document.getElementById("mainTable").prepend(tr);
      for (var k=0; k < tData2.data.length; k++) {
        if (tData.data[j].id === tData2.data[k].user_id) {
          //Found the online streamer's data!
          td3.innerHTML = tData2.data[k].title;
          $(td3).removeClass("middle");
          td3.insertAdjacentHTML('beforeend', '<p></p><p class="viewCount">' + tData2.data[k].viewer_count + ' watching</p>');
          
          if (tData2.data[k].game_id === "493057") {
            //Streamer is playing PUBG!
            console.log(tData.data[j].display_name + " is playing PUBG!");
            td2.insertAdjacentHTML('beforeend', '<br><img src="http://pubgshowcase.com/img/icon-pubg-2.png" class="pubgPic"></img>');
          };
        }
      }
    }
  }
  $(document).ready(function() {
    $('tr').click(function() {
      var href = $(this).find("a").attr("href");
      if(href) {
        window.open(href);
      }
    })
  });
}