import happyx

const PORT = 5000
const HOST = "127.0.0.1"
const ROOT = "public"

echo &"Starting server on http://{HOST}:{PORT}/"

serve HOST, PORT:
  staticDir "public"

  # GET Method
  get "/api/hello":
    answerJson req, { 
      "message": "Hello, world" 
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
