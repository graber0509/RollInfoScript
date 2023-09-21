
//   <roll id="0" x="-228" y="-115" numElements="4" elementSize="110,80" stopIndex="1" scissorSize="110,320"  slotfirePath="Rolls/slotfire"/>
var strPos = "x=\"-228\" y=\"-115\"";
var rolls = "";
var numElements = [110,80];
//var elementSize = [110,80];

alert(typeof numElements == "string")


  
// function RespinRolls(strPos, numElements, elementSize) 
// {
//     //Get Y value from reel
//     var startPosY = Number(strPos.match(/y=\"(-*\d+)\"/)[1]);
//     var strRs = "";

//     // Check Even/Odd
//     if(numElements % 2 == 0)
//         startPosY += (elementSize[1]/2) + elementSize[1]*((numElements/2)-1)
//     else
//         startPosY += elementSize[1] * Math.floor(numElements/2);

//     for(var i = 0; i < numElements; i++)
//         strRs += "<roll id =\"" + i + "\" x=\"-228\" y=\"" + Number(startPosY-(elementSize[1]*i)) + "\" numElements=\"1\" elementSize=\"110,80\" stopIndex=\"1\" scissorSize=\"112,80\"/>\n"; 

//     return strRs;
// }
// rolls += RespinRolls(strPos, numElements, elementSize);
// var rollInfo = new File("C:/!MyRepos/RollInfoScript/RollInfo_RS.xml");
// rollInfo.open("w");
// rollInfo.write(rolls);
// rollInfo.close();

// alert(strPos);
// alert(strPos.match(/y=\"(-*\d+)\"/)[1]);