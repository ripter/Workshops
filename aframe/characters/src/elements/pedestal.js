import { html } from 'lighterhtml';

export function Pedestal(modelData) {
  return html.node`
  <a-entity class="pedestal" position="0 0 -5">
    <a-entity id="elm"
      gltf-model="#modelTexturedAnimatedMedium"
      material-2="src: #skinFantasyFemaleB"
      animation-control="actionName: Idle;"
      ></a-entity>

    <a-plane position="0 5 -0"
      width="3" height="1.5"
      color="#001f3f"
      >
      <a-text value="anim: 'Idle'\nmaterial-2: 'Fantasy B'\nbaked Alien texture\nbaked animations" align="center"></a-text>
    </a-plane>
  </a-entity>
  `
}
