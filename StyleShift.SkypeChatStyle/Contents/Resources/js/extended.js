/*
 * StyleShift JS for Skype 5 Mac
 * last update: 2010-11-06
 *
 * Copyright (C) 2010 Davide 'Folletto' Casali
 * Released under BSD License.
 */

var Extended = {
  
  init: function () {
    /*SCS.conv.appendItem = this.hook.appendItem; // I'd love to hook cleanly... */
  },
  
  hook: {
    /*appendItem: function(html, scroll) {
      if (_container.length > 0) {
          var atEnd = self._nearBottom();
          
          // \/ INJECTION
          html = Extended.extend.enhanceMessage(html);
          // /\ INJECTION
          
          if ($("#typing").length > 0) {
              $("#conversation #typing").before(html);
          } else {
              _container.append(html);
          }
          if (scroll && atEnd) {
              self.scrollToEnd();
          }
          return SCS.err.showError(200, "appendItem");
      } else {
          return SCS.err.showError(510, "appendItem");
      }
    }*/ 
  },
  
  emoticons: {
      "sheep": "sheep.jpg",
      "partysnake": "partysnake.gif"
  },
  
  extend: {
    enhanceMessage: function(html) {
      /****************************************************************************************************
       * Enhance the written message
       *
       * -> Injected in: SCS.Conversation.appendItem()
       * -> Html template: InMessage.html
       */
      
      //html = html.replace(/(http:\/\/www.flickr.com\/photos\/([a-z0-9@]+_)\/([0-9]+)\/)/i, '<a href="#"><img src="" /></a>');
      
      // IMAGE SUBSTITUTION
      html = html.replace(/>(http:\/\/([\S]+\.(jpg|jpeg|png|gif)))<\/a>/ig, '><img src="$1" class="ex-image" /></a>');
      
      // EMOTICONS
      $.each(Extended.emoticons, function(key, value){
          html = html.replace("("+key+")", '<img src="gfx/emoticons/'+value+'" class="emoticon styleshift_emoticon" />');
      });
      
      // TEST
      html = html.replace(/#flickr/i, '<a href="http://www.flickr.com"><img src="http://l.yimg.com/g/images/en-us/flickr-yahoo-logo.png.v3" /></a>');
      
      return html;
    }
  }
}

$(document).ready(function() {
  Extended.init();
});