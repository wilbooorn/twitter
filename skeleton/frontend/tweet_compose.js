const APIUtil = require('./api_util.js');

class TweetCompose {
  constructor($el) {
    this.$el = $el;

    this.$el.on('submit', (e) => {
      e.preventDefault();
      console.log(this.$el);
      this.submit();
    });

  }

  submit(){
    let data = this.$el.serializeJSON();
    APIUtil.createTweet(data);
  }


}

module.exports = TweetCompose;
