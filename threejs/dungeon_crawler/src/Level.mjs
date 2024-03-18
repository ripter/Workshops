import { Group, SphereGeometry, MeshBasicMaterial, Mesh } from 'three';

export class Level {
  /**
   * Loads a level from the given URL.
   * @param {string} url 
   */
  constructor(config) {
    console.log('Loading Level...', config);
    this.scene = new Group();
    this.config = {
      ...config,
    };

    // Show the grid center points across the level
    this.addCenterPoints();
  }

  addCenterPoints() {
    const { gridWidth, gridHeight } = this.config;
    // const point = this.createPoint({ x: 0, y: 0, z: 0});

    for (let x = 0; x < gridWidth; x++) {
      for (let z = 0; z < gridHeight; z++) {
        console.log('Adding point at', x, z);
        const point = this.createPoint({ x: x, y: 0, z: z});
        this.scene.add(point);
      }
    }

    // this.scene.add(point);
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
      const response = await fetch(url);
      const data = await response.json();
      return new Level(data);
    }
    catch (error) {
      console.error('Failed to load level', error);
    }
  }
}