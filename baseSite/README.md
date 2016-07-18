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
$ touch public/js/bundle.js
```

I know, you are wondering why I called it `bundle.js`. It's because we will add weback later, and we won't have to rename this file later if we just call it build from the first place.

We can start with just a simple hello world.

```
const world = 'world';
console.log(`hello ${world}`);
```

Now we need to tell `index.html` to load our Javascript. Just add this to your page.
```
<script src="js/bundle.js"></script>
```

Switch back to the browser and refresh. You should now see `hello world` in the console!

Let's git save this! One of the nice things about git saves is that we can always restore to a known good point. We can experiment as much as we want, and we always have a solid foundation.

```
 git commit -a -m "console.log(hello world)"
 ```

## Bootstrap

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


## Webpack

We don't want to edit `public/js/build.js` forever. We want a nicer place to store and work with our javascript. We want an entry point that webpack can turn into a build file.

```
$ mkdir src
$ mv public/js/bundle.js src/index.js
$ touch webpack.config.js
$ npm install --save-dev webpack
```

We want to use [Webpack](http://webpack.github.io/docs/tutorials/getting-started/) to turn `src/index.js` into `public/js/build.js`. When it does, it will run transformations like Babel and allow us to include libraries like React and Redux.

Let's take a moment to add another make rule to run webpack. In `Makefile`

```
build:
	./node_modules/.bin/webpack
```

Next we need a config file for webpack.

In `webpack.config.js`
```
module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname + '/public/js',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};
```

Then you can build with
```
$ make build
```


Git save all our hard work.
```
$ git add --all
$ git commit -m "added webpack"
```


## Babel

Now that we have webpack to build our application. We can use it to babel transform our code.
Babel is a JavaScript compiler. It allows us to write in the latest JavaScript, but have it run on all the existing browsers. One of the problems is that a lot of users are still running old browsers. These old browsers can not run modern JavaScript. So we use babel to transform modern JavaScript into cross browser safe javascript.

Install [babel](https://babeljs.io/docs/setup/#installation) for webpack

```
$ npm install --save-dev babel-loader babel-core babel-preset-es2015
```

Now that it's installed, we need to tell webpack to start using it. We do this with a [loader](http://webpack.github.io/docs/using-loaders.html). When a file is read by webpack, it loops over all the loaders, checking the filename to test, if it matches, it passes the file to the loader. In our case babel will compile the file. By default babel won't do anything. We have to specify what transformations we want. A good starting point is the ES2015 presets. Because we are using Webpack, we have to pass in the babel config into the query property of the loader object. You might have seen people use files like `.babelrc`. That is a config used by [Babel CLI](https://babeljs.io/docs/usage/cli/). We could use that, but webpack would not read from that config.

In `webpack.config.js`
```
module: {
  loaders: [
    { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: {
      presets: ['es2015']
    }}
  ]
}
```

In order to test that everything is working. Let's put some ES6 into our file and see if Babel correctly transforms it.

In `src/index.js`
```
const square = n => n * n;

console.log(`square 4 = ${square(4)}`);
```

Build an check it out in the browser.
```
$ make Build
```

If everything worked right, you will see `square 4 = 16` on the console. If you use Chrome, you should double check that `public/js/bundle.js` has converted our es6 `square = n => n * n` into es5 `function square(n) {return n * n;};` If it didn't, you'll need to fix it before continuing on.


Git Save!
```
$ git add --all
$ git commit -m "using babel"
```


## React

Now that we have our module system (webpack) and our compiler (Babel), we can add our libraries to the project. Our core library is React. As a front end application we want to build and use components. This allows us to build up our application from shareable, re-usable, components.

```
$ install --save-dev react react-dom babel-preset-react
```

Update `webpack.config.js`
```
{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: {
  presets: ['es2015', 'react']
  }}
```

Then we need to use React in our app.
`src/index.js`

```
var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(
  <h1>Hello, React!</h1>,
  document.getElementById('app')
);
```

You can `make build` it, then open it in the browser (with console open) to see the result, a nice error message that looks like `Uncaught Invariant Violation: _registerComponent(...): Target container is not a DOM element.`

The reason we are getting that error is because we haven't given React a valid DOM element yet. [`ReactDOM.render`](https://facebook.github.io/react/docs/top-level-api.html#reactdom) takes two arguments.
* React component
* DOM element.

This will render the component (and any child components) in the DOM element provided. Since we copied the bootstrap basic template, we don't have a `<div id="app"></div>` yet. So let's add one!

Bootstrap allows you to use a grid system inside of a `.container` element. So we will use that as our base div for the app. This allows the app to use bootstrap rows and columns.
In `public/index.html`, add the div inside of `<body></body>`
```
<body>
  <div id="app" class="container-fluid"></div>
</body>
```

Build and check it out!
```
$ make build
```

The webpage should now say Hello, React!

This is a good time to git save.

```
$ git add --all
$ git commit -m "react renders"
```

### Note:
If you are having issues remembering to run `make build` after changes. You can use a tool to auto run it. I like `watch` (installed with `brew install watch`). Watch will run any bash command every 2 seconds. You can start the auto build with:
```
$ watch make build
```

Webpack also provides watching tools and there are a few dozen popular tools out there for this task. Use whatever works best for you. I personally like watch because it can run any bash command. So it works nicely with everything in my toolchain with no setup nessary.


### Reactor Time!
If you haven't noticed, we have a pattern. Get it working, Git Save, Refactor/Cleanup, Git Save again. Once we add tests we will have another step in this pattern. A beginner mistake is to skip the refactor step. This is just as important as the get it working step. We need to make sure we have a clean base to continue working. Leaving out the refactor step will cause your application to rapidly build technical debt. If we include refactoring into our normal coding style we can handle technical debt before be grows out of control, and it always gives us time to cleanup our code to something we can be proud to share with others.

So what do we need to refactor? That question can often be harder than the refactoring itself. It's easy to get into an over-engineeded refactor loop. We've fall fallen into it, and we will again. It's natural. The key is to detect it early.
The part to refactor here is that we've created a potentially confusing situation. We are using JSX inside of a .js file. Why is this confusing? because JSX is not valid JavaScript. Our compiler babel can read JavaScript and JSX, which is why our current setup works. But a developer looking at the project could be confused (including ourselves when you come back to a project weeks later.) The solution is simple. JSX files should end with a .jsx extetion, and JavaScript should end in .js.

Let's create our jsx file. `src/app.jsx`
```
$ mv src/index.js src/app.jsx
$ touch src/index.js
```

We just need to make our jsx file have a jsx extension. So we rename `src/index.js` to `src/app.jsx`. This file is our root application. All other components we load will be children. Next we need to tell our entry point `src/index.js` to use the application. Thanks to the module system webpack, this is easy.

First we have to tell webpack which loader should handle a `.jsx` file.
In `webpack.config.js`, Update the Babel loader to this:
```
{ test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader', query: {
	presets: ['es2015', 'react']
	}}
```

All we did was ad `x?` to the babel test. In regex `?` means match anything that has `x` or doesn't have `x`. So it will match all `*.js` and `*.jsx` files.
Now that webpack knows how to handle the jsx files. We can just require it in!

Replace `src/index.js`
```
const app = require('./app.jsx');
```

Now
```
$ make build
```

And everything should still work! Now as you build react components, you can give them `.jsx` extensions.

Git and Save!

```
$ git add --all
$ git commit -m "webpack supports .jsx files"
$ git push
```
