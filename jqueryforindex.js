$(document).ready(function(){
        var $body = $('body');
        var $tweedBody = $('#homepagetweeds');
        var count = 0;
        var tweedsByUser = '';

  var tweedGenerator = function(tweet) {
    var $tweet = $('<div class="tweedBody"></div>');
    var $tweetMsg = $('<div></div>');
    var $tweetDate = $('<div></div>');
    var $tweetUser = $('<a href="#"></a>');
    $tweetMsg.text(tweet.message);
    $tweetDate.text("Published on: " + tweet.created_at);
    $tweetDate.css({
      'color': 'DarkGrey',
      'font-size': '13px'
    });
    $tweetUser.text('@' + tweet.user);
    $tweetUser.css({
      'color': 'indigo',
      'font-weight': 'bold'
    });
    $tweetUser.click(function(){
      setTweedsByUser(tweet.user);
    });
    $tweet.append($tweetUser);
    $tweet.append($tweetMsg);
    $tweet.append($tweetDate);
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
    setTimeout(tweedChecker, Math.random() * 4000);
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
        



