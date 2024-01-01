const API_VERSION* = "0.0.1"

type 
  ThrownHand* = enum
    thRock = "Rock"
    thPaper = "Paper"
    thScissors = "Scissors"
    thSpock = "Spock"
    thLizard = "Lizard"

const HAND_OPTIONS* = @[thRock, thPaper, thScissors, thSpock, thLizard]