var MessageDrawer = function() {

};

MessageDrawer.prototype.draw = function(json) {

    var message = json.text;
    var x = Math.random()*$(window).width();
    var y = Math.random()*$(window).height()-100;
    var dropDist = Math.random()*100;
    var durationTime = dropDist*10+100;
    console.log(y);

    var drawDiv = $("<div>");
    drawDiv.addClass("messages");
    drawDiv.css({top:y,left:x});
    drawDiv.text(message);
    drawDiv.animate({"top": "+=" + dropDist, duration: 'slow'})
           .animate({opacity: 'hide'}, {duration: durationTime, easing: 'swing',
                                        complete: function() { $(this).remove(); }
                                       });

    $("body").append(drawDiv);
};
