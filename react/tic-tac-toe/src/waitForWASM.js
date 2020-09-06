
export function waitForWASM() {
  return new Promise((resolve, reject) => {
    // using the object format for the event handler to make removing easy.
    const eventHandler = {
      handleEvent: (event) => {
        document.removeEventListener('load-wasm', eventHandler);
        const {ack, wasm} = event.detail;
        ack(); // acknowledge  the beacon so it stops broadcasting.
        resolve(wasm); // resolve the promise.
      }
    }

    // wait for the loaded beacon
    document.addEventListener('load-wasm', eventHandler);
  });
}
