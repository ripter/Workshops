
export function waitForWASM() {
  return new Promise((resolve, reject) => {
    // using the object format for the event handler to make removing easy.
    const eventHandler = {
      handleEvent: (event) => {
        document.removeEventListener('load-wasm', eventHandler);
        const {ack, wasm} = event.detail;
        // acknowledge  the beacon so it stops broadcasting.
        ack();
        // keep a refrence for debugging/prototyping.
        window.lib = wasm;
        resolve(wasm);
      }
    }

    // wait for the loaded beacon
    document.addEventListener('load-wasm', eventHandler);
  });
}
