const APIUtil = require('./api_util.js');
const FollowToggle = require('./follow_toggle.js');

class UsersSearch{
  constructor($el){
    this.$el = $el;
    this.ul = $('.users');

    this.handleInput();
  }

  handleInput(){
    let that = this;
    this.$el.on("input", (e) => {
      that.input = $("input.search-input").val();
      e.preventDefault();
      APIUtil.searchUsers(that.input, that.renderResults.bind(this));
    });
  }

  renderResults(users) {
    this.ul.empty();
    users.forEach(user => {
      let follow = "";
      if(user.followed){
        follow = "true";
      }else{
        follow = "false";
      }
      let li = $('<li></li>').text(user.username);
      let button = $(`<button type="button" data-initial-follow-state=${follow}></button>`);
      new FollowToggle(button, {userId: user.id});
      this.ul.append(li);
      this.ul.append(button);
    });
  }
}

module.exports = UsersSearch;
