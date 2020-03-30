

function ShowData(jsonArray, idTable) {
    var array = JSON.parse(jsonArray);
    var table = document.getElementById(idTable);

    for (var i=0; i<array.lenght; i++){
        var row = table.insertRow(i+1);
        var x=0;
        for(var index in array[i]) {
            var cell = row.insertCell(x);
            cell.innerHTML = array[i][index];
            x++;
        }
    }
    return table;
}

