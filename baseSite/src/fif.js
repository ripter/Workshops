// Documented by Stoyan Stefanov: https://www.facebook.com/note.php?note_id=10151176218703920

module.exports = function(url) {
  var where = document.getElementsByTagName('script')[0];
  var iframe = document.createElement('iframe');
  var doc;

  (iframe.frameElement || iframe).style.cssText = 'width: 0; height: 0; border: 0';
  iframe.src = 'javascript:false';

  where.parentNode.insertBefore(iframe, where);
  doc = iframe.contentWindow.document;
  doc.open().write('<body onload="'+
    'var js = document.createElement(\'script\');'+
    'js.src = \''+ url +'\';'+
    'document.body.appendChild(js);">');
  doc.close();

  return doc;
};
