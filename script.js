$(document).ready(function() {
    $('#run').on('click', function () {
        var term = 'kodak+black';
        var artist = document.getElementById("artists").value;
        var form = document.getElementById("formats").value;
        $.ajax({
            url: 'https://itunes.apple.com/search?limit=20&term='+artist+'&entity='+form,
            type: 'GET',
            crossDomain: true,
            dataType: 'jsonp',
            success: function (result) {
                console.log(result);
                myFunction(result,form);
            },
            error: function () {
                alert('Failed!');
            }
        });
    });
});

function myFunction(data,form){
    if(form === "musicTrack"){
    var songTable = "<table border = '1' class = 'table table-striped' id='songTable'><tr style= 'font-weight: bold; font-size: 25px' ><td  colspan = '3'><img src = '" +data.results[1].artworkUrl100+
        "' alt ='itunes.apple.com'>"+ data.results[1].artistName+ "</td></tr><tr id = bigHead style= 'font-weight: bold;" +
        "   font-size: larger;'><td>Song Title</td><td>Artist Name</td><td>Price (us)</td></thead>";
        for(var i =0; i<20;i++){
            songTable +="<tr><td>"+ data.results[i].trackName+ "</td><td>"+ data.results[i].artistName + "</td><td>$"
                + data.results[i].trackPrice +"</td></tr>";
        }
        songTable+= "</table>";
        console.log(songTable);
        $('#table').html(songTable);
        }
    if(form === "album"){
        var albumTable = "<table border = '1' class = 'table table-striped' id='songTable'><thead id = biggerHead style= 'font-weight: bold;" +
            "    font-size: larger;'><td>Album Title</td><td>Artist Name</td><td>Price (us)</td><td>Album Art</td></thead>";
        for(var a=0; a<5; a++) {
            console.log(data.results);
            albumTable+="<tr><td>"+ data.results[a].collectionCensoredName + "</td><td>"+ data.results[a].artistName + "</td><td>$"
                + data.results[a].collectionPrice +"</td><td><img src = '" + data.results[a].artworkUrl60 + "' alt = 'is2.mzstatic.com'></td></tr>";
        }
        $('#table').html(albumTable);
    }
}

