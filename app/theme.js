$( document ).ready(function() {
    

});

$('.album-toggler').on('click', function(){
    showAlbumDetails(this.attr('id'));
});

function playSound (song) {
    createjs.Sound.registerSound(song.value, song.name);
    createjs.Sound.play(song.name);
}

function pauseSound (song) {
    createjs.Sound.stop(song.name);
}


//show modal album details 
function showAlbumDetails(albumId){
    $('#albumDetails .modal-body').empty();
    
    //retrieve all tracks of the album form the API
    $.ajax({
        url: 'https://api.napster.com/v2.2/albums/'+albumId+'/tracks?apikey=your_napster_apiKey',
        type: 'get',
        success: function(response){
            var data = response.tracks;
            for(var i=0; i < data.length; i++){
                $('#albumDetails .modal-img').attr('src', 'https://api.napster.com/imageserver/v2/albums/'+albumId+'/images/500x500.jpg');
                $('#albumDetails .modal-img').attr('alt', data[i].name.toLowerCase());

                $('#albumDetails .album-name').text(data[i].name.toLowerCase());
                $('#albumDetails .album-artist').text(data[i].artistName.toLowerCase());

                $('#albumDetails .modal-body').append('<div class="track-wrapper" id="'+data[i].id+'"><div class="btn-track-wrapper"><button  name="'+data[i].id+'" value="'+data[i].previewURL+'" class="btn-player fas fa-play play" onclick="playSound(this)"></button><button  name="'+data[i].id+'" onclick="pauseSound(this)" class="btn-player fas fa-stop stop"></button></div><p>'+data[i].artistName.toLowerCase()+' - '+data[i].name.toLowerCase()+'</p></div>');
            }
            
        }, //end success
        error:function(error){console.log("An error occured cannot get data");} //end error
    }) // end ajax call
    
    
}// end showAlbumDetails

function showArtistDetails(artistId, artistImage, artistName, artistBio, artistBioAuthor, artistBioB){
    $('#artistDetails .modal-img').attr('src', artistImage);
    $('#artistDetails .modal-img').attr('alt', artistName);

    $('#artistDetails .artist-name').text(artistName);
    var blurb = artistBioB + "</br>";

    if(artistBio == artistBioB){
        artistBioB ="";
        blurb = "";
    }
    else if (artistBioB == undefined) {
        artistBioB = "";
        blurb = "";
    }
    $('#artistDetails .artist-bio').html(blurb + artistBio +"</br><div class='author'> -- by "+artistBioAuthor+"</div>");
    
    $('#artistDetails .modal-body').empty();
    
    
    //top albums of an artist 
    $.ajax({
        url: 'http://api.napster.com/v2.2/artists/'+artistId+'/albums/top?apikey=your_napster_apiKey&limit=10',
        type: 'get',
        success: function(response){
            var data = response.albums;
            for(var i=0; i < data.length; i++){
                $('#artistDetails .modal-body').append('<a type="button" class="track-wrapper album-toggler" id="'+data[i].id+'"><div class="album-image"><img src="https://api.napster.com/imageserver/v2/albums/'+data[i].id+'/images/500x500.jpg" alt="'+data[i].shortcut+'"/></div><div class="album-content"><p>'+data[i].name.toLowerCase()+'</p><p>'+data[i].artistName.toLowerCase()+'</p><p>'+formatDate(data[i].released)+'</p></div></a>');
            }
            
        }, //end success
        error:function(error){console.log("An error occured cannot get data");} //end error
    }) // end ajax call

}//end showArtistDetails

function formatDate (date){
    var currentDate = new Date(date).toUTCString().substring(5,17);
    return currentDate;
  }