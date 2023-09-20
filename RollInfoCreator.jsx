alert(app.activeDocument.layerSets[9].artLayers[4].reflect.properties)

// var nameLayer = "fonRS";
// alert(/^fon/gi.test(nameLayer));
// alert(nameLayer.slice(3));

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