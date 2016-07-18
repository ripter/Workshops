
/**
 * Friendly iFrame
 * Load a url inside of a same orgin iframe.
 * Pass in an api that will be placed on window.
 */
module.exports = function(url, api) {
  var iframe = document.createElement('iframe');
  var key, doc;

  // Documented by Stoyan Stefanov: https://www.facebook.com/note.php?note_id=10151176218703920
  (iframe.frameElement || iframe).style.cssText = 'width: 0; height: 0; border: 0';
  iframe.src = 'javascript:false';

  // Attach the iframe to the DOM.
  document.body.appendChild(iframe);

  // surface the api inside the iframe.
  iframe.contentWindow.API = api;

  // Now load the script at url.
  doc = iframe.contentWindow.document;
  doc.open().write(`<body onload="
    var js = document.createElement('script');
    js.src = '${url}';
    document.body.appendChild(js);">`);
  doc.close();

  return doc;
};
