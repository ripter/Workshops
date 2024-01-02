import tables
import happyx

import ./consts

proc startServer*(host:string, port:int) =
  ## JSON API Server for Rock, Paper, Scissors, Spock, Lizard
  ## This starts the server and listens for requests. 
  echo &"Starting server on http://{host}:{port}/"
  serve host, port:
    #
    # Options describes the API endpoints and expected parameters.
    options "/":
      return %*{
        "endpoints": [
          "GET /throw/{handA}/{handB}",
          "GET /handOptions",
          "GET /version",
          "GET /echo/{message}",
          "GET /helloWorld",
          "OPTIONS /",
        ],
        "handOptions": HAND_OPTIONS,
        "_version": API_VERSION,
      }

    #
    # Get a list of hand options supported by the server.
    get "/handOptions":
      return %*{
        "_version": API_VERSION,
        "handOptions": HAND_OPTIONS,
      }

    #
    # Throw a hand and see who wins.
    get "/throw/{handA}/{handB}":
      let loserList = BEATS[handA.toThrownHand()]
      var winner = handB
      if handB.toThrownHand() in loserList:
        winner = handA

      return %*{
        "_version": API_VERSION,
        "handA": handA,
        "handB": handB,
        "winner": if handA == handB: "Tie" else: winner,
      }


    #
    # Returns the API version.
    get "/version":
      return %*{
        "_version": API_VERSION,
        "version": API_VERSION,
      }
    #
    # Everyone needs a Hello World in their API.
    # Real use is to test the server is up and running.
    get "/helloWorld":
      return %*{ 
        "message": "Hello, world",
      }
    # 
    # Echo is fun for friends and family, I mean debugging.
    # Real use is to test that parameters are being passed and parsed correctly.
    get "/echo/{message:string}":
      return %*{
        "echo": message,
      }
