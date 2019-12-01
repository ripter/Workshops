import { getMesh } from './utils/getMesh';

const { shaders } = AFRAME;
const shaderNames = Object.keys(AFRAME.shaders);

/**
* Patched version of material
*/
AFRAME.registerComponent('material-2', {
  schema: {
    alphaTest: { default: 0.0, min: 0.0, max: 1.0 },
    depthTest: { default: true },
    depthWrite: { default: true },
    flatShading: { default: false },
    npot: { default: false },
    offset: { type: 'vec2', default: { x: 0, y: 0 } },
    opacity: { default: 1.0, min: 0.0, max: 1.0 },
    repeat: { type: 'vec2', default: { x: 1, y: 1 } },
    shader: { default: 'standard', oneOf: shaderNames, schemaChange: true },
    side: { default: 'front', oneOf: ['front', 'back', 'double'] },
    transparent: { default: false },
    vertexColors: { type: 'string', default: 'none', oneOf: ['face', 'vertex'] },
    visible: { default: true },
    blending: { default: 'normal', oneOf: ['none', 'normal', 'additive', 'subtractive', 'multiply'] },
  },

  init() {
    this.material = null;
    this.system = this.el.sceneEl.systems.material;
  },

  /**
  * Update or create material.
  *
  * @param {object|null} oldData
  */
  update(oldData) {
    const { data } = this;
    if (!this.shader || data.shader !== oldData.shader) {
      this.updateShader(data.shader);
    }
    this.shader.update(this.data);
    this.updateMaterial(oldData);
  },

  updateSchema(data) {
    let currentShader;
    let newShader;
    let schema;
    let shader;

    newShader = data && data.shader;
    currentShader = this.oldData && this.oldData.shader;
    shader = newShader || currentShader;
    schema = shaders[shader] && shaders[shader].schema;

    if (!schema) { error(`Unknown shader schema ${shader}`); }
    if (currentShader && newShader === currentShader) { return; }
    this.extendSchema(schema);
    this.updateBehavior();
  },

  updateBehavior() {
    let key;
    const { sceneEl } = this.el;
    const { schema } = this;
    const self = this;
    let tickProperties;

    function tickTime(time, delta) {
      let key;
      for (key in tickProperties) {
        tickProperties[key] = time;
      }
      self.shader.update(tickProperties);
    }

    this.tick = undefined;

    tickProperties = {};
    for (key in schema) {
      if (schema[key].type === 'time') {
        this.tick = tickTime;
        tickProperties[key] = true;
      }
    }

    if (!sceneEl) { return; }
    if (this.tick) {
      sceneEl.addBehavior(this);
    } else {
      sceneEl.removeBehavior(this);
    }
  },

  updateShader(shaderName) {
    const { data } = this;
    const Shader = shaders[shaderName] && shaders[shaderName].Shader;
    let shaderInstance;

    if (!Shader) { throw new Error(`Unknown shader ${shaderName}`); }

    // Get material from A-Frame shader.
    shaderInstance = this.shader = new Shader();
    shaderInstance.el = this.el;
    shaderInstance.init(data);
    this.setMaterial(shaderInstance.material);
    this.updateSchema(data);
  },

  /**
  * Set and update base material properties.
  * Set `needsUpdate` when needed.
  */
  updateMaterial(oldData) {
    const { data } = this;
    const { material } = this;
    let oldDataHasKeys;

    // Base material properties.
    material.alphaTest = data.alphaTest;
    material.depthTest = data.depthTest !== false;
    material.depthWrite = data.depthWrite !== false;
    material.opacity = data.opacity;
    material.flatShading = data.flatShading;
    material.side = parseSide(data.side);
    material.transparent = data.transparent !== false || data.opacity < 1.0;
    material.vertexColors = parseVertexColors(data.vertexColors);
    material.visible = data.visible;
    material.blending = parseBlending(data.blending);

    // Check if material needs update.
    for (oldDataHasKeys in oldData) { break; }
    if (oldDataHasKeys
      && (oldData.alphaTest !== data.alphaTest
        || oldData.side !== data.side
        || oldData.vertexColors !== data.vertexColors)) {
      material.needsUpdate = true;
    }
  },

  /**
  * Remove material on remove (callback).
  * Dispose of it from memory and unsubscribe from scene updates.
  */
  remove() {
    const defaultMaterial = new THREE.MeshBasicMaterial();
    const { material } = this;
    const object3D = this.el.getObject3D('mesh');
    if (object3D) { object3D.material = defaultMaterial; }
    disposeMaterial(material, this.system);
  },

  /**
  * (Re)create new material. Has side-effects of setting `this.material` and updating
  * material registration in scene.
  *
  * @param {object} data - Material component data.
  * @param {object} type - Material type to create.
  * @returns {object} Material.
  */
  setMaterial(material) {
    const { el } = this;
    let mesh;
    const { system } = this;

    if (this.material) { disposeMaterial(this.material, system); }

    this.material = material;
    system.registerMaterial(material);

    // Get the mesh and set/replace the existing material
    getMesh(el).then((mesh) => {
      // SkinnedMesh needs skinning turned on for animations to work.
      if (mesh.type === 'SkinnedMesh') {
        material.skinning = true;
      }
      // Update the mesh with the new material.
      mesh.material = material;
    });
  },
});


/**
 * Return a three.js constant determining which material face sides to render
 * based on the side parameter (passed as a component property).
 *
 * @param {string} [side=front] - `front`, `back`, or `double`.
 * @returns {number} THREE.FrontSide, THREE.BackSide, or THREE.DoubleSide.
 */
function parseSide(side) {
  switch (side) {
    case 'back': {
      return THREE.BackSide;
    }
    case 'double': {
      return THREE.DoubleSide;
    }
    default: {
      // Including case `front`.
      return THREE.FrontSide;
    }
  }
}

/**
 * Return a three.js constant determining vertex coloring.
 */
function parseVertexColors(coloring) {
  switch (coloring) {
    case 'face': {
      return THREE.FaceColors;
    }
    case 'vertex': {
      return THREE.VertexColors;
    }
    default: {
      return THREE.NoColors;
    }
  }
}

/**
 * Return a three.js constant determining blending
 *
 * @param {string} [blending=normal]
 * - `none`, additive`, `subtractive`,`multiply` or `normal`.
 * @returns {number}
 */
function parseBlending(blending) {
  switch (blending) {
    case 'none': {
      return THREE.NoBlending;
    }
    case 'additive': {
      return THREE.AdditiveBlending;
    }
    case 'subtractive': {
      return THREE.SubtractiveBlending;
    }
    case 'multiply': {
      return THREE.MultiplyBlending;
    }
    default: {
      return THREE.NormalBlending;
    }
  }
}

/**
 * Dispose of material from memory and unsubscribe material from scene updates like fog.
 */
function disposeMaterial(material, system) {
  material.dispose();
  system.unregisterMaterial(material);
}
