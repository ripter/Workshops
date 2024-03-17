import happyx
import simple_parseopt

import ./server
import ./termclrs


#
# Setup Command Line Options
#
dash_dash_parameters()
help_text(
  &"\n{coBlink}{coBold}JSON API{coReset} for {coBold}{coBrightRed}Rock{coReset}, {coBold}{coBrightMagenta}Paper{coReset}, {coBold}{coBrightYellow}Scissors{coReset}, {coBold}{coBrightBlue}Spock{coReset}, {coBold}{coBrightGreen}Lizard{coReset}",
  &"\nYou can get a list of available endpoints from the OPTIONS method.\nExample:\n    curl -X OPTIONS -i http://127.0.0.1:5001/")

let options = get_options:
    port = 5001 {. info("Port to listen on. Defaults to \x1b[1m 5001 \x1b[0m") .}
    address = "127.0.0.1" {. info("Address to listen on. Defaults to \x1b[1m 127.0.0.1 \x1b[0m") .}

# I don't know why I have to do this, but it doesn't work without it.
# These options need to be assigned to their on variables.
let PORT = options.port
let HOST = options.address


startServer(HOST, PORT)