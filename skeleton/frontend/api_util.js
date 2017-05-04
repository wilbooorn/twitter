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
