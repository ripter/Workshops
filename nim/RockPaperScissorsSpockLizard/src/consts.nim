const API_VERSION* = "0.0.1"

type 
  ThrownHand* = enum
    thRock = "Rock"
    thPaper = "Paper"
    thScissors = "Scissors"
    thSpock = "Spock"
    thLizard = "Lizard"

const HAND_OPTIONS* = @[thRock, thPaper, thScissors, thSpock, thLizard]



# Terminal colors
const coRed* = "\x1b[31m"
const coGreen* = "\x1b[32m"
const coYellow* = "\x1b[33m"
const coBlue* = "\x1b[34m"
const coMagenta* = "\x1b[35m"
const coEnd* = "\x1b[0m"