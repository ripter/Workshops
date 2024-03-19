import { Group, SphereGeometry, MeshBasicMaterial, Mesh } from 'three';
import { loadModel } from './loadModel.mjs';
import { xyToIndex } from './xyToIndex.mjs';

export class Level {
  /**
   * Loads a level from the given URL.
   * @param {string} url 
   */
  constructor(config) {
    console.log('Loading Level...', config);
    this.config = {
      extends: null,
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

    // Create an array of promises for loading all the models
    const loadPromises = defIds.map(async (key) => {
      const def = defs[key];
      const model = await loadModel(def.model);
      this.defs.set(key.toString(), {
        ...def,
        model,
      });
    });

    // Wait for all models to load
    return await Promise.all(loadPromises);
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


  addMapMesh() {
    const { map, gridWidth, gridHeight } = this.config;

    for (let x = 0; x < gridWidth; x++) {
      for (let z = 0; z < gridHeight; z++) {
        const index = xyToIndex(gridWidth, x, z);
        const defID = map[index];
        if (!defID) continue;
        const def = this.defs.get(defID.toString());
        const model = def.model.clone();
        model.position.set(x, 0, z);
        this.scene.add(model);
      }
    }
  }

  /**
   * Loads the Level from a config file.
   * @param {string} url 
   * @returns 
   */
  static async Load(url) {
    try {
      // Load the config from the given URL and create the Level.
      const response = await fetch(url);
      const data = await response.json();
      const level = new Level(data);
      // Load the definitions for the level. These are defined in the config.
      await level.loadDefs();

      level.addMapMesh();

      return level;
    }
    catch (error) {
      console.error('Failed to load level', error);
    }
  }
}