import happyx

# Serve app at http://localhost:5000
serve "127.0.0.1", 5000:
  staticDir "public"

  # GET Method
  get "/api/hello":
    # Respond plaintext
    return "Hello, world"

  get "/":
    answerHtml req, """
  <!DOCTYPE html>
  <html>
    <head>
      <meta http-equiv="Refresh" content="0; URL=/public/index.html" />
    </head>
  </html>
    """
