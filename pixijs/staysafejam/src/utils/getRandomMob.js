import { MOBS } from '../consts/mobs';

// Returns a random MOB meta with matching name.
export function getRandomMob(name) {
  const list = MOBS.filter((i) => i.names.includes(name));
  return list[0 | Math.random() * list.length];
}
