import happyx
import ./ssrutils

const PORT = 5000
const HOST = "127.0.0.1"
const ROOT = "public"

const API_VERSION = "0.0.1"


type 
  ThrownHand = enum
    thRock = "Rock"
    thPaper = "Paper"
    thScissors = "Scissors"
    thVulcan = "Vulcan"
    thLizard = "Lizard"

const HAND_OPTIONS = @[thRock, thPaper, thScissors, thVulcan, thLizard]




echo &"Starting server on http://{HOST}:{PORT}/"
serve HOST, PORT:
  staticDir "public"

  options "/api":
    return %*{
      "endpoints": [
        "/api/handOptions",
        "/api/throw/{handA}/{handB}",
        "/api/version",
        "/api/echo/{message}",
        "/api/helloWorld",
      ],
      "handOptions": HAND_OPTIONS,
    }

  # Get a list of hand options supported by the server.
  get "/api/handOptions":
    return %*{
      "_version": API_VERSION,
      "handOptions": HAND_OPTIONS,
    }


  # Returns the AP version.
  get "/api/version":
    return %*{
      "_version": API_VERSION,
      "version": API_VERSION,
    }


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
