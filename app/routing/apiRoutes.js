

var friends = require('../data/friends.js');

module.exports = function(app){


	
	app.get("/api/friends", function(request, response){
	        response.json(friends);
	    });
	app.post("/api/friends", function(request, response){
		var newFriend = request.body;
		
        
        for(var i = 0; i < newFriend.scores.length; i++){
            if(newFriend.scores[i] === "1 (Strongly Disagree)"){
                newFriend.scores[i] = 1;
            }else if(newFriend.scores[i] === "5 (Strongly Agree)"){
                newFriend.scores[i] = 5;
            }else {
                newFriend.scores[i] = parseInt(newFriend.scores[i]);
            }
        }
        
        var diff = [];
        
        for(var i = 0; i < friends.length; i++){
            var compatibleFriend = friends[i];
            var totalDifference = 0;
            
            for(var j = 0; j < compatibleFriend.scores.length; j++){
                var tempDiff = Math.abs(compatibleFriend.scores[j] - newFriend.scores[j]);
                totalDifference += tempDiff; 
            }
            diff.push(totalDifference);
        }
        
        var num = diff[0];
        var index = 0;
        
        for(var x = 0; x < diff.length; x++){
            if(diff[x] < num){
                num = diff[x];
                index = x;
            }
        }
        
        friends.push(newFriend);
        
        response.json(friends[index]);
        

		
	});

}