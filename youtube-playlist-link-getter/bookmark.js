javascript:(function f(){var b=document.querySelectorAll("[id=video-title]"),a=[];for(var c of b)a.push(c.href.split("&list=")[0]);!function(d,b,e){var c=new Blob([d],{type:e});if(window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(c,b);else{var a=document.createElement("a"),g=URL.createObjectURL(c);a.href=g,a.download=b,document.body.appendChild(a),a.click(),setTimeout(function(){document.body.removeChild(a),window.URL.revokeObjectURL(g)},0)}}(a.join("\n"),"playlist.txt","text/plain")}())