/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(1);
const UsersSearch = __webpack_require__(3);
const TweetCompose = __webpack_require__(4);


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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2);

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const APIUtil = {
  followUser: id => {
    return $.ajax({
      type: "POST",
      url: `/users/${id}/follow`,
      dataType: "JSON",

    });
  },

  unfollowUser: id => {
    return $.ajax({
      type: "DELETE",
      url: `/users/${id}/follow`,
      dataType: "JSON",
    });
  },

  searchUsers: (queryVal, success) => {
    return $.ajax({
      type: 'GET',
      url: '/users/search',
      data: {
        query: queryVal
      },
      dataType: "JSON",
      success: (res) => success(res)
    });
  },

  createTweet: (data) => {
    return $.ajax({
      type: 'POST',
      url: '/tweets',
      data: data,
      dataType: "JSON"
    });
  }
};



module.exports = APIUtil;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2);
const FollowToggle = __webpack_require__(1);

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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2);

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
 


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map