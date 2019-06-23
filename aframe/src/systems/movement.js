
/**
 * Movement System
 * Each tick, the system checks `agent.movementVector`
 * @type {Array}
 */
AFRAME.registerSystem('movement', {
  init() {
    this.agents = [];
  },


  tick(/*time, delta*/) {
    const { agents } = this;

    // Update the position of all the agents
    agents.forEach((component) => {
      const { el, movementVector } = component;
      if (!movementVector) { return; }
      // Add the movementVector each tick if it exists.
      el.object3D.position.add(movementVector);
    });
  },

  /**
   * Adds a component as an agent of the system.
   * Each tick, the system checks for agent.movementVector
   */
  addAsAgent(agent) {
    this.agents.push(agent);
  },
});
