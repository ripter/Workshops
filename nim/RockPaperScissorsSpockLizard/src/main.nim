import happyx
import ./ssrutils

const PORT = 5000
const HOST = "127.0.0.1"
const ROOT = "public"



echo &"Starting server on http://{HOST}:{PORT}/"
serve HOST, PORT:
  staticDir "public"

  # Everyone needs a Hello World API.
  get "/api/helloWorld":
    return %*{ 
      "message": "Hello, world",
    }
  
  # Echo is fun for friends and family.
  get "/api/echo/{message:string}":
    return %*{
      "echo": message,
    }

  # Redirect to index.html in the public directory
  get "/":
    answerRedirect req, &"/{ROOT}/index.html"
