function Search() {

    var neiron=document.getElementById("input");
    var nei=neiron.value
    $('#table1').empty();
      $.get("/search",{'index':nei},function(data) {
          if (data[0]['flag'] == 1) {
              var table= document.createElement("table");
              var thead= document.createElement("thead");
              table.appendChild(thead);
              var tr= document.createElement("tr");
              thead.appendChild(tr);
              for(var key in data[0]) {
//创建th
                  var th = document.createElement("th");
//设置th的内容为key
                  th.innerHTML = key;
//将th追加到tr中
                  tr.appendChild(th);
              }
              var tbody= document.createElement("tbody");
              table.appendChild(tbody);
              for(var i=0;i<data.length;i++){
                  var tr= document.createElement("tr");
                  for(var key in data[i]){
                      var td= document.createElement("td");
                      td.innerHTML=data[i][key];
                      tr.appendChild(td);
                  }
                  tbody.appendChild(tr);
              }
              document.getElementById("table1").appendChild(table);
}

         else {
             alert("对不起找不到")
         }

     })
}