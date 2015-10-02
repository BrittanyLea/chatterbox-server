(function () {

window.app = {
  storage: {username:'shawndrost', roomname:'4chan', text:""},
  // this.url
  // var url = {};

  init: function(){
    console.log("init ran")
    $(document).on("click", ".get-button", app.fetch);
    $(document).on("click", '.submit-button', app.submitForm);
    $(document).on("change", '.dropdown', app.fetch);
    app.fetch();
    setInterval(app.fetch, 13000);
  },

  submitForm: function () {
    app.storage.username = $('#username').val();
    app.storage.roomname = $('.dropdown').val();
    app.storage.text = $('#message').val();

    console.log("worked");
    app.send();
  },

  send: function () {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://127.0.0.1:3000/classes/messages',
      type: 'POST',
      data: JSON.stringify(app.storage),
      contentType: 'application/json',
      success: function (data) {
        app.fetch();
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
  },

  fetch: function (){
    $.ajax({
      url: 'http://127.0.0.1:3000/classes/messages',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        $('.messages').empty();
        var resultArr = data.results;
        var roomStorage = {};
        var selection = $('.dropdown').val();
        var allOptions = $('.dropdown');

        for(var i = 0; i < resultArr.length; i++) {
          if(resultArr[i].roomname === selection) {// ending brace
         var content = _.escape(resultArr[i].username) + " : " + _.escape(resultArr[i].text);
         var pNode = $('<p></p>').text(content);

         $('.messages').append(pNode);
          } // end if
        roomStorage[resultArr[i].roomname] = true;
      }
      for(var k in roomStorage) {
        if (!$('.dropdown').children().hasClass(k))  {
          var optionNode = $('<option class="' + _.escape(k) +'">' + _.escape(k) + '</option>');
          $('.dropdown').append(optionNode);
        }
      }

  },
      error: function (data) {
        console.log("failed")
      }
    })
  }
}
app.init();
})();




