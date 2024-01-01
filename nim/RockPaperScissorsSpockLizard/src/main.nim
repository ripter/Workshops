import happyx
import simple_parseopt

import ./ssrutils

const API_VERSION = "0.0.1"

#
# Setup Command Line Options
#
dash_dash_parameters()
let options = get_options:
    port = 5001 {. info("Port to listen on. Defaults to 5001") .}
    address = "127.0.0.1" {. info("Address to listen on. Defaults to 127.0.0.1") .}
    publicFolder = "public" {. info("Folder to serve static files from. Defaults to public") .}

# I don't know why I have to do this, but it doesn't work without it.
# These options need to be assigned to their on variables.
let PORT = options.port
let HOST = options.address
let ROOT = options.publicFolder



#
# Application Code
#
type 
  ThrownHand = enum
    thRock = "Rock"
    thPaper = "Paper"
    thScissors = "Scissors"
    thVulcan = "Vulcan"
    thLizard = "Lizard"

const HAND_OPTIONS = @[thRock, thPaper, thScissors, thVulcan, thLizard]




#
# API Endpoints
#
echo &"Starting server on http://{HOST}:{PORT}/"
serve HOST, PORT:
  staticDir "public"

  # Options describes the API endpoints and expected parameters.
  options "/api":
    return %*{
      "endpoints": [
        "/api/throw/{handA}/{handB}",
        "/api/enum/handOptions",
        "/api/version",
        "/api/echo/{message}",
        "/api/helloWorld",
      ],
      "handOptions": HAND_OPTIONS,
      "_version": API_VERSION,
    }

  # Get a list of hand options supported by the server.
  get "/api/enum/handOptions":
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
