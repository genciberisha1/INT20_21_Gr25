/*
    This script is used to initialize the webpage.
    It is created for the purpose of keeping index.html
    as clean as possible.
    Loads all the css files and js files that
    that need to be loaded.

    -USAGE---
    just add the path of your stylesheet(css file) or
    script(js file)  on in the same way they are added below(line 21).

    **NOTE** if your file needs a special attribute when loaded
              ping me @genci

    Cheers
*/

(function () {
  var tag = '';  //var for tag that needs to be loaded
  let attribs = new Map(); //map to hold the tag attributes
  var SRCS = [ // an array of your  file's paths
              'css/baza.css',
              'js/nav.js',
              "js/Dark_Mode.js",
              "js/input.js",
              'https://fonts.googleapis.com/css?family=Roboto Mono',
              
            ];


 // looping through the array and with a switch{} statement, we
 // determen the files extensions
  for(var i=0;i<SRCS.length;i++){
    var extension = SRCS[i].substr(SRCS[i].lastIndexOf('.') + 1);
    switch (extension) {
      case 'css':
        tag = 'link';
        attribs.set('href',SRCS[i]);
        attribs.set('rel','stylesheet');
        break;
      case 'js':
        tag = 'script';
        attribs.set('src',SRCS[i]);
        attribs.set('type','text/javascript');
        break;
      default:
        tag = 'link'; // for the default state I suspect that its a font URL
        attribs.set('href',SRCS[i]);
        attribs.set('rel','stylesheet');

        break;
    }

    var injected_tag = document.createElement(tag); // tag OBJ to inject(load)

    for(const [attrib,value] of attribs){ // looping thorught the map and adding the tag attributes
      injected_tag.setAttribute(attrib,value);
    }

    attribs.clear(); // we clear the map for the next iteraation

    document.head.appendChild(injected_tag);
    console.log('Loaded file : ' + SRCS[i]);


  }
})();
