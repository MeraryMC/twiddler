$(document).ready(function(){
        var $body = $('body');
        var $tweedBody = $('#homepagetweeds');
        var count = 0;
        var tweedsByUser = '';

  var tweedGenerator = function(tweet) {
    var $tweet = $('<div class="tweedBody"></div>');
    var $tweetMsg = $('<div></div>');
    var $tweetUser = $('<a href="#"></a>');
    var $dateTime = $('<span class=dateTime></span>');
    $tweetMsg.text(tweet.message);
    $tweetUser.text('@' + tweet.user);
    $tweetUser.css({
      'color': 'indigo',
      'font-weight': 'bold'
    });
    $dateTime.attr('data-livestamp', tweet.created_at.toUTCString());
    $dateTime.css({
      'color': 'DarkGrey',
      'font-size': '13px'
    });
    $tweetUser.click(function(){
      setTweedsByUser(tweet.user);
    });
    $tweet.append($tweetUser);
    $tweet.append($tweetMsg);
    $tweet.append($dateTime);
    return $tweet;
  }

   var logTweeds = function(tweets){
    tweets.forEach(function(tweet){
      var tweedLog = tweedGenerator(tweet);
      $tweedBody.prepend(tweedLog);
    });
  }
  

  var tweedChecker = function() {
    var newTweeds = [];
    var stream = tweedsByUser ? streams.users[tweedsByUser] : streams.home;
    if (tweedsByUser) {
      newTweeds = streamTweeds(stream, 0);
    } else {
      newTweeds = streamTweeds(stream, count);
      count = streams.home.length - 1;
    }
    logTweeds(newTweeds);
    setTimeout(tweedChecker, Math.random() * 10000);
  };

  var streamTweeds = function(stream, index) {
    var newTweeds = stream.slice(index + 1);
    return newTweeds;
  }

  var newestTweeds = function(){
    setTweedsByUser('');
    count = 0;
  } 

  var $refreshButton = $('#newestTweeds');
  $refreshButton.click(function(){
    newestTweeds();
  }); 


  var setTweedsByUser = function(user){
    tweedsByUser = user;
    clearTweets();
  }

  var clearTweets = function() {
    $tweedBody.empty();
  }

  tweedChecker ();

});
        



