import happyx
import simple_parseopt

import ./fab
import ./consts
import ./server


#
# Setup Command Line Options
#
help_text(&"\nJSON API for {coRed}Rock{coEnd}, {coMagenta}Paper{coEnd}, {coYellow}Scissors{coEnd}, {coBlue}Spock{coEnd}, {coGreen}Lizard{coEnd}\n")
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


startServer(HOST, PORT, ROOT)