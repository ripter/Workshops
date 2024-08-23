import { Group, SphereGeometry, MeshBasicMaterial, Mesh, Vector3, Vector2 } from 'three';
import { loadModel } from './loadModel.mjs';
import { xyToIndex } from './xyToIndex.mjs';


// Default values for a tile definitions
const DEFAULT_DEF_VALUES = {
  model: null,
  sprite: null,
  impassable: false,
}


export class Level {
  /**
   * Loads a level from the given URL.
   * @param {string} url 
   */
  constructor(config) {
    this.config = {
      extends: null,
      ...config,
    };
    this.scene = new Group();
    this.defs = new Map();
    this.map = config.map.map(id => id.toString());

    // Show the grid center points across the level
    // this.addCenterPoints();
  }

  get widthInTiles() {
    return parseInt(this.config.gridWidth, 10);
  }
  get heightInTiles() {
    return parseInt(this.config.gridHeight, 10);
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
      const model = def.model && await loadModel(def.model);
      this.defs.set(key.toString(), {
        // Default Values
        ...DEFAULT_DEF_VALUES,
        // Config Values
        ...def,
        // Model Values
        model,
      });
    });

    // Wait for all models to load
    return await Promise.all(loadPromises);
  }

  /**
   * Returns the tile at the given position.
   * Uses the x and z coordinates to find the tile ID.
   * @param {Vector3} position 
   */
  getTileBy3DPosition(position) {
    const { widthInTiles: width, heightInTiles: height } = this;
    const { map } = this;
    const x = Math.floor(position.x);
    const z = Math.floor(position.z);
    // If the position is outside the grid, return null
    if (x < 0 || x >= width || z < 0 || z >= height) {
      return null;
    }
    const tileId = map[xyToIndex(width, x, z)];
    const def = this.defs.get(tileId);
    return {
      id: tileId,
      ...def,
    };
  }

  getTileBy2DPosition(x, y) {
    return this.getTileBy3DPosition(new Vector3(x, 0, y));
  }

  /**
   * Finds a set piece that matches the given criteria. 
   * Example: Find the Player Spawn Point with `{type: 'spawn', who: 'player'}`
   * @param {Object} criteria 
   * @returns 
   */
  findSetPiece(criteria) {
    const { setPieces } = this.config;

    // Loop through each key-value pair in the set pieces
    for (const [key, value] of Object.entries(setPieces)) {
      // Assume the set piece matches until proven otherwise
      let matches = true;

      // Check each key-value pair in the criteria
      for (const [critKey, critValue] of Object.entries(criteria)) {
        // If the set piece doesn't have the property or it doesn't match, mark as not a match
        if (value[critKey] !== critValue) {
          matches = false;
          break; // Exit the inner loop early since this set piece doesn't match
        }
      }

      // If all criteria matched, return the set piece
      const keyAsNumbers = key.split(',').map(Number);
      const keyAsVectors = new Vector2(...keyAsNumbers);
      
      if (matches) {
        return { key, position: keyAsVectors, ...value };
      }
    }

    // Return null if no matching set piece was found
    return null;
  }

  /**
   * Add the center points of the grid to the scene.
   */
  addCenterPoints() {
    const { widthInTiles: width, heightInTiles: height } = this;
    for (let x = 0; x < width; x++) {
      for (let z = 0; z < height; z++) {
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
    const { widthInTiles: width, heightInTiles: height } = this;
    const { map } = this;

    for (let x = 0; x < width; x++) {
      for (let z = 0; z < height; z++) {
        const index = xyToIndex(width, x, z);
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