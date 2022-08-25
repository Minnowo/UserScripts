

javascript:(
    
    function f()
    {
        function download(data, filename, type) 
        {
            var file = new Blob([data], {type: type});
            if (window.navigator.msSaveOrOpenBlob) // IE10+
            {
                window.navigator.msSaveOrOpenBlob(file, filename);
            }
            else  // Others
            {
                var a = document.createElement("a");
                var url = URL.createObjectURL(file);
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                setTimeout(function() {
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);  
                }, 0); 
            }
        }

        var video_elements = document.querySelectorAll('[id=video-title]');

        var links = [];
        for(var i of video_elements)
        {
            links.push(i.href.split("&list=")[0]);
            
        }

        download(links.join("\n"), "playlist.txt", 'text/plain')
    }()
)


