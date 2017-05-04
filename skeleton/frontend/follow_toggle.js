const APIUtil = require('./api_util.js');

class FollowToggle {

  constructor($el, options){
    this.$el = $el;
    this.userId = ($el.data("user-id")) || options.userId;
    this.followState = ($el.data("initial-follow-state").toString()) || options.followState;

    this.$el.text(this.render());
    this.handleClick();
  }

  render(){
    let text = "";
    // console.log(`asdf${this.followState}`);
    if (this.followState === "true") {
      text = "Unfollow!";
    } else {
      text = "Follow!";
    }
    return text;
  }

  toggleState(){
    if(this.followState === "false"){
      this.followState = "true";
    }
    else{
      this.followState = "false";
    }
  }

  updateText(){
    this.$el.text(this.render());
    this.$el.prop('disabled', false);
  }

  handleClick(){
    const that = this;
    this.$el.on("click", (e) => {
      e.preventDefault();
      if (this.followState === "false"){
        this.$el.prop('disabled', true);
        APIUtil.followUser(that.userId).then(this.toggleState())
        .then(this.updateText());
      }
      else{
        this.$el.prop('disabled', true);
        APIUtil.unfollowUser(that.userId).then(this.toggleState())
        .then(this.updateText());
      }
    });
  }
}

module.exports = FollowToggle;
