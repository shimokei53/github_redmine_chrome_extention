$(function(){

  // your redmine api url
  var host = "https://";
  // see http://www.r-labs.org/projects/r-labs/wiki/Redmine_REST_API#ユーザー認証
  var api_key = "";
  // your ticket number or format
  var ticket_key = $('span.js-issue-title').text().match(/\d+/);

  if (ticket_key == null){ return; }

  var $ticketLink = $('<a>')
    .addClass('btn btn-outline')
    // your redmine ticket
    .attr("href", 'https://redmine.jp/issues/' + ticket_key)
    .attr("target", '_blank')
    .css("margin", '0 2px')
    .text('show ' + ticket_key);

  var $changeToDoneButton = $('<button>')
    .addClass('btn btn-primary')
    .css("margin", '0 2px')
    .text('change to Done');

  var $closeButton = $('<button>')
    .addClass('btn btn-danger')
    .css("margin", '0 2px')
    .text('ticket close');

  var $redmineBox = $('<div>')
    .css('background-color', '#f9f8e3')
    .css('padding', '9px');

  $redmineBox.append($ticketLink)
    .append($changeToDoneButton)
    .append($closeButton);

  $('#partial-discussion-header').append($redmineBox);

  $changeToDoneButton.on('click',function(){
    changeToDone();
  });

  $closeButton.on('click',function(){
    closeTicket();
  });

  function changeToDone () {
    var prLink = '<a href="' + location.href + '">' + location.href + '</a>';
    var comment = "see " + prLink;
    var status = 3;
    $.ajax({
      method: "PATCH",
      url: host + ticket_key + "?apiKey=" + api_key + "&statusId=" + status + "&comment=" + comment,
      error: function (data) {
        alert(data.responseText);
      },
      complete: function () {
        $changeToDoneButton
          .addClass("tooltipped")
          .addClass("tooltipped-s")
          .attr("disabled","disabled")
          .attr("aria-label", "changed!");
      }
    });
  }

  function closeTicket () {
    var prLink = '<a href="' + location.href + '">' + location.href + '</a>';
    var comment = "merged%20 " + prLink;
    var status = 4;
    $.ajax({
      method: "PATCH",
      url: host + ticket_key + "?apiKey=" + api_key + "&statusId=" + status + "&comment=" + comment,
      error: function (data) {
        alert(data.responseText);
      },
      complete: function () {
        $closeButton
          .addClass("tooltipped")
          .addClass("tooltipped-s")
          .attr("disabled","disabled")
          .attr("aria-label", "closed!");
      }
    });
  }
});
