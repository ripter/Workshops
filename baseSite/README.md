# Base Web Project.
### By Chris Richards

## Development System
* Webpack
* Babel
* Make
* Eslint
* Mocha

## Libraries
* React
* Redux
* Bootstrap


# Initial Setup
The first thing we need is a simple html hello world page. All web apps are served on the web. The goal is to create a base web project. Since I like to start with a nice modern base, we will use React with Redux as our main front end Libraries.

We need an html page to serve, and a server to serve it. Since we are creating just a front end base, we can use a really simple server.
I'm a big fan of [http-server](https://www.npmjs.com/package/http-server) because it's so simple. It's an npm package, so we need to setup npm first.

```
npm init
```

Fill out the form for npm. It doesn't really matter what you put in there unless you want to publish on npm.
Next we will install http-server. The website says to install it globally, but I think that's a bad idea. The reason to install it globally is to not have to type or remember to type something like `./node_modules/.bin/http-server` every time you want to start the server. It's a lot easer to type `http-server` instead. Installing globally allows this. But it has some side effects, like all globals in programming. One, you are assuming that everyone that wants to run your web app has http-server globally installed. It also assumes that they know what http-server is and to use it. These can be helped with good documentation. It doesn't remove the issue of remembering all the proper flags to pass. In the case of http-server we don't need to pass anything, but as we extend our toolset, we will.

```
npm install --save-dev http-server
```

We save it in our package.json file. That way it can be installed with a simple `npm install`.

Now we need something to serve. By default the server will serve out of the `public/` folder. So let's put a basic html page for it and start the server. We start the server last because it will run and output the server logs as it runs.

```
$ mkdir public
$ touch public/index.html
$ ./node_modules/.bin/http-server
```

I since we will be using [Bootstrap](http://getbootstrap.com/getting-started/#download) I copy the basic template and paste it into `public/index.html`.

You have to leave the server running, so you'll need to open a new terminal tab. If you `ctl-c` the server, then it will kill the program.

```
$ open http://localhost:8080/
```

Yay! We now have a working server. Now is a great time to clean up a little. Using a tool called [GNU Make](http://www.gnu.org/software/make/manual/make.html) we will make some easy to use short cuts.

Instead of typing `./node_modules/.bin/http-server` we will type `make server`. This approach has several advantages. It means we can keep our tools local instead of global. We can have it automataclly installed with `npm install` so it doesn't matter if the user already has it installed or not.

```
$ touch Makefile
```

The documentation for make looks scary, but it's actually a basic concept. The `make` command takes a number of rules as arguments and runs them. If you are fermilur with bash alas, this is smilier. A rule runs a series of bash commands. So anything you can do on the command line, you can automate with Make.

```
.PHONY: server

server:
	./node_modules/.bin/http-server
```

Now we can run `make server` to start the server!

We created a single rule called `server` that make can run. This rule will run the bash command `./node_modules/.bin/http-server`. We get the nice short syntax of the global, without the downsides of makeing it global.

Now git save all your hard work!
```
$ git commit -a -m "run with make server"
$ git push
```



## Javascript

Now that we have a webpage to host our app, we need to get it loading some code. The static files are being servered out og `public/` so if we want to include some Javascript with `<script>` it will have to be in somewhere in `public/`.

```
$ mkdir public/js
$ touch public/js/build.js
```

I know, you are wondering why I called it `build.js`. It's because we will add weback later, and we won't have to rename this file later if we just call it build from the first place.

We can start with just a simple hello world.

```
const world = 'world';
console.log(`hello ${world}`);
```

Now we need to tell `index.html` to load our Javascript. Just add this to your page.
```
<script src="js/build.js"></script>
```

Switch back to the browser and refresh. You should now see `hello world` in the console!

Let's git save this! One of the nice things about git saves is that we can always restore to a known good point. We can experiment as much as we want, and we always have a solid foundation.

```
 git commit -a -m "console.log(hello world)"
 ```


Let's do some cleanup. If you used the bootstrap basic template like I did, you probably have three errors in the console. The basic template assumes you have the style downloaded and are not using the cdn. We could download the files but I find that the cdn is fine most of the time. If you are in a situation where you don't always have internet access. Just download the files and put them in `public/css` and `public/js`.

In `public/index.html` take out the old bootstrap references and replace them with these:

```
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">

<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
```

This was copied from http://getbootstrap.com/getting-started/#download in the CDN section.


If you are reading the getbootstrap.com website, you will see lots of ways to install bootstrap. Including npm and bower. I find that for most projects, anything more than the minified files is unnecessary. We can utilize bootstrap without having to extend it or even going into their sass/less. Some web apps will need to do all those things, but I find that most do not. So we are going to focus on the common case.

 
