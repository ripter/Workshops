function _update()
  if game_state == 'running' then
  	for wall in all(walls) do
      wall_update(wall)
    end
  end
end


function wall_update(self)
  if not self.enabled then
    self.delay -= 1
    if self.delay <= 0 then
      self.enabled = true
    end
    return
  end

  self.x -= 2.5
  if self.x <= -16 then
    wall_restart(self)
  end
end


function wall_restart(self)
  self.x = 128
  self.enabled = false
  self.delay = 30 + flr(rnd(10))
end
