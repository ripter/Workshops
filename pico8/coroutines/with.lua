function _update()
  update_walls()
end


function update_walls()
	if game_state != 'running' then
		return
	end

	for wall in all(walls) do
		if not wall.co then
			wall.co = cocreate(anim_wall)
		else
			coresume(wall.co, wall)
		end
	end
end


function anim_wall(self)
	while true do
		-- wait until delay ends
		for i=self.delay,0,-1 do
			yield()
		end

		-- reset the wall
		self.x = 128
		self.delay = 30 + flr(rnd(10))
		repeat
			self.x -= 2.5
			yield()
		until self.x <= -16
	end
end
