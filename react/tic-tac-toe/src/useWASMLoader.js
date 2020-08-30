import { useEffect } from 'react';

export function useWASMLoader(onLoad) {
  // on mount, wait for the wasm to load.
  useEffect(() => {
      // wait for the loaded beacon
      document.addEventListener('load-wasm', (event) => {
        const {ack, wasm} = event.detail;
        // acknowledge  the beacon so it stops broadcasting.
        ack();
        // Let the component know we have loaded.
        onLoad(wasm);
      });
  },[]);
}
