import tables

const API_VERSION* = "0.0.1"

type 
  ThrownHand* = enum
    thRock = "Rock"
    thPaper = "Paper"
    thScissors = "Scissors"
    thSpock = "Spock"
    thLizard = "Lizard"

const HAND_OPTIONS* = @[thRock, thPaper, thScissors, thSpock, thLizard]

const BEATS* = {
  thRock: @[thScissors, thLizard],
  thPaper: @[thRock, thSpock],
  thScissors: @[thPaper, thLizard],
  thSpock: @[thScissors, thRock],
  thLizard: @[thSpock, thPaper]
}.toTable()


proc toThrownHand*(s: string): ThrownHand =
  case s
  of "Rock": return thRock
  of "Paper": return thPaper
  of "Scissors": return thScissors
  of "Spock": return thSpock
  of "Lizard": return thLizard
  else: raise newException(ValueError, "Invalid string for ThrownHand: " & s)
