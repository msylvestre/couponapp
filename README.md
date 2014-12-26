couponapp
=========

Prototype of a coupon management app in node.js

### Installation & Run Instruction

Open command line
Create a directory and go in it
```
$ md couponapp
$ cd couponapp
```

Clone the app
```
$ git clone https://github.com/msylvestre/couponapp.git
```

Install the dependencies
```
$ npm install
```

Start the web server locally
```
$ grunt serve
```


### Deployment on Heroku

Build the app
```
$ grunt build
```

Deploy on heroku
```
$ grunt deploy
```

Open the browser
```
$ heroku open
```

You may have to to run it with the "-app" param
```
$ heroku open --app couponapp
```


### Setup of the app

Come from yeoman scaffold with angular + bootstrap

*Prerequisite*
- nodejs.org
- git-scm.org
- toolbelt.heroku.com

Verify you have the pre-requisite
```
$ node --version
$ npm --version
$ git --version
$ heroku --version
```

Install the depencies of the tutorial of the todo list on yeoman.io
```
$ npm install --global yo bower grunt-cli
```

Verify yo, bower and grunt are installed
```
$ yo --version && bower --version && grunt --version
```

Install the angular generator
```
$ npm install --global generator-angular@0.9.2
```

Create a directory and go in it
```
$ md couponapp
$ cd couponapp
```

Generate the application scaffold
```
$ yo angular
```
Then say "no" for sass and "yes" for bootstrap.
Choose all the dependencies in the list to install

Install bower package
```
$ bower install --save angular-ui-sortable
$ bower install --save jquery-ui
$ bower install --save angular-local-storage
```

Run the Karma unit test
```
$ grunt test
```

Run grunt test and build the app.
```
$ grunt
```

You can also running just the build
```
$ grunt build
```

Preview your built app
```
$ grunt serve:dist
```

Prepare the app to be depoyed on Heroku
> Follow this tutorial: https://gist.github.com/micjamking/9539467

#### Below is part of the instruction

Create the heroku app
```
$ heroku create <app_name>
```

If it already exist verify you have a remote called "heroku"
```
$ git remote -v
```

If not create it 
```
$ git remote add heroku https://git.heroku.com/couponapp.git
```

Deploy on heroku
```
$ grunt deploy
```

Start the app if it's not already running
```
$ heroku ps:scale web=1
```

You may have to to run it with the "-app" param
```
$ heroku ps:scale web=1 --app couponapp
```

Open the browser
```
$ heroku open
```

You may have to to run it with the "-app" param
```
$ heroku open --app couponapp
```


### References

#### Tools
http://node.js
http://angular.js
http://yeoman.io/codelab


#### Languages
> TODO: Add the css + angular reference

#### Deployment on Heroku
https://gist.github.com/micjamking/9539467

