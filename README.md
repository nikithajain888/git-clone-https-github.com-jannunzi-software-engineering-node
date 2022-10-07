Part 1 : Development Environment Setup (30pts)

1. URL of React project GitHub repository
o https://github.com/nikithajain888/software-engineering-react
2. URL of React project deployed on Netlify
o https://fantastic-pony-adaa28.netlify.app/
3. URL of Node project GitHub repository
o https://github.com/nikithajain888/software-engineering-node
4. URL of Node project deployed on Heroku
o https://nikithajain888-software-engine.herokuapp.com/
Part 2: Design Phase (30pts) Documenting Requirements (10pts)
                              
Documenting Use Cases (10pts)

1. User posts a Tuit
• Use case name : Posting a tuit
• To post a tuit to a user’s followers
• Actors : Users, followers, system
• Preconditions :
o Usershouldexist
o Usermustbeauthenticated
o The tuit cannot be empty .i.e., it has to have a minimum length of
characters.
• Actor actions :
o User posts tuit id#
o User posts tuit id # that does not exist • System actions:
o Success:Thetuitdetailsdisplayedontheuser’sfeedandfollowers’ feed
o Failure:Errormessage:Tuitidnotfound. • Postconditions :
o Server must generate the post to the followers of the user o Server must store a copy of the tuit for future reference.


2. User likes a Tuit
• Use case name : Liking a tuit
• To like a tuit posted by another user
• Actors : Users, following user, System
• Preconditions :
o Postshouldexist
o Followingusershouldexist
o Followingusershouldbeauthenticated
• Actor actions :
o UsercanlikeTuitsthatexistsbyclickingontheirhearticon
• System actions:
o Success:user’snameshouldbedisplayedinthelikesuserslist
o Success:thetuitdisplaysuniquenumberofpeoplethatlikedthetuit o Failure:usercannotbefoundinthelist
o Failure:theuniquenumbercountdidnotincrease
• Postconditions :
o Server must add the user to the post’s list of users that liked the post o Servermustkeepacountoftheuniqueusers’likes


3. User replies to a Tuit
• Use case name : Replying to a tuit
• To reply to a tuit posted by a user
• Actors : Users, following user, System
• Preconditions :
o Postshouldexist
o Followingusershouldexist
o Followingusershouldbeauthenticated
• Actor actions :
o Usercanreplytoatuitthatexists

• System actions :
o Success:thereplyitselfisatuit
o Success:thenumberofrepliesincrease
o Failure : Error Message : the reply is not a tuit
o Failure : Error Message : the number of replies did not increase
• Postconditions :
o Servermustsaveacopyofalloftherepliesastheyaretuits
o Server must show the udpates count of replies and reply posts to
users 


4. User bookmarks a Tuit
• User case name : bookmarks a tuit
• Description : to bookmark a tuit posted by a user
• Actors : Users, following user, System
• Preconditions :
o Postshouldexist
o usershouldexist
o usershouldbeauthenticated
• Actor actions :
o Usercanbookmarksatuitthatexists
• System actions :
o Success:thetuitcanbeviewedintheuser’sbookmarkedscreen
o Failure:Errormessage:thetuitcannotbebookmarked
o Failure:Errormessage:thetuitwillnotbeintheuser’sbookmarked
screen
• Postconditions :
o Servermustsaveacopyofallofthebookmarksfortheuser o Server must update bookmarks screen for the user


5. User follows another user
• User case name : follow a user
• Description : to follow a user
• Actors : Users, following user, System
• Precondition :
o Bothusersmustexist
o Bothusersmustbeauthenticated
• Actor actions :
o User follows a user id # that exists
• System actions :
o Success:User’sfollowinglistwillhaveanotheruser
o Success:Anotheruser’sfollower’slistwillhaveuserinit o Failure:Errormessage:Userdoesnotexist
• Postconditions :
o Server must save a copy of all of the followers for the user
o Server must update followers and following screen for the user


6. User messages another user
• User case name : message a user
• Description : to message a user privately
• Actors : Users, System
• Precondition :
o Bothusersmustexist
o Bothusersmustbeauthenticated
• Actor actions :

o User messages a user id # that exists
• System actions :
o Success:User’sprivatemessagelistwilllistanotheruser o Success:Anotheruser’smessagelistwillhaveuserinit o Failure:Errormessage:Userdoesnotexist
• Postconditions :
o Server must save a copy of all of the private messages for both the
user
o Servermustupdatetheprivatemessagesscreenforboththeusers



Designing the Data Model (10pts)
https://github.com/nikithajain888/software-engineering-node/tree/main/models

Part 3: Design Patterns (40pts)
https://github.com/nikithajain888/software-engineering-node

Data dump (10pts)
https://github.com/nikithajain888/software-engineering-node/blob/main/userExport.json

https://github.com/nikithajain888/software-engineering-node/blob/main/tuitsExport.json
