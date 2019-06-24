
/**
 * Movement System
 * Each tick, the system checks `agent.movementVector`
 * @type {Array}
 */
AFRAME.registerSystem('movement', {
  init() {
    this.needsRefresh = true;
    this.agents = [];
    this.solidObjects = [];
    this.intersections = [];
    this.direction = new THREE.Vector3();
    this.raycaster = new THREE.Raycaster();
    // this.raycaster.far = 0.5;
  },

  refreshSolidObjects() {
    this.needsRefresh = false;
    this.solidObjects = Array.from(document.querySelectorAll('.solid')).map(el => el.object3D);
  },


  tick(/*time, delta*/) {
    const { agents, direction, needsRefresh } = this;

    if (needsRefresh) {
      this.refreshSolidObjects();
    }

    // Update the position of all the agents
    agents.forEach((component) => {
      const { el, movementVector } = component;
      if (!movementVector) { return; }
      direction.copy(movementVector).normalize();

      if (this.checkCollision(el.object3D.position, direction)) {
        console.log('intersections', this.intersections);
      }

      // direction.multiplyScalar(10);
      // console.log('direction', direction);
      // el.setAttribute('line', `color:red;start:${el.object3D.position.x},${el.object3D.position.y},${el.object3D.position.y}; end:${direction.x},${direction.y},${direction.z}`);
      // el.setAttribute('line', `color:red;start:${el.object3D.position.x},${el.object3D.position.y},${el.object3D.position.z}; end:${el.object3D.position.x},${el.object3D.position.y},${el.object3D.position.z -3}`);

      // console.log('movementVector', movementVector, movementVector.clone().normalize());
      // Add the movementVector each tick if it exists.
      el.object3D.position.add(movementVector);
    });
  },

  checkCollision(origin, direction) {
    const { raycaster, solidObjects } = this;
    raycaster.far = 10;
    // raycaster.set(origin, direction);
    raycaster.set(origin, new THREE.Vector3(0, 0, -1));

    if (!this._didRay) {
      drawRay(raycaster.ray);
      this._didRay = true;
    }

    this.intersections.length = 0;
    raycaster.intersectObjects(solidObjects, false, this.intersections);
    // console.log('ray', raycaster.ray.direction);
    return this.intersections.length > 0;
  },

  /**
   * Adds a component as an agent of the system.
   * Each tick, the system checks for agent.movementVector
   */
  addAsAgent(agent) {
    this.agents.push(agent);
  },
});


function drawRay(ray) {
  const el = window.elRayTest;
  const { direction } = ray;
  const origin = new THREE.Vector3();
  el.object3D.getWorldPosition(origin);

  // const start = `start: ${origin.x},${origin.y-1},${origin.z-3};`;
  // const end = `end: ${direction.x},${direction.y},${direction.z};`;
  const start = `start: ${0},${1.50},${0};`;
  const end = `end: ${0},${1.5},${-13};`;
  const line = `color: #B10DC9; ${start} ${end}`;
  // console.log('line', el, line);
  el.setAttribute('line', line);
}
