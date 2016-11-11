var Mp3Queue = function(container, files) {
    var index = 1;
    if(!container || !container.tagName || container.tagName !== 'AUDIO')throw 'Invalid container';
    if(!files || !files.length)throw 'Invalid files array';

    var playNext = function() {
        if(index < files.length) {
            container.src = files[index];
            index += 1;
        } else {
            container.removeEventListener('ended', playNext, false);
        }
    };

    container.addEventListener('ended', playNext);

    container.src = files[0];
};


$(function() {
  $( ".pics" ).draggable({ revert: "invalid", helper: "clone" });
  $( "#frame" ).droppable({
    drop: function(event, ui) {
      console.log(ui.draggable.data("id"));
      //ui.draggable = the dragged element as an object

      $("#frame").append(ui.draggable.clone().css("position","static"));
    }
  });
});


$("#frame").on( "click", ".pics", function() {
  $(this).remove();
  audio.pause();
});


//create global variable to contain sounds
var playArray = [];

$("#play").click(function() {
  $("#frame .pics").each(function() {
    var mp3 = $(this).attr('data-mp3');
    //add MP3 to playArray array
    playArray.push(mp3);
  });

  // play all sounds, in sequence

    var container = document.getElementById('audio');
    new Mp3Queue(container, playArray);

});
