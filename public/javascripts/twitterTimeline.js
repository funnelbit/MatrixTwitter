var TwitterTimeline = function() {

}

TwitterTimeline.prototype.draw = jQuery(function() {
    MessageDrawer messageDrawer = new MessageDrawer();

    $.getJSON("https://api.twitter.com/1/statuses/user_timeline.json?screen_name=mekapiku", function(data) {
        messageDrawer.draw(data[0].text);
    }
});
