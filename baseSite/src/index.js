window.TOUT = {
  // Called when a slot has loaded on the page and waiting for our response.
  loadSlot(elm, intervalID) {
    // Cancel the call home.
    clearInterval(intervalID);

    // Do whatever we want here.
    console.log('loaded slot', elm);
  },

  // This will create a slot with id
  createSlot(id) {
    var slotCode = '!function(a){var b=setInterval(function(){window.TOUT&&TOUT.loadSlot(a,b)},100)}("'+id+'");'
    var div = document.createElement('div');
    var script = document.createElement('script');

    div.id = id;
    script.innerHTML = slotCode;
    div.appendChild(script);
    return div;
  }
};
