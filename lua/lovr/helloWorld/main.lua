
function lovr.draw()
  local angle = lovr.timer.getTime()
  lovr.graphics.cube('fill', 0, 1.7, -1, .5, angle)
end
