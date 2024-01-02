import tables
import happyx

import ./consts
import ./ssrutils

proc startServer*(host:string, port:int, publicFolder: string) =
  ## Starts the Server
  echo &"Starting server on http://{host}:{port}/"
  serve host, port:
    staticDir publicFolder 

    # Options describes the API endpoints and expected parameters.
    options "/api":
      return %*{
        "endpoints": [
          "/api/throw/{handA}/{handB}",
          "/api/handOptions",
          "/api/version",
          "/api/echo/{message}",
          "/api/helloWorld",
        ],
        "handOptions": HAND_OPTIONS,
        "_version": API_VERSION,
      }

    # Get a list of hand options supported by the server.
    get "/api/handOptions":
      return %*{
        "_version": API_VERSION,
        "handOptions": HAND_OPTIONS,
      }

    get "/api/throw/{handA}/{handB}":
      echo &"handA: {handA}, handB: {handB}"
      var winner = handB
      let loserList = BEATS[handA.toThrownHand()]
      echo &"loserList: {loserList}"
      if handB.toThrownHand() in loserList:
        winner = handA

      return %*{
        "_version": API_VERSION,
        "handA": handA,
        "handB": handB,
        "winner": if handA == handB: "Tie" else: winner,
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
      answerRedirect req, &"/{publicFolder}/index.html"