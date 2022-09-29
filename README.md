# Friver

Friver is a website for rideshare drivers. Drivers create a profile that showcases other services they provide. Drivers are also porvided a Qr code that they can share with passengers that will lead them straight to their profile.

**Link to project:** https://friver.herokuapp.com/

![Screen Shot 2022-09-20 at 11 03 44 PM](https://user-images.githubusercontent.com/72674082/191427359-f9adb1f2-cc27-4988-bc61-664d89714566.png)

## How It's Made:

**Design Pattern Used:** MVC (Model, View, Controller)

**Tech used:** HTML, CSS, JavaScript, Bootstrap, Node.js, express. 

The wesbited uses html, css and js for the front-end. For the back end, it uses Node.js along with express as the enviroment. It also provides authentication to let users create and account. The authenticaton is built with passport.js and uses bycrypt to hash users passwords. MongoDB is used as the database to store user infromation and profiles. Mongoose is used along with MongoDB to have user and profile schemas. For architectural design, MVC is used to keep the website seperated into three logical components: Model, View, and Controller.

## Lessons Learned:

Throughout this project I learned the importance of mvc and the effect it can have in producing a more efficient and organized project. 
