/**
 * Vendor prefix polyfill for HTML 5 APIs
 */

(function (w, d, n) {
  /* jshint maxcomplexity: false */
  'use strict';

  /**
   * Blob
   * https://developer.mozilla.org/en-US/docs/Web/API/Blob
   */
  w.Blob = (w.Blob || w.mozBlob || w.webkitBlob);

  /**
   * RTCPeerConnection
   * https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection
   */
  w.RTCPeerConnection = (w.RTCPeerConnection ||
                         w.mozRTCPeerConnection ||
                         w.webkitRTCPeerConnection ||
                         w.webkitPeerConnection00);

  /**
   * RTCIceCandidate
   */
  w.RTCIceCandidate = (w.RTCIceCandidate || w.mozRTCIceCandidate);

  /**
   * RTCSessionDescription
   */
  w.RTCSessionDescription = (w.RTCSessionDescription || w.mozRTCSessionDescription);

  /**
   * URL
   * https://developer.mozilla.org/en-US/docs/Web/API/URL
   */
  w.URL = (w.URL || w.webkitURL);

  /**
   * WebSocket
   * https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
   */
  w.WebSocket = (w.WebSocket || w.MozWebSocket);

  /**
   * Window.performance
   * https://developer.mozilla.org/en-US/docs/Web/API/window.performance
   */
  w.performance = (w.performance || w.webkitPerformance);

  /**
   * Window.requestAnimationFrame
   * https://developer.mozilla.org/en/docs/Web/API/window.requestAnimationFrame
   */
  w.requestAnimationFrame = (w.requestAnimationFrame ||
                             w.mozRequestAnimationFrame ||
                             w.msRequestAnimationFrame ||
                             w.oRequestAnimationFrame ||
                             w.webkitRequestAnimationFrame);

  /**
   * Page Visibility API
   * https://developer.mozilla.org/en-US/docs/Web/Guide/User_experience/Using_the_Page_Visibility_API
   */
  if (false === 'hidden' in d) {
    d.hidden = (function () {
      if ('undefined' !== typeof d.hidden) return d.hidden;
      if ('undefined' !== typeof d.mozHidden) return d.mozHidden;
      if ('undefined' !== typeof d.msHidden) return d.msHidden;
      if ('undefined' !== typeof d.webkitHidden) return d.webkitHidden;
    })();
  }

  /**
   * Navigator.battery
   * https://developer.mozilla.org/en-US/docs/Web/API/Navigator.battery
   */
  if (false === 'battery' in n) n.battery = (n.battery || n.mozBattery);

  /**
   * Network Information API
   * https://developer.mozilla.org/en-US/docs/WebAPI/Network_Information
   */
  n.connection = (n.connection || n.mozConnection || n.webkitConnection);

  /**
   * Navigator.getUserMedia
   * https://developer.mozilla.org/en-US/docs/Web/API/Navigator.getUserMedia
   */
  n.getUserMedia = (n.getUserMedia ||
                    n.mozGetUserMedia ||
                    n.msGetUserMedia ||
                    n.webkitGetUserMedia);

  /**
   * Navigator.vibrate
   * https://developer.mozilla.org/en-US/docs/Web/API/Navigator.vibrate
   */
  n.vibrate = (n.vibrate || n.mozVibrate || n.webkitVibrate);

})(window, document, navigator);
