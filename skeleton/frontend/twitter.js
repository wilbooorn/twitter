const FollowToggle = require('./follow_toggle.js');
const UsersSearch = require('./users_search.js');
const TweetCompose = require('./tweet_compose.js');


$(() => {
  let buttons = $('button.follow-toggle');
  buttons.each(function(index, button){
    var jbutton = $(button);
    new FollowToggle(jbutton);
  });
});


$(() => {
  let queries = $('nav.users-search');
  queries.each(function(index, query){
    let jquery = $(query);
    new UsersSearch(jquery);
  });

});

$(() => {
  let tweets = $('.tweet-compose');
  tweets.each(function(index, tweet){
    let jtweet = $(tweet);
    new TweetCompose(jtweet);
  });

});
