pico-8 cartridge // http://www.pico-8.com
version 27
__lua__
-- fate dice roller
-- by ripter001

local result = {}

-- rolls 4 FATE dice
function roll()
  result = {}
  for i=1,4 do
   add(result, flr(rnd(3))-1)
  end
end


function _init()
  roll()
end

-- press any key to re-roll the dice
function _update()
  if btnp() > 0 then
  	roll()
  end
end


function _draw()
	cls(2)
	
	-- draw the 4 dice
	draw_dice(result[1], 18, 16)
	draw_dice(result[2], 42, 16)
	draw_dice(result[3], 66, 16)
	draw_dice(result[4], 90, 16)

	-- display adjective
	draw_adjective(43, 40)
end

-- draw a dice with value
function draw_dice(value, x, y)
	local sprite = 70

	if value == 1 then
 	sprite = 72
 elseif value == -1 then
   sprite = 74
	end

	spr(sprite,    x,   y)
	spr(sprite+1,  x+8, y)
	spr(sprite+16, x,   y+8)
	spr(sprite+17, x+8, y+8)
end

-- the adjective ladder
function draw_adjective(x, y)
	local total = 0
	for k,v in pairs(result) do
		total = total + v
	end
	
	local adjs = {
		"horrifying",
		"catastrophic",
		"terrible",
		"poor",
		"mediocre",
		"average",
		"fair",
		"good",
		"great",
		"superb",
		"fantastic",
		"epic",
		"legendary",
	}
	
	local adj = adjs[total+5]
	local label = total.." "..adj
	print(label, x, y)
end
__gfx__
66666666666666666666666666666666555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
62222222222222222222222222222226577777777777777777777777777777755777777777777777777777777777777557777777777777777777777777777775
62222222222222222222222222222226576666666666666666666666666666755766666666666666666666666666667557666666666666666666666666666675
62222222222222222222222222222226576000000000000000000000000006755760000000000000000000000000067557600000000000000000000000000675
62222222222222222222222222222226576000000000000000000000000006755760000000000066600000000000067557600000000000000000000000000675
62222222222222222222222222222226576000000000000000000000000006755760000000000077700000000000067557600000000000000000000000000675
62222222222222222222222222222226576000000000000000000000000006755760000000000077700000000000067557600000000000000000000000000675
62222222222222222222222222222226576000000000000000000000000006755760000000000077700000000000067557600000000000000000000000000675
62222222222222222222222222222226576000000000000000000000000006755760000000000077700000000000067557600000000000000000000000000675
62222222222222222222222222222226576000000000000000000000000006755760000000000077700000000000067557600000000000000000000000000675
62222222222222222222222222222226576000000000000000000000000006755760000000000077700000000000067557600000000000000000000000000675
62222222222222222222222222222226576000000000000000000000000006755760000000000077700000000000067557600000000000000000000000000675
62222222222222222222222222222226576000000000000000000000000006755760000000000077700000000000067557600000000000000000000000000675
62222222222222222222222222222226576000000000000000000000000006755760066666666677766666666600067557600000000000000000000000000675
62222222222222222222222222222226576006666666666666666666666006755760077777777777777777777750067557600000000000000000000000000675
62222222222222222222222222222226576007777777777777777777777506755760077777777777777777777750067557600000000000000000000000000675
62222222222222222222222222222226576007777777777777777777777506755760077777777777777777777750067557600000000000000000000000000675
62222222222222222222222222222226576000555555555555555555555506755760055555555577755555555550067557600000000000000000000000000675
62222222222222222222222222222226576000000000000000000000000006755760000000000077750000000000067557600000000000000000000000000675
62222222222222222222222222222226576000000000000000000000000006755760000000000077750000000000067557600000000000000000000000000675
62222222222222222222222222222226576000000000000000000000000006755760000000000077750000000000067557600000000000000000000000000675
62222222222222222222222222222226576000000000000000000000000006755760000000000077750000000000067557600000000000000000000000000675
62222222222222222222222222222226576000000000000000000000000006755760000000000077750000000000067557600000000000000000000000000675
62222222222222222222222222222226576000000000000000000000000006755760000000000077750000000000067557600000000000000000000000000675
62222222222222222222222222222226576000000000000000000000000006755760000000000077750000000000067557600000000000000000000000000675
62222222222222222222222222222226576000000000000000000000000006755760000000000077750000000000067557600000000000000000000000000675
62222222222222222222222222222226576000000000000000000000000006755760000000000077750000000000067557600000000000000000000000000675
62222222222222222222222222222226576000000000000000000000000006755760000000000000000000000000067557600000000000000000000000000675
62222222222222222222222222222226576000000000000000000000000006755760000000000000000000000000067557600000000000000000000000000675
62222222222222222222222222222226576666666666666666666666666666755766666666666666666666666666667557666666666666666666666666666675
62222222222222222222222222222226577777777777777777777777777777755777777777777777777777777777777557777777777777777777777777777775
66666666666666666666666666666666555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
06666666666666600666666666666660066666666666666026666666666666622666666666666662266666666666666200000000000000000000000000000000
66000000000000666600000000000066660000000000006666222222222222666622222222222266662222222222226600000000000000000000000000000000
60000000000000066000000000000006600000000000000662222222222222266222222222222226622222222222222600000000000000000000000000000000
60066000000000066000000000000006600660000000000662222222222222266222222662222226622222222222222600000000000000000000000000000000
60066000000000066000000000000006600660000000000662222222222222266222222662222226622222222222222600000000000000000000000000000000
60000000000000066000000000000006600000000000000662222222222222266222222662222226622222222222222600000000000000000000000000000000
60000000000000066000000000000006600000000000000662222222222222266222222662222226622222222222222600000000000000000000000000000000
60000000000000066000000660000006600000066000000662222222222222266226666666666226622666666666622600000000000000000000000000000000
60000000000000066000000660000006600000066000000662222222222222266226666666666226622666666666622600000000000000000000000000000000
60000000000000066000000000000006600000000000000662222222222222266222222662222226622222222222222600000000000000000000000000000000
60000000000000066000000000000006600000000000000662222222222222266222222662222226622222222222222600000000000000000000000000000000
60000000000660066000000000000006600000000006600662222222222222266222222662222226622222222222222600000000000000000000000000000000
60000000000660066000000000000006600000000006600662222222222222266222222662222226622222222222222600000000000000000000000000000000
60000000000000066000000000000006600000000000000662222222222222266222222222222226622222222222222600000000000000000000000000000000
66000000000000666600000000000066660000000000006666222222222222666622222222222266662222222222226600000000000000000000000000000000
06666666666666600666666666666660066666666666666026666666666666622666666666666662266666666666666200000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
__label__
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222226666666666666622222222226666666666666622222222226666666666666622222222226666666666666622222222222222222222222
22222222222222222266222222222222662222222266222222222222662222222266222222222222662222222266222222222222662222222222222222222222
22222222222222222262222222222222262222222262222222222222262222222262222222222222262222222262222222222222262222222222222222222222
22222222222222222262222222222222262222222262222226622222262222222262222226622222262222222262222226622222262222222222222222222222
22222222222222222262222222222222262222222262222226622222262222222262222226622222262222222262222226622222262222222222222222222222
22222222222222222262222222222222262222222262222226622222262222222262222226622222262222222262222226622222262222222222222222222222
22222222222222222262222222222222262222222262222226622222262222222262222226622222262222222262222226622222262222222222222222222222
22222222222222222262266666666662262222222262266666666662262222222262266666666662262222222262266666666662262222222222222222222222
22222222222222222262266666666662262222222262266666666662262222222262266666666662262222222262266666666662262222222222222222222222
22222222222222222262222222222222262222222262222226622222262222222262222226622222262222222262222226622222262222222222222222222222
22222222222222222262222222222222262222222262222226622222262222222262222226622222262222222262222226622222262222222222222222222222
22222222222222222262222222222222262222222262222226622222262222222262222226622222262222222262222226622222262222222222222222222222
22222222222222222262222222222222262222222262222226622222262222222262222226622222262222222262222226622222262222222222222222222222
22222222222222222262222222222222262222222262222222222222262222222262222222222222262222222262222222222222262222222222222222222222
22222222222222222266222222222222662222222266222222222222662222222266222222222222662222222266222222222222662222222222222222222222
22222222222222222226666666666666622222222226666666666666622222222226666666666666622222222226666666666666622222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222

__map__
0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
0000040506070000000c0d0d0f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00001c46472f0000001c46471f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00002c56572f0000001c56571f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00003c3d3d3f0000003c3e3e3f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
