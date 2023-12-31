import happyx

const PORT = 5000
const HOST = "127.0.0.1"
const ROOT = "public"

echo &"Starting server on http://{HOST}:{PORT}/"

model Echo:
  message: string

serve HOST, PORT:
  staticDir "public"

  # Everyone needs a Hello World API.
  get "/api/helloWorld":
    answerJson req, { 
      "message": "Hello, world" 
    }
  
  # Echo is fun for friends and family.
  get "/api/echo/{message:string}":
    echo &"Echoing {message}"
    answerJson req, {
      "echo": message,
    }


  get "/moved":
    answer req, &"", Http301, newHttpHeaders(
      [
        ("Content-Type", "text/plain; charset=utf-8"), 
        ("Location", "/")
      ]
    ) 

  # Redirect to index.html in the public directory
  get "/":
    answerHtml req, &"""
  <!DOCTYPE html>
  <html>
    <head>
      <meta http-equiv="Refresh" content="0; URL=/{ROOT}/index.html" />
    </head>
  </html>
    """
