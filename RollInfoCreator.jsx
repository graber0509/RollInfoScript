var curDoc = app.activeDocument;
var rollInfoData = GetRollInfoDataFromLayers(curDoc);

var rollInfo = new File("C:/!MyRepos/RollInfoScript/RollInfo_TEST.xml");
rollInfo.open("w");
rollInfo.write(GetRollInfoStringFromData(rollInfoData));
rollInfo.close();
/*
TODO: 
- Check scissorSize and stopIndex requirements
- Check is nessesary slotfire in RollInfo.xml
+ make _FS, _RS etc. instead of _fs, _rs
- Develop func? to make respin rolls
+ Make button to save only RollInfo.xml
+ Do not export ROLL_INFO group (ConverterPhotoshop)
+ Delete elementSize and numElements fields in UI
- Check is ROLL_INFO Group exists
- Develop GetRollInfoDataFromRollsBackground?
- Verifying naming of groups and layers
*/
//alert(curDoc.layerSets[0].layerSets[0].artLayers[0].kind)
//////////////FUNCTIONS////////////////
/**
* Parse layers to get roll info data from ROLL_INFO layerSet. 
* @param {Photoshop_document} _curDoc Document to parse
* @returns {Object_rollInfo} if success - return Object, else - undefined;
* for example GetRollInfoData(_curDoc).ROLLS_FS[0][0].x show x-coord of 0-0 symbol position in ROLLS_FS rolls;
*/
function GetRollInfoDataFromLayers(_curDoc) 
{
    var rollInfo = {};
    var rollNum = 0;
    var symbolNum = 0;
    var rolls = [];
    var rollCoords = [];

    function SymbolCoords(_x, _y, _bounds, _isCenterCoords) 
    {
        this.x = _isCenterCoords ? _x - (0.5 * parseInt(_curDoc.width))  : _x;
        this.y = _isCenterCoords ? (0.5 * parseInt(_curDoc.height)) - _y : parseInt(_curDoc.height) - _y;
        this.width = _bounds[0];
        this.height = _bounds[1];
    }
    
    for(var i = 0; i < _curDoc.layerSets.length; i++) 
    {
        if(_curDoc.layerSets[i].name === "ROLL_INFO") 
        {

            var rollInfoGroup = _curDoc.layerSets[i];
            var counter = 1;
            var rollsName = "ROLLS";

            for(var t = 0; t < counter;) 
            {
                if(rollInfoGroup.layerSets[t].name.search("ROLLS") > -1) 
                {
                    rollsName = rollInfoGroup.layerSets[t].name;
                    counter = rollInfoGroup.layerSets.length;
                    rollInfoGroup = _curDoc.layerSets[i].layerSets[t];
          
                } 
    
                for(var j = 0; rollNum < rollInfoGroup.layerSets.length;)
                {
                    if(j >= rollInfoGroup.layerSets.length) {break}
                    if(rollInfoGroup.layerSets[j].name == "ROLL_" + rollNum) 
                    {
                        var currentRollGroup = rollInfoGroup.layerSets[j];
                        for(var k = symbolNum; symbolNum < currentRollGroup.artLayers.length;) 
                        {
                            if(k >= currentRollGroup.artLayers.length) {break}
                            if(currentRollGroup.artLayers[k].name == symbolNum) 
                            {

                                var pos    = GetPosition(currentRollGroup.artLayers[k]);
                                var bounds = GetSize(currentRollGroup.artLayers[k]);                               
                                rollCoords.push(new SymbolCoords(pos.x, pos.y, [bounds.width, bounds.height], true));

                                symbolNum++;
                                k = 0;

                            } else {
                                k++;
                            }                        
                        }
                        rolls.push(rollCoords);
                        rollCoords = [];
                        rollNum++; 
                        j = 0;
                        symbolNum = 0;
                    } else {
                        j++;
                    };
                    
                }; 
                t++;
                rollInfo[rollsName] = rolls;
                rollInfoGroup = _curDoc.layerSets[i];  
                
            };
            i = _curDoc.layerSets.length;       
        } else {
            return undefined;
        };                           
    }; 
    return rollInfo;
};
/**
* This function creates RollInfo.xml file from roll info data object. 
* @param {Object_rollInfo} _rollInfoData Roll info data object
* @return {string} Roll Info string;
*/
function GetRollInfoStringFromData(_rollInfoData) 
{
    var tab = "	";
    var rollInfoString = "<head type=\"xml\" version=\"1\"/>\n";
    
    for(var prop in _rollInfoData) 
    {

        var rollName = prop.replace("ROLLS", "").toUpperCase();
        var strX;
        var strY;
        var numElements;
        var roll;
    
        rollInfoString += "<rolls" + rollName + " scale=\"1,1\" pos=\"0,0\">\n";

            for(var i = 0; i < _rollInfoData[prop].length; i++) 
            {
                roll = _rollInfoData[prop][i];
                numElements = _rollInfoData[prop][i].length

                if(numElements % 2 == 0) 
                {
                    strX = roll[(numElements/2)-1].x;
                    strY = 2*Math.round((roll[(numElements/2)-1].y + roll[numElements/2].y)/2)/2;
                }
                else
                {
                    strX = roll[(numElements-1)/2].x;
                    strY = 2*Math.round((roll[(numElements/2)-1].y + roll[numElements/2].y)/2)/2;
                }

                //START OF BUILDING ROLL INFO TEXT LINE
                rollInfoString += tab + "<roll id=\"" + i +"\"" +
                " x=\"" + strX + "\"" +
                " y=\"" + strY + "\"" +
                " numElements=\"" + numElements + "\"" +
                " elementSize=\"" + roll[0].width + ","   + roll[0].height + "\"" +
                " scissorSize=\"" + roll[0].width*2 + "," + roll[0].height*2 + "\"" +
                " stopIndex=\"" + (i+1) + "\"" + 
                ">\n" 
                //END OF ROLL INFO TEXT LINE
            }
               
        rollInfoString += "</rolls" + rollName + ">\n";

    }

    return rollInfoString;
}
/**
* Parse layers to get roll info data from rolls backgrounds. 
* @param {Photoshop_document} _curDoc Document to parse
* @returns {Object_rollInfo} if success - return Object, else - undefined;
* for example GetRollInfoData(_curDoc).ROLLS_FS[0][0].x show x-coord of 0-0 symbol position in ROLLS_FS rolls;
*/
function GetRollInfoDataFromRollsBackground(_curDoc) 
{
 //UNDER DEVELOPMENT
}
function GetPosition(_layer, _coord_align) {
    var x1 = parseFloat(_layer.bounds[0]);
    var x2 = parseFloat(_layer.bounds[2]);
    var y1 = parseFloat(_layer.bounds[1]);
    var y2 = parseFloat(_layer.bounds[3]);

    if (x1 < 0)
        x1 = 0;
    if (y1 < 0)
        y1 = 0;
    if (x2 > app.activeDocument.width)
        x2 = app.activeDocument.width;
    if (y2 > app.activeDocument.height)
        y2 = app.activeDocument.height;

    if (false) {
        x1 = 0;
        x2 = 0;
        y1 = 0;
        y2 = 0;
    }

    switch (_coord_align) {
        case 0: {
            return {
                x: Math.round(x1),
                y: Math.round((y1 + y2) / 2),
            };
        }
        break;
        case 1: {
            return {
                x: Math.round((x1 + x2) / 2),
                y: Math.round((y1 + y2) / 2)
            };
        }
        break;
        case 2: {
            return {
                x: Math.round(x2),
                y: Math.round((y1 + y2) / 2)
            };
        }
        break;
        default: {
            return {
                x: Math.round((x1 + x2) / 2),
                y: Math.round((y1 + y2) / 2)
            };
        }
    }
}
function GetSize(_layer) {
    if (false) {
        var a = {
            width: 0,
            height: 0
        };
        return a;
    } else {
        var x1 = parseFloat(_layer.bounds[0]);
        var x2 = parseFloat(_layer.bounds[2]);
        var y1 = parseFloat(_layer.bounds[1]);
        var y2 = parseFloat(_layer.bounds[3]);

        if (x1 < 0)
            x1 = 0;
        if (y1 < 0)
            y1 = 0;
        if (x2 > curDoc.width)
            x2 = curDoc.width;
        if (y2 > curDoc.height)
            y2 = curDoc.height;

        var a = {
            width: Math.round(x2 - x1),
            height: Math.round(y2 - y1)
        };
        return a;
    }
}

/**
 * Make respin rolls from fon element
 * @param {string} _strPos roll position string
 * @param {int} _numElements Number of elements on one roll
 * @param {Array} _elementSize X,Y size of one element
 * @param {int} _startIndex Respin first element number in row
 * @returns {string} return final respin rolls string
 */
function RespinRolls(_strPos, _numElements, _elementSize, _startIndex) 
        {
            //Get position values from reel
            var startPosY = Number(_strPos.match(/y=\"(-*\d+)\"/)[1]);
            var startPosX = Number(_strPos.match(/x=\"(-*\d+)\"/)[1]);
            var strRs = "";
            var elementSizeArr = _elementSize;
            var counter = 0;

            if(typeof _elementSize == "string")
                elementSizeArr = _elementSize.split(",");

            // Check Even/Odd
            if(_numElements % 2 == 0)
                startPosY += (elementSizeArr[1]/2) + elementSizeArr[1]*((_numElements/2)-1)
            else
                startPosY += elementSizeArr[1] * Math.floor(_numElements/2);

            for(var i = _startIndex*_numElements; i < (_startIndex*_numElements)+Number(_numElements); i++)
                strRs += "    <roll id =\"" + i + "\" x=\""+startPosX+"\" y=\"" + (2*Math.round(Number(startPosY-(elementSizeArr[1]*counter++))/2)) + "\" numElements=\"1\" elementSize=\""+_elementSize+"\" stopIndex=\""+(i+1)+"\" scissorSize=\""+ elementSizeArr[0]*2 + "," + elementSizeArr[1]*2 + "\"/>\n"; 

            strRs += "\n";
            return strRs;
}