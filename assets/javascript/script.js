$(document).ready(function() {
    //Array for searched topics to be added
    var topics = [];

    //Function with AJAX call to Giphy, Q Parameter for API limit set to search term, limit 10
    //Create div with respective still and animate image sources with "data-state", "data-still" and "data-animate" attributes
    function displayThrowBack() {

        var x = $(this).data("search");
        console.log(x);

        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=ZpstsWeW44ElYa0BrjHSW8hlQx3SjFAp&limit=10"
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
          }).done(function(response) {
              var results = response.data;
              console.log(results);
              for (var i = 0; i < results.length; i++) {

            var throwBackDiv = $("<div class='col-md-4'>");

            var rating = results[i].rating;
        	var defaultAnimatedSrc = results[i].images.fixed_height.url;
        	var staticSrc = results[i].images.fixed_height_still.url;
        	var itemImage = $("<img>");
        	var p = $("<p>").text("Rating: " + rating);

        	itemImage.attr("src", staticSrc);
        	itemImage.addClass("throwBackGiphy");
        	itemImage.attr("data-state", "still");
        	itemImage.attr("data-still", staticSrc);
        	itemImage.attr("data-animate", defaultAnimatedSrc);
        	throwBackDiv.append(p);
        	throwBackDiv.append(itemImage);
        	$("#gifArea").prepend(throwBackDiv);

            }       
         });
    }
    //Submit button click event takes search term from form input, trims and pushes to topics array, displays button
	$("#addThrowBack").on("click", function(event) {
        event.preventDefault();
        var newShow = $("#throwBackInput").val().trim();
        topics.push(newShow);
        console.log(topics);
        $("#throwBackInput").val('');
        displayButtons();
      });

       //Function iterates through topics array to display button with array values in "myButtons" section of HTML
	function displayButtons() {
        $("#myButtons").empty();
        for (var i = 0; i < topics.length; i++) {
          var a = $('<button class="btn btn-primary">');
          a.attr("id", "throwBack");
          a.attr("data-search", topics[i]);
          a.text(topics[i]);
          $("#myButtons").append(a);
        }
      }
      displayButtons();

      //Click event on button with id of "throwBack" executes displayThrowBack function
      $(document).on("click", "#throwBack", displayThrowBack);
    
      //Click event on gifs with class of "throwBackGiphy" executes pausePlayGifs function
      $(document).on("click", ".throwBackGiphy", pausePlayGifs);
    
      //Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
      function pausePlayGifs() {
           var state = $(this).attr("data-state");
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
      }
    }
         
}); 