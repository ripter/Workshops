import { useEffect } from 'react';

export function useWASMLoader(onLoad) {
  // using the object format for the event handler to make removing easy.
  const eventHandler = {
    handleEvent: (event) => {
      document.removeEventListener('load-wasm', eventHandler);
      const {ack, wasm} = event.detail;
      // acknowledge  the beacon so it stops broadcasting.
      ack();
      // Let the component know we have loaded.
      onLoad(wasm);
      // keep a refrence for debugging/prototyping.
      window.lib = wasm;
    }
  }

  // on mount, wait for the wasm to load.
  useEffect(() => {
    console.log('useEffect triggered on useWASMLoader', onLoad);
      // wait for the loaded beacon
      document.addEventListener('load-wasm', eventHandler);
  }, [onLoad]);
}
