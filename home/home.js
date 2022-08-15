$(document).ready(function () {
    $('.mediPlayer').mediaPlayer();
});

// var _gaq = _gaq || [];
//       _gaq.push(['_setAccount', 'UA-36251023-1']);
//       _gaq.push(['_setDomainName', 'jqueryscript.net']);
//       _gaq.push(['_trackPageview']);
    
//       (function() {
//         var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
//         ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
//         var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
//       })();

(function( $ ) {
    "use strict";
    $(function() {
        function animated_contents() {
            $(".zt-skill-bar > div ").each(function (i) {
                var $this  = $(this),
                    skills = $this.data('width');

                $this.css({'width' : skills + '%'});

            });
        }
        
        if(jQuery().appear) {
            $('.zt-skill-bar').appear().on('appear', function() {
                animated_contents();
            });
        } else {
            animated_contents();
        }
    });
}(jQuery));