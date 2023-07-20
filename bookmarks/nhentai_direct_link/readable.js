javascript:(

    async function()
    {
        function filter(e, predicate)
        {
            for(var o of e)
            {
                if(predicate(o))
                    return o;
            }

            return null; 
        }

        function openURI(uri, name) 
        {
            var link = document.createElement("a");
            link.setAttribute('download', name);
            link.href = uri;
            document.body.appendChild(link);
            link.click();
            link.remove();
        }


        const bigcontainer = document.getElementById("bigcontainer");
        const info_block  = filter(bigcontainer.children, function(element){ return element.id.toLowerCase() == "info-block"; });
        const info        = filter(info_block.children  , function(element){ return element.id.toLowerCase() == "info"; });

        if(!info)
            return; 

        const gallery_Id   = filter(info.children, function(e){ return e.tagName.toLowerCase() == "h3";}).textContent.match(/(\d+)/)[1];

        const cover = document.getElementById("cover");
        const re = new RegExp("https://..\.nhentai\.net/galleries/([0-9]+)/");
        const api = cover.textContent.match(re);

        if(!api)
            return;

        const api_json = `https://nhentai.net/api/gallery/${gallery_Id}`;
        const api_url = api[0].replace(/https:\/\/(.)/, "https://i");

        fetch(api_json)
        .then(x => x.json())
        .then(json => {
            const ext = {'p' : "png", 'j': 'jpg', 'g' : 'gif'};

            var i = 0;
            var file_contents = "";
            for(var image_ext of json['images']['pages'])
            {
                const image_url = `${api_url}${++i}.${ext[image_ext['t']]}`;

                file_contents += image_url + "\n";
            }

            var blob = new Blob([file_contents], { type: 'text/plain' });
            var url = URL.createObjectURL(blob);

            openURI(url, `${gallery_Id}.txt`);
        });
    }()
) 
