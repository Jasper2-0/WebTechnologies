//THIS IS THE JAVASCRIPT FILE

// Make a new meteor collection that contains all shouts.

Shouts = new Mongo.Collection("shouts");

/*
*   CLIENT SIDE
*/

if (Meteor.isClient) {
  /*
  * This is a helper function for the 'body' template, see shoutbox.html.
  */
  Template.body.helpers({   //With a helper, we can display data inside the template
    shouts: function () {   //So here we define a helper called 'shouts' for the template
      return Shouts.find({}, {sort: {createdAt: -1}});  //return all the shouts we can find (and sort them)
    }
});

// This part handles the event of the body template

  Template.body.events({
    'submit .shoutform': function (event) {   // When the shoutform receives a submit event..
      var nameField = event.target.name.value;     // Put the value of the name input into a variable
      var textField = event.target.text.value;     // Put the value of the textinput into a variable

      // Insert a new object into the database, with name, text, and created at properties.
      Shouts.insert({
        name: nameField,
        text: textField,
        createdAt: new Date()         // current time
      });
      
      event.target.text.value = "";   // Clear form

      return false;                   // Prevent default form submit
    },

	   // When the user clicks the delete button, remove all shouts in the database on the server.
    'click .delete': function (event) {
      Meteor.call('removeAllShouts')  // Now we call a function on the server sice!!
    }
  });
  
  
}

/*
*   SERVER SIDE
*/

if (Meteor.isServer) {
  Meteor.startup(function () {        // Code to run on server at startup
	// At server startup remove all previously created shouts.
    return Meteor.methods({
      removeAllShouts: function() {
		  return Shouts.remove({});       // Empty out the Shouts collection
      }

    });
  });
}