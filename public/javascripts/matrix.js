$(document).ready(function() {

    var messageDrawer = new MessageDrawer();
    // var TwitterTimeline = new TwitterTimeline();

    $("input").keypress(function (e) {

        if(e.keyCode == 13) {
            var text = $("#text").val();
            socket.emit("message",{text:text});
        }

    });

    var socket = io.connect('http://localhost:3000');
        socket.on('connection', function() {

        });
        socket.on('message', function (json) {
            console.log(json);
            messageDrawer.draw(json);
    });

});
