import { Group, SphereGeometry, MeshBasicMaterial, Mesh } from 'three';
import { loadModel } from './loadModel.mjs';

export class Level {
  /**
   * Loads a level from the given URL.
   * @param {string} url 
   */
  constructor(config) {
    console.log('Loading Level...', config);
    this.config = {
      ...config,
    };
    this.scene = new Group();
    this.defs = new Map();

    // Show the grid center points across the level
    this.addCenterPoints();
  }

  /**
   * Load the models from the level definitions.
   */
  async loadDefs() {
    const { defs } = this.config;
    const defIds = Object.keys(defs);

    // Load all the models
    defIds.forEach(async (key) => {
      const def = defs[key];
      const model = await loadModel(def.model);
      this.defs.set(key, {
        ...def,
        model,
      });
    });

  }

  /**
   * Add the center points of the grid to the scene.
   */
  addCenterPoints() {
    const { gridWidth, gridHeight } = this.config;
    for (let x = 0; x < gridWidth; x++) {
      for (let z = 0; z < gridHeight; z++) {
        const point = this.createPoint({ x: x, y: 0, z: z});
        this.scene.add(point);
      }
    }
  }

  createPoint({x, y, z}) {
    const geometry = new SphereGeometry(0.05, 32, 16);
    const material = new MeshBasicMaterial({ color: 0xffff00 });
    const sphere = new Mesh(geometry, material); 
    sphere.position.set(x, y, z);
    return sphere;
  }


  static async Load(url) {
    try {
      // Load the config from the given URL and create the Level.
      const response = await fetch(url);
      const data = await response.json();
      const level = new Level(data);
      // Load the definitions for the level. These are defined in the config.
      await level.loadDefs();


      return level;
    }
    catch (error) {
      console.error('Failed to load level', error);
    }
  }
}