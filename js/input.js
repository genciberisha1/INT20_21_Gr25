
function format(cmd,value){
    var editor = document.getElementById('right-editor-workspace');
  
  
    document.execCommand(cmd,false,value);
    editor.focus();
  }
  
  function input(){
    var editor = document.getElementById('right-editor-workspace');
    var newN = document.createElement("p");
    console.log("created the element");
    editor.appendChild(newN);
    // newN.innerHTML = '$$\\frac{a}{1-a^2}$$';
    newN.innerHTML = "$$\\int$$";
    MathJax.typeset(document.body.div);
  };
  