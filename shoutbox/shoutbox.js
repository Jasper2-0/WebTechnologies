// make a new meteor collection that contains all shouts.
Shouts = new Mongo.Collection("shouts");

/*
*   This part of the code runs on the client
*/

if (Meteor.isClient) {
  /*
  * This is a helper function for the 'body' template, see shoutbox.html.
  */
  Template.body.helpers({
	  // collect all shouts and sort them newest to oldest.
    shouts: function () {
      // Show newest tasks first
      return Shouts.find({}, {sort: {createdAt: -1}});
    }
});
 /*
 * This part handles the event of the body template.
 */
  Template.body.events({
	  // when the shoutform receives a submit event...
    'submit .shoutform': function (event) {
	  // put the value of the name input into a variable
      var name = event.target.name.value;
	  // put the value of the textinput into a variable
      var text = event.target.text.value;
      // insert a new object into the database, with name, text, and created at properties.
      Shouts.insert({
        name: name,
        text: text,
        createdAt: new Date() // current time
      });
      
      // Clear form
      event.target.text.value = "";

      // Prevent default form submit
      return false;
    },
	// when the user clicks the delete button, remove all shouts in the database on the server.
    'click .delete': function (event) {
      Meteor.call('removeAllShouts')
    }
  });
  
  
}

/*
*   This part of the code runs on the server
*/

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
	// at server startup remove all previously created shouts.
    return Meteor.methods({

      removeAllShouts: function() {

		  return Shouts.remove({}); // empty out the Shouts collection

      }

    });
  });
}