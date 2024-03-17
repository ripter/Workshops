import happyx

template answerRedirect*(req: Request, location: string) =
  answer req, &"", Http301, newHttpHeaders([
    ("Content-Type", "text/plain; charset=utf-8"), 
    ("Location", location)
  ])