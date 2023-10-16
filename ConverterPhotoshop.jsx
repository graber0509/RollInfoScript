/**
 * Taras Dovgal
 * 19-11-2013
 */

//$.level=2;//enable debugging
var C_TYPE = "xsp"; // XmlSpritePhotoshop
var C_CONVERTER_VERSION = 0;
var C_SCRIPT_VERSION = "3." + C_CONVERTER_VERSION + ".0";

//////////////////////////////////////////////////
// CUSTOM DATA
//////////////////////////////////////////////////
{
    /**
     * keys of parameters for write and read from psd
     */
    var SCustomDataKeys = {
        m_nameSpace: "http://www.alcomi.com/",
        m_prefix: "ananas:",
        m_isCentered: "isCentered",
        m_isCheckJPG: "isCheckJPG",
        m_isUseTextEffects: "isUseTextEffects",
        m_borderSize: "borderSize",
        m_isFolderName: "isFolderName",
        m_isRollInfo: "isRollInfo"
    };

    /**
     * structure with custom parameters
     * @returns {SCustomData}
     */
    function SCustomData() {
        this.m_isCentered = false;
        this.m_isCheckJPG = false;
        this.m_isUseTextEffects = false;
        this.m_borderSize = 0;
        this.m_isFolderName = false;
        this.m_error = 0;
    };

    function CPsdCustomData() {
        /**
         * save custom parameters to psd file. For totaly save need save psd file after that function
         * @param {Object_params} _customData pbject params. Use SCustomData object, 
         * or use line like this: {m_isCentered:true,m_isCheckJPG:true,m_isUseTextEffects:true,m_borderSize:0}
         * @returns {Boolean} if success - return true, else - return false
         */
        this.SaveData = function(_customData) {
            var result = false;

            var isCentered = _customData.m_isCentered || false;
            var isCheckJPG = _customData.m_isCheckJPG || false;
            var isUseTextEffects = _customData.m_isUseTextEffects || false;
            var borderSize = _customData.m_borderSize || 0;
            var isFolderName = _customData.m_isFolderName || false;
            var isRollInfo = _customData.m_isRollInfo || false;

            var save_isCentered = _customData.m_isCentered !== undefined;
            var save_isCheckJPG = _customData.m_isCheckJPG !== undefined;
            var save_isUseTextEffects = _customData.m_isUseTextEffects !== undefined;
            var save_borderSize = _customData.m_borderSize !== undefined;
            var save_isFolderName = _customData.m_isFolderName !== undefined;
            var save_isRollInfo = _customData.m_isRollInfo !== undefined;

            if (!documents.length) {
                result = false;
            } else {
                if (ExternalObject.AdobeXMPScript === undefined) {
                    ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
                }
                var xmp = new XMPMeta(activeDocument.xmpMetadata.rawData);

                XMPMeta.registerNamespace(SCustomDataKeys.m_nameSpace, SCustomDataKeys.m_prefix);

                if (save_isCentered)
                    xmp.setProperty(SCustomDataKeys.m_nameSpace, SCustomDataKeys.m_isCentered, isCentered);
                if (save_isCheckJPG)
                    xmp.setProperty(SCustomDataKeys.m_nameSpace, SCustomDataKeys.m_isCheckJPG, isCheckJPG);
                if (save_isUseTextEffects)
                    xmp.setProperty(SCustomDataKeys.m_nameSpace, SCustomDataKeys.m_isUseTextEffects, isUseTextEffects);
                if (save_borderSize)
                    xmp.setProperty(SCustomDataKeys.m_nameSpace, SCustomDataKeys.m_borderSize, borderSize);
                if (save_isFolderName)
                    xmp.setProperty(SCustomDataKeys.m_nameSpace, SCustomDataKeys.m_isFolderName, isFolderName);
                if (save_isRollInfo)
                    xmp.setProperty(SCustomDataKeys.m_nameSpace, SCustomDataKeys.m_isRollInfo, isRollInfo);

                app.activeDocument.xmpMetadata.rawData = xmp.serialize();
                result = true;
            }

            return result;
        };
        /**
         * get custom data from psd file
         * @returns {SCustomData} structure with custom parameters
         */
        this.GetData = function() {
            var cdata = new SCustomData();

            if (!documents.length) {
                cdata.m_error = -1;
            } else {
                if (ExternalObject.AdobeXMPScript === undefined) {
                    ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
                }
                var xmp = new XMPMeta(activeDocument.xmpMetadata.rawData);

                var tmp_isCentered = "";
                var tmp_isCheckJPG = "";
                var tmp_isUseTextEffects = "";
                var tmp_borderSize = "";
                var tmp_isFolderName = "";
                var tmp_isRollInfo = "";

                try {
                    tmp_isCentered = xmp.getProperty(SCustomDataKeys.m_nameSpace, SCustomDataKeys.m_isCentered);
                } catch (e) {}
                try {
                    tmp_isCheckJPG = xmp.getProperty(SCustomDataKeys.m_nameSpace, SCustomDataKeys.m_isCheckJPG);
                } catch (e) {}
                try {
                    tmp_isUseTextEffects = xmp.getProperty(SCustomDataKeys.m_nameSpace, SCustomDataKeys.m_isUseTextEffects);
                } catch (e) {}
                try {
                    tmp_borderSize = xmp.getProperty(SCustomDataKeys.m_nameSpace, SCustomDataKeys.m_borderSize);
                } catch (e) {}
                try {
                    tmp_isFolderName = xmp.getProperty(SCustomDataKeys.m_nameSpace, SCustomDataKeys.m_isFolderName);
                } catch (e) {}
                try {
                    tmp_isRollInfo = xmp.getProperty(SCustomDataKeys.m_nameSpace, SCustomDataKeys.m_isRollInfo);
                } catch (e) {}
                //DEFAULT VALUES
                tmp_isCentered = tmp_isCentered             === undefined ? "true" : tmp_isCentered;
                tmp_isCheckJPG = tmp_isCheckJPG             === undefined ? "false" : tmp_isCheckJPG;
                tmp_isUseTextEffects = tmp_isUseTextEffects === undefined ? "false" : tmp_isUseTextEffects;
                tmp_borderSize = tmp_borderSize             === undefined ? "0" : tmp_borderSize;
                tmp_isFolderName = tmp_isFolderName         === undefined ? "false" : tmp_isFolderName;
                tmp_isRollInfo = tmp_isRollInfo             === undefined ? "false" : tmp_isRollInfo;

                cdata.m_isCentered                          = "true" === tmp_isCentered.toString().toLowerCase();
                cdata.m_isCheckJPG                          = "true" === tmp_isCheckJPG.toString().toLowerCase();
                cdata.m_isUseTextEffects                    = "true" === tmp_isUseTextEffects.toString().toLowerCase();
                cdata.m_borderSize                          = parseInt(tmp_borderSize.toString());
                cdata.m_isFolderName                        = "true" === tmp_isFolderName.toString().toLowerCase();
                cdata.m_isRollInfo                          = "true" === tmp_isRollInfo.toString().toLowerCase();

                cdata.m_borderSize                          = isNaN(cdata.m_borderSize) ? 0 : cdata.m_borderSize;
            }

            return cdata;
        };
    };
}

//////////////////////////////////////////////////
// CONVERTER
//////////////////////////////////////////////////
{
    function SParams() {
        /**
         * Path to dir for save all sprites
         * @type String
         */
        this.pathF = "";
        /**
         * Handle of current Photoshop document
         * @type Photoshop_document
         */
        this.curDoc = app.activeDocument;
        /**
         * line to save to xml with layer position
         * @type String
         */
        this.positions = "";
        /**
         * width of current document
         * @type Number
         */
        this.docWidth = 0;
        /**
         * height of current document
         * @type Number
         */
        this.docHeight = 0;

        
        /**
         * version of converter
         * @type String
         */
        this.m_version = C_SCRIPT_VERSION;
        /**
         * move center of coordinats to current document center
         * @type Boolean
         */
        this.m_centered = false;
        /**
         * save all non transparent layers as JPG files
         * @type Boolean
         */
        this.m_checkJPG = false;
        /**
         * use text effects in calculation text position
         * @type Boolean
         */
        this.m_useTextEffects = false;
        /**
         * Add border to transparent layer
         * @type Boolean
         */
        this.m_addBorder = false;
        /**
         * create "folderName" parameter in file information handler
         */
        this.m_isFolderName = false;
        /**
         * create "RollInfo.xml" file
         */
        this.m_isRollInfo = false;
        /**
         * adding border size
         * @type Number
         */
        this.m_addBorderSize = 1;
        /**
         * progress bar level
         * @type Number
         */
        this.m_stopProgressBar = 0;

        /**
         * handle of progress bar
         * @type Photoshop GUI control handler
         */
        this.hPB_progress = undefined;
        /**
         * handle of static in progress bar
         * @type Photoshop GUI control handler
         */
        this.hSt_layerName = undefined;
        /**
         * Default roll info group name
         * @type string
         */
        this.defaultRollInfoGroupName = "ROLL_INFO";
        /**
         * Default single roll group name
         * @type string
         */
        this.defaultRollGroupName = "ROLL_";
        /**
         * Default rolls group name
         * @type string
         */
        this.defaultRollsGroupName = "ROLLS";
        /**
         * Default respin group name
         * @type string
         */
        this.defaultRespinGroupName = "_RS";    
    };

    var G_PARAMS = new SParams();

    function  CConverter() {
        /**
         * Check is layer empty
         * @param {Photoshop_layer} _layer Photoshop layer
         */
        function IsEmptyLayer(_layer) {
            var isEmpty = false;

            if ((0 === _layer.bounds[2]) // width = 0
                &&
                (0 === _layer.bounds[3])) // height = 0
            {
                isEmpty = true;
            }

            return isEmpty;
        }
        /**
         * Get size of layer
         * @param {Photoshop_layer} _layer Photoshop layer
         * @returns {CConverter.GetSize.a} return array with two items with width and hight
         */
        function GetSize(_layer) {
            if (IsEmptyLayer(_layer) === true) {
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
                if (x2 > G_PARAMS.curDoc.width)
                    x2 = G_PARAMS.curDoc.width;
                if (y2 > G_PARAMS.curDoc.height)
                    y2 = G_PARAMS.curDoc.height;

                var a = {
                    width: Math.round(x2 - x1),
                    height: Math.round(y2 - y1)
                };
                return a;
            }
        }
        /**
         * Get layer position
         * @param {Photoshop_layer} _layer Photoshop layer
         * @param {int} _coord_align align of layer: 0 - left, 1 - center, 2 - right
         * @returns {CConverter.GetPosition.Anonym$0|CConverter.GetPosition.Anonym$3|CConverter.GetPosition.Anonym$1|CConverter.GetPosition.Anonym$2} return array with two items with x and y
         */
        function GetPosition(_layer, _coord_align) {
            var x1 = parseFloat(_layer.bounds[0]);
            var x2 = parseFloat(_layer.bounds[2]);
            var y1 = parseFloat(_layer.bounds[1]);
            var y2 = parseFloat(_layer.bounds[3]);

            if (x1 < 0)
                x1 = 0;
            if (y1 < 0)
                y1 = 0;
            if (x2 > G_PARAMS.curDoc.width)
                x2 = G_PARAMS.curDoc.width;
            if (y2 > G_PARAMS.curDoc.height)
                y2 = G_PARAMS.curDoc.height;

            if (IsEmptyLayer(_layer) === true) {
                x1 = 0;
                x2 = 0;
                y1 = 0;
                y2 = 0;
            }

            switch (_coord_align) {
                case 0: {
                    return {
                        x: Math.round(x1),
                        y: Math.round((y1 + y2) / 2)
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
        /**
         * Remove all effects from current active layer
         */
        function clearAllLayerEffects() {
            try {
                var desc = new ActionDescriptor();
                var ref = new ActionReference();
                ref.putEnumerated(stringIDToTypeID("layer"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"));
                desc.putReference(stringIDToTypeID("target"), ref);
                executeAction(stringIDToTypeID("disableLayerFX"), desc, DialogModes.NO);
            } catch (e) {}
        }
        /**
         * Get position of text layer
         * @param {Photoshop_layer} _layer Photoshop layer
         * @param {int} _coord_align align of layer: 0 - left, 1 - center, 2 - right
         * @param {bool} _useEffects use text effets in calculation
         * @returns {unresolved} return array with two items with x and y
         */
        function GetPositionText(_layer, _coord_align, _useEffects) {
            if (_useEffects) {
                return GetPosition(_layer, _coord_align);
            } else {
                var doc;
                var pos;
                var original_bounds;
                var tmpActiveDoc = app.activeDocument;
                var tmpActiveLayer = app.activeDocument.activeLayer;

                app.activeDocument.activeLayer = _layer;
                original_bounds = _layer.bounds;
                doc = app.documents.add(G_PARAMS.curDoc.width, G_PARAMS.curDoc.height, 72, _layer.name, NewDocumentMode.RGB, DocumentFill.TRANSPARENT);

                app.activeDocument = tmpActiveDoc;
                _layer.duplicate(doc, ElementPlacement.PLACEATBEGINNING);

                app.activeDocument = doc;
                clearAllLayerEffects();

                pos = GetPosition(doc.layers[0], _coord_align);

                doc.close(SaveOptions.DONOTSAVECHANGES);
                app.activeDocument = tmpActiveDoc;
                app.activeDocument.activeLayer = tmpActiveLayer;

                return pos;
            }
        }
        /**
         * Get color of pixel
         * @param {Photoshop_layer} _layer Photoshop layer
         * @param {int} _x poition x
         * @param {int} _y position y
         * @returns {SolidColor} retrun SolidColor (red, green, blue)
         */
        function GetPixelColor(_layer, _x, _y) {

            function selectBounds(docTmp1, b) {
                docTmp1.selection.select([
                    [b[0], b[1]],
                    [b[2], b[1]],
                    [b[2], b[3]],
                    [b[0], b[3]]
                ]);
            }

            function findPV(h) {
                for (var i = 0; i <= 255; i++) {
                    if (h[i]) {
                        return i;
                    }
                }

                return 0;
            }

            var oldDoc = app.activeDocument;
            app.activeDocument.activeLayer = _layer;

            var docTmp = app.documents.add(oldDoc.width, oldDoc.height, 72, _layer.name, NewDocumentMode.RGB, DocumentFill.TRANSPARENT);
            app.activeDocument = oldDoc;
            _layer.duplicate(docTmp, ElementPlacement.PLACEATBEGINNING);
            app.activeDocument = docTmp;

            selectBounds(docTmp, [_x, _y, _x + 1, _y + 1]);

            var pColour = new SolidColor();

            pColour.rgb.red = findPV(docTmp.channels[0].histogram); //"Red"
            pColour.rgb.green = findPV(docTmp.channels[1].histogram); //"Green"
            pColour.rgb.blue = findPV(docTmp.channels[2].histogram); //"Blue"

            docTmp.selection.deselect();
            docTmp.close(SaveOptions.DONOTSAVECHANGES);
            app.activeDocumen = oldDoc;

            return pColour;
        }
        /**
         * Make select of transparent pixels.
         * this need for checking layer transparent property
         */
        function SelectTransparency() {
            var desc52 = new ActionDescriptor();
            var ref47 = new ActionReference();
            ref47.putProperty(charIDToTypeID('Chnl'), charIDToTypeID('fsel'));
            desc52.putReference(charIDToTypeID('null'), ref47);
            var ref48 = new ActionReference();
            ref48.putEnumerated(charIDToTypeID('Chnl'), charIDToTypeID('Chnl'), charIDToTypeID('Trsp'));
            desc52.putReference(charIDToTypeID('T   '), ref48);
            desc52.putBoolean(charIDToTypeID('Invr'), true);
            try {
                executeAction(charIDToTypeID('setd'), desc52, DialogModes.NO);
            } catch (e) {}
        }
        /**
         * Checking transparency of active document and active layer
         * @returns {Boolean} if have transparent return true, else - false
         */
        function CheckTransparent() {
            SelectTransparency();
            try {
                var sBnds = app.activeDocument.selection.bounds;
            } catch (e) {
                return false;
            }
            app.activeDocument.selection.deselect();
            return true;
        }
        /**
         * Check is layer have channel mask
         * @param {string} _layerName name of layer
         * @returns {@exp;@call;executeActionGet@call;getBoolean} if have - return true, else - false
         */
        function HasChannelMaskByName(_layerName) {
            var ref = new ActionReference();
            ref.putName(charIDToTypeID("Lyr "), _layerName);
            return executeActionGet(ref).getBoolean(stringIDToTypeID('hasUserMask'));
        }
        /**
         * Check is layer have vector mask
         * @param {string} _layerName name of layer
         * @returns {@exp;@call;executeActionGet@call;getBoolean} if have - return true, else - false
         */
        function HasVectorMaskByName(_layerName) {
            var ref = new ActionReference();
            ref.putName(charIDToTypeID("Lyr "), _layerName);
            return executeActionGet(ref).getBoolean(stringIDToTypeID('hasVectorMask'));
        }
        /**
         * Add border to layer with empty(transparent) pixels
         * @param {Photoshop_document} _doc document handler
         * @param {int} _borderSize size of border
         */
        function AddEmptyBorder(_doc, _borderSize) {
            var pix_docWidth = _doc.width + _borderSize * 2;
            var pix_docHeight = _doc.height + _borderSize * 2;
            _doc.resizeCanvas(pix_docWidth, pix_docHeight);
        }
        /**
         * Save document as JPG file
         * @param {Photoshop_document} _doc document handler
         * @param {string} _filename save file name
         */
        function SaveAsJPG(_doc, _filename) {
            var saveFile = new File(_filename);

            var saveOptions = new JPEGSaveOptions();
            saveOptions.embedColorProfile = false;
            saveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
            saveOptions.matte = MatteType.NONE;
            saveOptions.quality = 8; // quality level, min 1 max 10. 
            _doc.saveAs(saveFile, saveOptions, true, Extension.LOWERCASE);
        }
        /**
         * Save document as PNG file
         * @param {Photoshop_document} _doc document handler
         * @param {string} _filename save file name
         */
        function SaveAsPNG(_doc, _filename) {
            var saveFile = new File(_filename);

            // var saveOptions = new PNGSaveOptions(); 
            // _doc.saveAs(saveFile, saveOptions, true, Extension.LOWERCASE); 
            ///*
            var saveOptions = new ExportOptionsSaveForWeb;
            saveOptions.format = SaveDocumentType.PNG
            saveOptions.PNG8 = false;
            saveOptions.transparency = true;
            saveOptions.interlaced = false;
            saveOptions.quality = 100;

            activeDocument.exportDocument(saveFile, ExportType.SAVEFORWEB, saveOptions);
            //*/
        }
        /**
         * Save layer
         * @param {Photoshop_layer} _layer Photoshop active layer handler
         * @param {Photoshop_document} _curDoc active document handler
         * @param {string} _savePath path for saving file
         */
        function SaveLayer(_layer, _curDoc, _savePath) {
            var docMode = NewDocumentMode.RGB;

            if (_curDoc.mode === DocumentMode.RGB) {
                docMode = NewDocumentMode.RGB;
            } else if (_curDoc.mode === DocumentMode.LAB) {
                docMode = NewDocumentMode.LAB;
            } else if (_curDoc.mode === DocumentMode.GRAYSCALE) {
                docMode = NewDocumentMode.GRAYSCALE;
            } else if (_curDoc.mode === DocumentMode.CMYK) {
                docMode = NewDocumentMode.CMYK;
            } else if (_curDoc.mode === DocumentMode.BITMAP) {
                docMode = NewDocumentMode.BITMAP;
            } else {}

            var doc = app.documents.add(_curDoc.width, _curDoc.height, 72, _layer.name, docMode, DocumentFill.TRANSPARENT);

            app.activeDocument = _curDoc;
            _layer.duplicate(doc);
            app.activeDocument = doc;

            doc.trim(TrimType.TRANSPARENT);

            var isTransparent = false;
            var isMask = false;
            var mask_prefix = "mask_";

            if (_layer.name.length >= mask_prefix.length) {
                if (_layer.name.substring(0, mask_prefix.length) === mask_prefix) {
                    isMask = true;
                }
            }

            if (G_PARAMS.m_checkJPG || G_PARAMS.m_addBorder || isMask) {
                if (CheckTransparent()) {
                    isTransparent = true;
                }
            }

            if (isTransparent && G_PARAMS.m_addBorder) {
                AddEmptyBorder(doc, G_PARAMS.m_addBorderSize);
            }

            if (G_PARAMS.m_checkJPG && !isTransparent) {
                SaveAsJPG(doc, _savePath + "/" + _layer.name + ".jpg");
            } else {
                SaveAsPNG(doc, _savePath + "/" + _layer.name + ".png");
            }

            doc.close(SaveOptions.DONOTSAVECHANGES);
            app.activeDocument = _curDoc;
        }
        /**
         * check string for valid symb
         * @param {string} _str string for checking
         */
        function CheckStrValidEx(_str) {
            var checkRegExp = /^[a-zA-Z0-9\=\+\-\*\(\)\/\^\&\$\?\:\;\,\.\_\[\]\%\#\ 局\`\'\"\!\~\(\)\<\>\s]+$/;
            return checkRegExp.test(_str);
        }
        function ConvertToXMLText(_str) {
            var text = "";
            for (var i1 = 0; i1 < _str.length; i1++) {
                if (_str[i1] === '&') {
                    text += "&amp;";
                } else if (_str[i1] === '<') {
                    text += "&lt;";
                } else if (_str[i1] === '>') {
                    text += "&gt;";
                } else if (_str.charCodeAt(i1) === 8220) // LEFT DOUBLE QUOTATION MARK
                {
                    text += "&quot;";
                } else if (_str.charCodeAt(i1) === 8221) // RIGHT LEFT DOUBLE QUOTATION MARK
                {
                    text += "&quot;";
                } else if (_str.charCodeAt(i1) === 8217) // RIGHT SINGLE QUOTATION MARK
                {
                    text += "&#39;";
                } else {
                    text += _str[i1];
                }
            }

            return text;
        }
        /**
         * Process layers with sublayers
         * @param {Photoshop_layer} _layer Photoshop layer/groupe handle
         */
        function HandleLayer(_layer) {
            tab += "    ";
            for (var i = 0; i < _layer.length; i++) {
                var layerPart = _layer[i];

                G_PARAMS.hSt_layerName.text = layerPart.name;

                if (!layerPart.visible || layerPart.parent.name == G_PARAMS.defaultRollInfoGroupName) continue;

                ///// -----  EXIT SCRIPT PART ----- /////
                if ((layerPart.typename !== "LayerSet") && !CheckStrValidEx(layerPart.name)) {
                    alert("Error not valid layer name.\nCheck cyrillic or unicode in layer name.\nStop converter on [" + layerPart.name + "]");
                    Error.runtimeError(101, "Exit Script");
                }
                ////////////////////////////////////    

                if (layerPart.typename === "ArtLayer") {
                    var isHasVectorMask = HasVectorMaskByName(layerPart.name);
                    var pos;

                    if (isHasVectorMask) {
                        pos = GetPosition(layerPart, 1);
                    } else {
                        if (layerPart.kind === LayerKind.TEXT) {
                            ///  фикс, нужен т.к. баг в фотошопе и если создан слой по умолчанию 
                            // с выравниванием по левой стороне то вылетает с ошибкой что нет такого параметра
                            var isCrash = false;
                            try {
                                var x = layerPart.textItem.justification;
                            } catch (e) {
                                isCrash = true;
                            }
                            /////
                            if (isCrash || layerPart.textItem.justification === Justification.LEFT)
                                pos = GetPositionText(layerPart, 0, G_PARAMS.m_useTextEffects);
                            else if (layerPart.textItem.justification === Justification.RIGHT)
                                pos = GetPositionText(layerPart, 2, G_PARAMS.m_useTextEffects);
                            else
                                pos = GetPositionText(layerPart, 1, G_PARAMS.m_useTextEffects);
                        } else {
                            pos = GetPosition(layerPart, 1);
                        }
                    }

                    var strTitle = "";
                    var strName = " name=\"" + layerPart.name + "\"";
                    var strFile = null;
                    var indxStart = layerPart.name.indexOf("[");
                    var indexEnd = layerPart.name.lastIndexOf("]");
                    if (indexEnd > indxStart && indxStart > 0) {
                        strFile = layerPart.name.substring(indxStart + 1, indexEnd);
                        strName = " name=\"" + layerPart.name.substring(0, indxStart) + "\"";
                    }
                    var strPos = " x=\"" + (G_PARAMS.m_centered ? (pos.x - 0.5 * G_PARAMS.docWidth) : pos.x) + "\" y=\"" + (G_PARAMS.m_centered ? (0.5 * G_PARAMS.docHeight - pos.y) : (G_PARAMS.docHeight - pos.y)) + "\"";
                    var strOthers = "";

                    if (layerPart.name.indexOf("ae_") === 0) {
                        strTitle = "AfterEffects";
                        if (!strFile) {
                            alert("Error!\nIn layer's name \"" + layerPart.name + "\"  no name of AfterEffects file\n\n example: nameLayer[fileAE]");
                            Error.runtimeError(101, "Exit Script");
                        }
                        strOthers = " file=\"" + strFile + "\"";

                    } else if (layerPart.name.indexOf("ps_") === 0) {
                        strTitle = "PhotoShop";
                        if (!strFile) {
                            alert("Error!\nIn layer's name \"" + layerPart.name + "\"  no name of PhotoShop file\n\n example: nameLayer[filePS]");
                            Error.runtimeError(101, "Exit Script");
                        }
                        strOthers = " file=\"" + strFile + "\"";

                    } else if (isHasVectorMask) {
                        strTitle = "Sprite";
                        var size = GetSize(layerPart);
                        var c = GetPixelColor(layerPart, pos.x, pos.y);
                        strOthers = " size=\"" + size.width + "," + size.hight + "\" color=\"" + parseInt(c.rgb.red) + "," + parseInt(c.rgb.green) + "," + parseInt(c.rgb.blue) + "\"";
                        if (layerPart.name.toLowerCase().indexOf("scsr_") === 0) {
                            strOthers += " scissor=\"true\"";
                        }
                    } else if (layerPart.kind === LayerKind.TEXT) {
                        strTitle = "FontLabel";
                        if (!strFile) {
                            alert("Error!\nIn layer's name \"" + layerPart.name + "\"  no name of font\n\n example: nameLayer[fileFont]");
                            Error.runtimeError(101, "Exit Script");
                        }
                        /*// обратная совместимость
                        var trimStr = layerPart.name.split('.');
                        if(trimStr.length <= 1)
                        {
                            strName   = " name=\"" + layerPart.name + "\"";
                            strOthers = " font=\"" + layerPart.textItem.contents + "\"";
                        }else
                        {
                            strName   = " name=\"" + trimStr[0] + "\"";
                            strOthers = " font=\"" + trimStr[1]  + "\"";
                            strOthers += " text=\"" + layerPart.textItem.contents + "\"";
                        }*/

                        strOthers = " file=\"" + strFile + "\"";
                        strOthers += " text=\"" + ConvertToXMLText(layerPart.textItem.contents) + "\"";

                        ///  фикс, нужен т.к. баг в фотошопе и если создан слой по умолчанию 
                        // с выравниванием по левой стороне то вылетает с ошибкой что нет такого параметра
                        var isCrash = false;
                        try {
                            var x = layerPart.textItem.justification;
                        } catch (e) {
                            isCrash = true;
                        }
                        /////
                        if (isCrash || layerPart.textItem.justification === Justification.LEFT)
                            strOthers += " align=\"LEFT\"";
                        else if (layerPart.textItem.justification === Justification.RIGHT)
                            strOthers += " align=\"RIGHT\"";
                        else
                            strOthers += " align=\"CENTER\"";

                        strOthers += " pos=\"" + Math.round(G_PARAMS.m_centered ? (Math.round(layerPart.textItem.position[0]) - 0.5 * G_PARAMS.docWidth) : Math.round(layerPart.textItem.position[0])) + "," +
                            Math.round(G_PARAMS.m_centered ? (0.5 * G_PARAMS.docHeight - Math.round(layerPart.textItem.position[1])) : (G_PARAMS.docHeight - Math.round(layerPart.textItem.position[1]))) + "\"";
                    } else {
                        strTitle = "Sprite";
                        if (strFile)
                            strOthers = " file=\"" + strFile + "\"";
                        else
                            SaveLayer(layerPart, G_PARAMS.curDoc, G_PARAMS.pathF);
                    }

                    G_PARAMS.positions += tab + "<" + strTitle + strName + strPos + strOthers + " opacity=\"" + Math.round(layerPart.opacity) + "\" />\n";
                } else if (layerPart.typename === "LayerSet") {
                    var name = layerPart.name;
                    var pos = GetPosition(layerPart);
                    var size = GetSize(layerPart);
                    G_PARAMS.positions += tab + "<Group name=\"" + name + "\" x=\"" + (G_PARAMS.m_centered ? (pos.x - 0.5 * G_PARAMS.docWidth) : pos.x) + "\" y=\"" + (G_PARAMS.m_centered ? (0.5 * G_PARAMS.docHeight - pos.y) : (G_PARAMS.docHeight - pos.y));
                    G_PARAMS.positions += "\" size=\"" + size.width + "," + size.hight + "\ ";
                    G_PARAMS.positions += "\" opacity=\"" + Math.round(layerPart.opacity) + "\" >\n";

                    if (layerPart.visible) {
                        G_PARAMS.m_stopProgressBar = G_PARAMS.m_stopProgressBar + 1;
                        HandleLayer(layerPart.layers);
                        G_PARAMS.m_stopProgressBar = G_PARAMS.m_stopProgressBar - 1;
                    }

                    G_PARAMS.positions += tab + "</Group>\n";


                }
                if (G_PARAMS.m_stopProgressBar === 0) {
                    G_PARAMS.hPB_progress.value = (i + 1) / _layer.length * 100;
                }
            }
            tab = tab.substr(0, tab.length - 4);
        };
        /**
        * Parse layers to get roll info data from @param G_PARAMS.defaultRollInfoGroupName layerSet. 
        * @param {Photoshop_document} _curDoc Document to parse
        * @returns {Object_rollInfo} if success - return Object, else - undefined;
        * for example GetRollInfoData(_curDoc).ROLLS_FS[0][0].x show x-coord of 0-0 symbol position in ROLLS_FS rolls;
        */
        this.GetRollInfoDataFromLayers = function(_curDoc) 
        {
            var rollInfo = undefined;
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
                if(_curDoc.layerSets[i].name == G_PARAMS.defaultRollInfoGroupName) 
                {
                    rollInfo = {};
                    var rollInfoGroup = _curDoc.layerSets[i];
                    var counter = 1;
                    var rollsName = G_PARAMS.defaultRollsGroupName;
                    
                    for(var t = 0; t < counter;) 
                    {
                        var rolls = [];
                        var rollNum = 0;
                        var symbolNum = 0;
                        if(rollInfoGroup.layerSets[t].name.search(G_PARAMS.defaultRollsGroupName) > -1) 
                        {
                            rollsName = rollInfoGroup.layerSets[t].name;
                            counter = rollInfoGroup.layerSets.length;
                            rollInfoGroup = _curDoc.layerSets[i].layerSets[t];   
                        } 
                        
                        for(var j = 0; rolls.length < rollInfoGroup.layerSets.length;)
                        {
                            if(rollInfoGroup.layerSets[j].name == G_PARAMS.defaultRollGroupName + rollNum) 
                            {
                                var currentRollGroup = rollInfoGroup.layerSets[j];
                                for(var k = symbolNum; symbolNum < currentRollGroup.artLayers.length;) 
                                {
                                    if(k >= currentRollGroup.artLayers.length) {break}
                                    if(currentRollGroup.artLayers[k].name == symbolNum) 
                                    {

                                        G_PARAMS.hSt_layerName.text = rollsName + " - " + rollInfoGroup.layerSets[j].name + " - " + symbolNum;
                                        var pos    = GetPosition(currentRollGroup.artLayers[k]);                                         
                                        var bounds = GetSize(currentRollGroup.artLayers[k]);                               
                                        rollCoords.push(new SymbolCoords(pos.x, pos.y, [bounds.width, bounds.height], true));

                                        if (G_PARAMS.m_stopProgressBar === 0) {
                                            G_PARAMS.hPB_progress.value = (symbolNum + 1) / (rollInfoGroup.layerSets.length-1) * 100;
                                        }    

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
                    break;      
                };                       
            }; 
            return rollInfo;
        };
        /**
        * This function creates RollInfo.xml file from roll info data object. 
        * @param {Object_rollInfo} _rollInfoData Roll info data object
        * @return {string} Roll Info string;
        */
        this.GetRollInfoString = function(_curDoc) 
        {
            var tab = "	";
            var rollInfoString = "<head type=\"xml\" version=\"1\"/>\n";
            var _rollInfoData = this.GetRollInfoDataFromLayers(_curDoc);
            
            if(_rollInfoData == undefined) 
                return undefined

            for(var prop in _rollInfoData) 
            {
                var rollName = prop.replace(G_PARAMS.defaultRollsGroupName, "").toUpperCase();
                var strX;
                var strY;
                var numElements;
                var roll;
                var rollCoords;
                var counter = 0;
                rollInfoString += "<rolls" + rollName + " scale=\"1,1\" pos=\"0,0\">\n";

                    for(var i = 0; i < _rollInfoData[prop].length; i++) 
                    {
                        rollCoords = []
                        roll = _rollInfoData[prop][i];
                        numElements = rollName == G_PARAMS.defaultRespinGroupName ? 1 : roll.length;

                        if(numElements % 2 == 0 && rollName != "_RS") 
                        {
                            strX = roll[(numElements/2)-1].x;
                            strY = 2*Math.round((roll[(numElements/2)-1].y + roll[numElements/2].y)/2)/2;
                            rollCoords.push([strX, strY])
                        }
                        else if(rollName != "_RS" && numElements > 1)
                        {
                            strX = roll[(numElements-1)/2].x;
                            strY = 2*Math.round((roll[(numElements/2)-1].y + roll[numElements/2].y)/2)/2;
                            rollCoords.push([strX, strY])
                        } 
                        else 
                        {
                            for(var j = 0; j < roll.length; j++) 
                            {
                                strX = roll[j].x;
                                strY = roll[j].y;
                                rollCoords.push([strX, strY]);
                            }
                                
                        }

                        for(var j = 0; j < rollCoords.length; j++)                       
                        {
                            //START OF BUILDING ROLL INFO TEXT LINE
                            rollInfoString += tab + "<roll id=\"" + counter +"\"" +
                            " x=\"" + rollCoords[j][0] + "\"" +
                            " y=\"" + rollCoords[j][1] + "\"" +
                            " numElements=\"" + numElements + "\"" +
                            " elementSize=\"" + roll[j].width + ","   + roll[j].height + "\"" +
                            " scissorSize=\"" + roll[j].width*2 + "," + roll[j].height*2 + "\"" +
                            " stopIndex=\"" + (counter+1) + "\"" + 
                            ">\n" 
                            //END OF ROLL INFO TEXT LINE
                            counter++;
                        }
                    }
                    
                rollInfoString += "</rolls" + rollName + ">\n";

            }

            return rollInfoString;
        };     
        /**
         * starting convertor
         */
        this.StartWork = function() {
            var borderSizeSaveValue = 0;
            var fil = File.saveDialog();
            if (!fil) return;
            G_PARAMS.pathF = fil.absoluteURI;
            if (G_PARAMS.pathF.substr(-4, 4) === ("." + C_TYPE))
                G_PARAMS.pathF = G_PARAMS.pathF.substr(0, G_PARAMS.pathF.length - 4);
            var folder = new Folder(G_PARAMS.pathF);
            if (!folder.exists)
                folder.create();

            var strtRulerUnits = app.preferences.rulerUnits;
            var strtTypeUnits = app.preferences.typeUnits;
            app.preferences.rulerUnits = Units.PIXELS;
            app.preferences.typeUnits = TypeUnits.PIXELS;

            G_PARAMS.curDoc = app.activeDocument;
            G_PARAMS.docWidth = parseInt(G_PARAMS.curDoc.width);
            G_PARAMS.docHeight = parseInt(G_PARAMS.curDoc.height);
            var layers = G_PARAMS.curDoc.layers;

            if (G_PARAMS.m_addBorder)
                if (G_PARAMS.m_addBorderSize > 0)
                    borderSizeSaveValue = G_PARAMS.m_addBorderSize;

            if (G_PARAMS.m_isRollInfo) {
                G_PARAMS.rolls = this.GetRollInfoString(G_PARAMS.curDoc);
                if(G_PARAMS.rolls == undefined) 
                    alert("Error! \"" + G_PARAMS.defaultRollInfoGroupName + "\" layer group not found!\n" +  
                    "Check name of group or existence\n" +
                    "or uncheck RollInfo.xml export", "RollInfo Error!", true)
                    Error.runtimeError(101, "Exit Script");
            }
            //TODO: need calculate and add size
            G_PARAMS.positions = "<head type=\"" + C_TYPE + "\" version=\"" + C_CONVERTER_VERSION + "\" />\n";
            G_PARAMS.positions += "<objects name=\"" + G_PARAMS.curDoc.name + "\" " +
                "width=\"" + G_PARAMS.docWidth + "\" " +
                "height=\"" + G_PARAMS.docHeight + "\" " +
                "isCentered=\"" + G_PARAMS.m_centered + "\" " +
                "isCheckJPG=\"" + G_PARAMS.m_checkJPG + "\" " +
                "isUseTextEffects=\"" + G_PARAMS.m_useTextEffects + "\" " +
                "borderSize=\"" + borderSizeSaveValue + "\" ";
            if (G_PARAMS.m_isFolderName)
                G_PARAMS.positions += "folderName=\"" + folder.name + "\"";
            G_PARAMS.positions += ">\n";
            tab = "";

            var isHaveError = false;
            HandleLayer(layers);
            try {

            } catch (e) {
                isHaveError = true;
                if (e.number === 101) {
                    return; // exit script exeption
                } else {
                    alert("Error" + e.number);
                }
            }

            G_PARAMS.positions += "</objects>";

            if (!isHaveError) {
                var data = new File(G_PARAMS.pathF + "." + C_TYPE);
                data.open("w");
                data.write(G_PARAMS.positions);
                data.close();

            if (G_PARAMS.m_isRollInfo) {
                var rollInfo = new File(G_PARAMS.pathF.replace(/\w+$/gi, "") + "RollInfo.xml");
                rollInfo.open("w");
                rollInfo.write(G_PARAMS.rolls);
                rollInfo.close();
            }


                ///// save params in psd /////
                var psdcd = new CPsdCustomData();
                psdcd.SaveData({
                    m_isCentered: G_PARAMS.m_centered,
                    m_isCheckJPG: G_PARAMS.m_checkJPG,
                    m_isUseTextEffects: G_PARAMS.m_useTextEffects,
                    m_borderSize: borderSizeSaveValue,
                    m_isFolderName: G_PARAMS.m_isFolderName,
                    m_isRollInfo: G_PARAMS.m_isRollInfo
                });
                //////////////////////////////
            }

            app.preferences.rulerUnits = strtRulerUnits;
            app.preferences.typeUnits = strtTypeUnits;
        };
    };

    function CFase() {
        var m_converter = new CConverter();

        var hDlg = null;
        var hBut_help = null;
        var hBut_start = null;
        var hBut_cancel = null;
        var hBut_rollInfo = null;
        //var hSt_layerName = null;
        //var hPB_progress = null;
        //var hCB_jpg = null;
        //var hCB_textEffects = null;
        //var hCB_border = null;
        //var hET_borderSize = null;
        //var hCB_folderName = null;
        //var hCB_center = null;

        ///// init parameters /////
        /*

/*
Code for Import https://scriptui.joonas.me — (Triple click to select): 
{"activeId":21,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":"hDlg","windowType":"Dialog","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"Dialog","preferredSize":[0,0],"margins":16,"orientation":"column","spacing":10,"alignChildren":["center","top"]}},"item-8":{"id":8,"type":"Group","parentId":15,"style":{"enabled":true,"varName":"hGrp_rollInfo","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-9":{"id":9,"type":"Checkbox","parentId":8,"style":{"enabled":true,"varName":"hCB_rollInfo","text":"Create \"RollInfo.xml\" file ","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":true}},"item-12":{"id":12,"type":"Group","parentId":0,"style":{"enabled":true,"varName":"hGrp_bnts","preferredSize":[148,0],"margins":0,"orientation":"column","spacing":10,"alignChildren":["center","center"],"alignment":null}},"item-13":{"id":13,"type":"Button","parentId":20,"style":{"enabled":true,"varName":"hBut_start","text":"Start","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-14":{"id":14,"type":"Button","parentId":20,"style":{"enabled":true,"varName":"hBut_cancel","text":"Cancel","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-15":{"id":15,"type":"Group","parentId":0,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"column","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-16":{"id":16,"type":"Progressbar","parentId":17,"style":{"enabled":true,"varName":"hPB_progress","preferredSize":[420,25],"alignment":null,"helpTip":null}},"item-17":{"id":17,"type":"Group","parentId":0,"style":{"enabled":true,"varName":"hGrp_progress","preferredSize":[0,0],"margins":0,"orientation":"column","spacing":10,"alignChildren":["center","center"],"alignment":null}},"item-18":{"id":18,"type":"StaticText","parentId":17,"style":{"enabled":true,"varName":"hSt_layerName","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"empty","justify":"left","preferredSize":[0,20],"alignment":null,"helpTip":null}},"item-19":{"id":19,"type":"Button","parentId":0,"style":{"enabled":true,"varName":"hBut_help","text":"Help","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-20":{"id":20,"type":"Group","parentId":12,"style":{"enabled":true,"varName":"hGrp_btns1","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-21":{"id":21,"type":"Button","parentId":22,"style":{"enabled":true,"varName":"hBut_rollInfo","text":"Only RollInfo.xml","justify":"center","preferredSize":[138,0],"alignment":null,"helpTip":null}},"item-22":{"id":22,"type":"Group","parentId":12,"style":{"enabled":true,"varName":"hGrp_btns2","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}}},"order":[0,19,15,8,9,12,20,13,14,22,21,17,18,16],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":false,"afterEffectsDockable":false,"itemReferenceList":"None"}}
*/ 

        // HDLG
        // ====
        var hDlg = new Window("dialog"); 
            hDlg.text = "ConverterPhotoshop " + C_SCRIPT_VERSION; 
            hDlg.orientation = "column"; 
            hDlg.alignChildren = ["center","top"]; 
            hDlg.spacing = 10; 
            hDlg.margins = 16; 

        var hBut_help = hDlg.add("button", undefined, undefined, {name: "hBut_help"}); 
            hBut_help.text = "Help"; 

        // GROUP1
        // ======
        var group1 = hDlg.add("group", undefined, {name: "group1"}); 
            group1.orientation = "column"; 
            group1.alignChildren = ["left","center"]; 
            group1.spacing = 10; 
            group1.margins = 0; 

        // HGRP_ROLLINFO
        // =============
        var hGrp_rollInfo = group1.add("group", undefined, {name: "hGrp_rollInfo"}); 
            hGrp_rollInfo.orientation = "row"; 
            hGrp_rollInfo.alignChildren = ["left","center"]; 
            hGrp_rollInfo.spacing = 10; 
            hGrp_rollInfo.margins = 0; 

        var hCB_rollInfo = hGrp_rollInfo.add("checkbox", undefined, undefined, {name: "hCB_rollInfo"}); 
            hCB_rollInfo.text = "Create \u0022RollInfo.xml\u0022 file "; 
            hCB_rollInfo.value = true; 

        // HGRP_BNTS
        // =========
        var hGrp_bnts = hDlg.add("group", undefined, {name: "hGrp_bnts"}); 
            hGrp_bnts.preferredSize.width = 148; 
            hGrp_bnts.orientation = "column"; 
            hGrp_bnts.alignChildren = ["center","center"]; 
            hGrp_bnts.spacing = 10; 
            hGrp_bnts.margins = 0; 

        // HGRP_BTNS1
        // ==========
        var hGrp_btns1 = hGrp_bnts.add("group", undefined, {name: "hGrp_btns1"}); 
            hGrp_btns1.orientation = "row"; 
            hGrp_btns1.alignChildren = ["left","center"]; 
            hGrp_btns1.spacing = 10; 
            hGrp_btns1.margins = 0; 

        var hBut_start = hGrp_btns1.add("button", undefined, undefined, {name: "hBut_start"}); 
            hBut_start.text = "Start"; 

        var hBut_cancel = hGrp_btns1.add("button", undefined, undefined, {name: "hBut_cancel"}); 
            hBut_cancel.text = "Cancel"; 

        // HGRP_BTNS2
        // ==========
        var hGrp_btns2 = hGrp_bnts.add("group", undefined, {name: "hGrp_btns2"}); 
            hGrp_btns2.orientation = "row"; 
            hGrp_btns2.alignChildren = ["left","center"]; 
            hGrp_btns2.spacing = 10; 
            hGrp_btns2.margins = 0; 

        var hBut_rollInfo = hGrp_btns2.add("button", undefined, undefined, {name: "hBut_rollInfo"}); 
            hBut_rollInfo.text = "Only Roll Info"; 
            hBut_rollInfo.preferredSize.width = 138; 

        // HGRP_PROGRESS
        // =============
        var hGrp_progress = hDlg.add("group", undefined, {name: "hGrp_progress"}); 
            hGrp_progress.orientation = "column"; 
            hGrp_progress.alignChildren = ["center","center"]; 
            hGrp_progress.spacing = 10; 
            hGrp_progress.margins = 0; 

            G_PARAMS.hSt_layerName = hGrp_progress.add("statictext", undefined, undefined, {name: "hSt_layerName"}); 
            G_PARAMS.hSt_layerName.text = "<empty>"; 
            G_PARAMS.hSt_layerName.justify = "center";
            G_PARAMS.hSt_layerName.preferredSize.height = 20; 
            G_PARAMS.hSt_layerName.preferredSize.width = 180; 

            G_PARAMS.hPB_progress = hGrp_progress.add("progressbar", undefined, undefined, {name: "hPB_progress"}); 
            G_PARAMS.hPB_progress.maxvalue = 100; 
            G_PARAMS.hPB_progress.value = 0; 
            G_PARAMS.hPB_progress.preferredSize.width = 180; 
            G_PARAMS.hPB_progress.preferredSize.height = 10; 

        ///// callback func /////
        {
            hDlg.onShow = function() {
                // TODO: place load info from psd

                var psdcd = new CPsdCustomData();
                var cdata = psdcd.GetData();

                if (cdata.m_error === 0) {
                    //hCB_center.value = cdata.m_isCentered;
                    //hCB_jpg.value = cdata.m_isCheckJPG;
                    //hCB_textEffects.value = cdata.m_isUseTextEffects;
                    //hCB_border.value = cdata.m_borderSize > 0 ? true : false;
                    //hET_borderSize.text = cdata.m_borderSize;
                    //hET_numElements.text = cdata.m_numElements;
                    hCB_rollInfo.value = cdata.m_isRollInfo;
                } else {
                    //hCB_center.value = false;
                    //hCB_jpg.value = true;
                    //hCB_textEffects.value = false;
                    //hCB_border.value = false;
                    hCB_rollInfo.value = true;
                }
                //hET_borderSize.characters = 10;
                //hPB_progress.size = [hDlg.width - 10 - 10, 10] ;
                //hPB_progress.locale = [hDlg.height - 40, 10];
                //hPB_progress.alignment = "center";
                //hDlg.center();
            };

            hBut_start.onClick = function() {
                G_PARAMS.m_centered = true;//hCB_center.value
                G_PARAMS.m_checkJPG = false;//hCB_jpg.value;
                G_PARAMS.m_useTextEffects = false;//hCB_textEffects.value;
                G_PARAMS.m_addBorder = false;//hCB_border.value;
                G_PARAMS.m_addBorderSize = 0;//hET_borderSize.text;
                G_PARAMS.m_isFolderName = false;//hCB_folderName.value;
                G_PARAMS.m_isRollInfo = hCB_rollInfo.value;


                hCB_rollInfo.enabled = false;
                hBut_start.enabled = false; 
                hBut_rollInfo.enabled = false;              
                hGrp_progress.visible = true;
                //hBut_cancel.enabled = false;    
                //hET_borderSize.enabled = false;
                //hCB_center.enabled = false;
                //hCB_jpg.enabled = false;
                //hCB_border.enabled = false;
                //hCB_textEffects.enabled = false;
                //hCB_folderName.enabled = false;

                if (isNaN(G_PARAMS.m_addBorderSize) && G_PARAMS.m_addBorder) {
                    alert(G_PARAMS.m_addBorderSize + " <== In the field with size not a number!");
                } else {
                    m_converter.StartWork();
                    alert("END");
                    hDlg.close();
                }

                //hCB_center.enabled = true;
                //hCB_jpg.enabled = true;
                //hCB_border.enabled = true;
                //hCB_folderName.enabled = true;
                //hCB_textEffects.enabled = true;
                //hET_borderSize.enabled = true;
                hBut_start.enabled = true;
                hCB_rollInfo.enabled = true;
                hBut_rollInfo.enabled = true; 
                hGrp_progress.visible = false;

                return true;
            };

            hBut_help.onClick = function() {
                alert(" Help \n" +
                    "Avoid same names of layers! \n" +
                    "Text field must have some text! \n" +
                    "Invisible layers are not processed by script! \n" +
                    "\n" +
                    "Prefixes: \n" +
                    "\"num_\" - prefix for CSmoothNumChangeLabel; \n" +
                    "\"btn_\", \"button\" - prefix for button; \n" +
                    "\"chkb_\", \"checkbox\" - prefix for checkbox; \n" +
                    "\"ae_\" - prefix for AfterEffects; \n" +
                    "\"ps_\" - prefix for PhotoShop; \n" +
                    "\"mask_\" - prefix for mask; \n" +
                    "\"txt_\" - prefix for text; \n" +
                    "\"spr_\" - prefix for sprite; \n" +
                    "\"scsr_\" - make rectangle sprite as scissor; \n" +
                    "\n" +
                    "Work with num: \n" +
                    "\"num_example[fontName]\" - create CSmoothNumChangeLabel with font \"fontName\", in this case text of layer will be as prefix, \n" +
                    "if you need number label without preffix, name of layer should be \"num_example\", and name of font specify in the text field of the layer \n" +
                    "\n" +
                    "Work with txt: \n" +
                    "\"txt_example[fontName]\" - create FontLabel with font \"fontName\" with text from text field, \n" +
                    "if you need text label without text, you should name layer \"txt_example\",and name of font specify in text field \n" +
                    "\n" +
                    "Work with button: \n" +
                    "Top layer (1st) in group of button - default state of button; \n" +
                    "Middle layer (2nd) in group of button - pressed state of button; \n" +
                    "Bottom layer (3rd) in group of button - disabled state of button; \n" +
                    "\n" +
                    "Work with mask: \n" +
                    "Layer with prefix \"mask_\" will be automatically saved as PNG and empty pixels will be added to borders (size of border specified in the start of script)\n\n" +
                    "Work with RollInfo.xml:\n" +
                    "if you need to export RollInfo.xml, create \"ROLL_INFO\" layer group which contains \"ROLLS_<rollsName>\" groups," +
                    "each \"ROLLS\" group must contain \"ROLL_<rollNum>\" roll\n" +
                    "each \"ROLL\" group must contain rect (name of rect - ONLY index number: 0,1,2,3.. etc) which have proper size and coordinates" 
                );
            };

            hBut_rollInfo.onClick = function() {

                var pathF = File.saveDialog().absoluteURI;   
                if(pathF)              
                {
                    var m_rollInfo = new CConverter();

                    if (pathF.substr(-4, 4) === (".xml"))
                        pathF = pathF.substr(0, pathF.length - 4);
     
                    hBut_help.enabled = false;
                    hCB_rollInfo.enabled = false;
                    hBut_start.enabled = false;             
                    hGrp_progress.visible = true;
    
                    var rollInfoString = m_rollInfo.GetRollInfoString(G_PARAMS.curDoc);
    
                    if(rollInfoString == undefined) 
                    {
                        alert("Error! \"" + G_PARAMS.defaultRollInfoGroupName + "\" layer group not found!\n" +  
                        "Check name of group or existence", "RollInfo Error!", true)
                        Error.runtimeError(101, "Exit Script");                      
                    }
    
                    var rollInfo = new File(pathF + ".xml");
                    rollInfo.open("w");
                    rollInfo.write(rollInfoString);
                    rollInfo.close();
                    alert("RollInfo created succesfully!");
                    hDlg.close();
                }
                else
                {
                    alert("You need to choose a folder!");
                    Error.runtimeError(101, "Exit Script");
                }     

            };
        }
        ///// public func /////
        /**
         * Show general dialog box
         */
        this.Show = function() {
            hDlg.show();
        };
    };

}

//////////////////////////////////////////////////
// MAIN
//////////////////////////////////////////////////

function main() {
    var gui = new CFase();

    gui.Show();
}

main();
