## Bare-bones SDL2 example
import sdl2

discard sdl2.init(INIT_EVERYTHING)

var
  window: WindowPtr
  render: RendererPtr

window = createWindow("SDL Skeleton", 100, 100, 640,480, SDL_WINDOW_OPENGL or SDL_WINDOW_RESIZABLE or SDL_WINDOW_SHOWN)
render = createRenderer(window, -1, Renderer_Accelerated or Renderer_PresentVsync or Renderer_TargetTexture)

var
  evt = sdl2.defaultEvent
  runGame = true

while runGame:
  while pollEvent(evt):
    if evt.kind == QuitEvent:
      runGame = false
      break

  render.setDrawColor 0,0,0,255
  render.clear

  # SDL_SetRenderDrawColor(render, 255,0,0,255)
  render.setDrawColor 255,0,0,255
  # SDL_RenderFillRect(render, Rect(100,100,100,100))
  var drawRect: Rect = rect(100,100,100,100)
  render.fillRect(drawRect)
  render.present

destroy render
destroy window
