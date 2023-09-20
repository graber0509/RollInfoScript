var fonSets = app.activeDocument.layerSets;

var pathF = "C:/!MyRepos/RollInfoScript/Result/skin/aboba/loh/dcp"
alert(pathF.replace(/\w+$/gi, ""));

// for (var i = 0; i < fonSets.length; i++) {
//   if (/fonFS/.test(fonSets[i].name)) {
//     for(var j = 0; j < fonSets[i].layers.length; j++) 
//     {
//         alert(calcCoordinates(fonSets[i].artLayers[j]));
//     }  
//   } 
// }

// function calcCoordinates(layer) 
// {
//     var fonX_hor = layer.bounds[0];
//     var fonY_hor = layer.bounds[2];
//     var centerX = (fonX_hor+fonY_hor)/2;

//     var centerHor = centerX-(app.activeDocument.width/2);

//     return centerHor
// }