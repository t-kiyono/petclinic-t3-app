(self.webpackChunkpetclinic_t3_app=self.webpackChunkpetclinic_t3_app||[]).push([[952],{"./node_modules/@babel/runtime/helpers/esm/defineProperty.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function _typeof(o){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==_typeof(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===_typeof(key)?key:String(key)}function _defineProperty(obj,key,value){return(key=_toPropertyKey(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}__webpack_require__.d(__webpack_exports__,{Z:()=>_defineProperty})},"./node_modules/@babel/runtime/helpers/esm/extends.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}__webpack_require__.d(__webpack_exports__,{Z:()=>_extends})},"./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}__webpack_require__.d(__webpack_exports__,{Z:()=>_objectWithoutProperties})},"./node_modules/client-only/index.js":()=>{},"./node_modules/styled-jsx/dist/index/index.js":(__unused_webpack_module,exports,__webpack_require__)=>{var process=__webpack_require__("./node_modules/process/browser.js"),console=__webpack_require__("./node_modules/console-browserify/index.js");__webpack_require__("./node_modules/client-only/index.js");var React=__webpack_require__("./node_modules/next/dist/compiled/react/index.js");function _interopDefaultLegacy(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var React__default=_interopDefaultLegacy(React);function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}var isProd=void 0!==process&&process.env&&!0,isString=function(o){return"[object String]"===Object.prototype.toString.call(o)},StyleSheet=function(){function StyleSheet(param){var ref=void 0===param?{}:param,_name=ref.name,name=void 0===_name?"stylesheet":_name,_optimizeForSpeed=ref.optimizeForSpeed,optimizeForSpeed=void 0===_optimizeForSpeed?isProd:_optimizeForSpeed;invariant$1(isString(name),"`name` must be a string"),this._name=name,this._deletedRulePlaceholder="#"+name+"-deleted-rule____{}",invariant$1("boolean"==typeof optimizeForSpeed,"`optimizeForSpeed` must be a boolean"),this._optimizeForSpeed=optimizeForSpeed,this._serverSheet=void 0,this._tags=[],this._injected=!1,this._rulesCount=0;var node="undefined"!=typeof window&&document.querySelector('meta[property="csp-nonce"]');this._nonce=node?node.getAttribute("content"):null}var _proto=StyleSheet.prototype;return _proto.setOptimizeForSpeed=function setOptimizeForSpeed(bool){invariant$1("boolean"==typeof bool,"`setOptimizeForSpeed` accepts a boolean"),invariant$1(0===this._rulesCount,"optimizeForSpeed cannot be when rules have already been inserted"),this.flush(),this._optimizeForSpeed=bool,this.inject()},_proto.isOptimizeForSpeed=function isOptimizeForSpeed(){return this._optimizeForSpeed},_proto.inject=function inject(){var _this=this;if(invariant$1(!this._injected,"sheet already injected"),this._injected=!0,"undefined"!=typeof window&&this._optimizeForSpeed)return this._tags[0]=this.makeStyleTag(this._name),this._optimizeForSpeed="insertRule"in this.getSheet(),void(this._optimizeForSpeed||(isProd||console.warn("StyleSheet: optimizeForSpeed mode not supported falling back to standard mode."),this.flush(),this._injected=!0));this._serverSheet={cssRules:[],insertRule:function(rule,index){return"number"==typeof index?_this._serverSheet.cssRules[index]={cssText:rule}:_this._serverSheet.cssRules.push({cssText:rule}),index},deleteRule:function(index){_this._serverSheet.cssRules[index]=null}}},_proto.getSheetForTag=function getSheetForTag(tag){if(tag.sheet)return tag.sheet;for(var i=0;i<document.styleSheets.length;i++)if(document.styleSheets[i].ownerNode===tag)return document.styleSheets[i]},_proto.getSheet=function getSheet(){return this.getSheetForTag(this._tags[this._tags.length-1])},_proto.insertRule=function insertRule(rule,index){if(invariant$1(isString(rule),"`insertRule` accepts only strings"),"undefined"==typeof window)return"number"!=typeof index&&(index=this._serverSheet.cssRules.length),this._serverSheet.insertRule(rule,index),this._rulesCount++;if(this._optimizeForSpeed){var sheet=this.getSheet();"number"!=typeof index&&(index=sheet.cssRules.length);try{sheet.insertRule(rule,index)}catch(error){return isProd||console.warn("StyleSheet: illegal rule: \n\n"+rule+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),-1}}else{var insertionPoint=this._tags[index];this._tags.push(this.makeStyleTag(this._name,rule,insertionPoint))}return this._rulesCount++},_proto.replaceRule=function replaceRule(index,rule){if(this._optimizeForSpeed||"undefined"==typeof window){var sheet="undefined"!=typeof window?this.getSheet():this._serverSheet;if(rule.trim()||(rule=this._deletedRulePlaceholder),!sheet.cssRules[index])return index;sheet.deleteRule(index);try{sheet.insertRule(rule,index)}catch(error){isProd||console.warn("StyleSheet: illegal rule: \n\n"+rule+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),sheet.insertRule(this._deletedRulePlaceholder,index)}}else{var tag=this._tags[index];invariant$1(tag,"old rule at index `"+index+"` not found"),tag.textContent=rule}return index},_proto.deleteRule=function deleteRule(index){if("undefined"!=typeof window)if(this._optimizeForSpeed)this.replaceRule(index,"");else{var tag=this._tags[index];invariant$1(tag,"rule at index `"+index+"` not found"),tag.parentNode.removeChild(tag),this._tags[index]=null}else this._serverSheet.deleteRule(index)},_proto.flush=function flush(){this._injected=!1,this._rulesCount=0,"undefined"!=typeof window?(this._tags.forEach((function(tag){return tag&&tag.parentNode.removeChild(tag)})),this._tags=[]):this._serverSheet.cssRules=[]},_proto.cssRules=function cssRules(){var _this=this;return"undefined"==typeof window?this._serverSheet.cssRules:this._tags.reduce((function(rules,tag){return tag?rules=rules.concat(Array.prototype.map.call(_this.getSheetForTag(tag).cssRules,(function(rule){return rule.cssText===_this._deletedRulePlaceholder?null:rule}))):rules.push(null),rules}),[])},_proto.makeStyleTag=function makeStyleTag(name,cssString,relativeToTag){cssString&&invariant$1(isString(cssString),"makeStyleTag accepts only strings as second parameter");var tag=document.createElement("style");this._nonce&&tag.setAttribute("nonce",this._nonce),tag.type="text/css",tag.setAttribute("data-"+name,""),cssString&&tag.appendChild(document.createTextNode(cssString));var head=document.head||document.getElementsByTagName("head")[0];return relativeToTag?head.insertBefore(tag,relativeToTag):head.appendChild(tag),tag},function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Constructor}(StyleSheet,[{key:"length",get:function get(){return this._rulesCount}}]),StyleSheet}();function invariant$1(condition,message){if(!condition)throw new Error("StyleSheet: "+message+".")}var stringHash=function hash(str){for(var _$hash=5381,i=str.length;i;)_$hash=33*_$hash^str.charCodeAt(--i);return _$hash>>>0},cache={};function computeId(baseId,props){if(!props)return"jsx-"+baseId;var propsToString=String(props),key=baseId+propsToString;return cache[key]||(cache[key]="jsx-"+stringHash(baseId+"-"+propsToString)),cache[key]}function computeSelector(id,css){"undefined"==typeof window&&(css=css.replace(/\/style/gi,"\\/style"));var idcss=id+css;return cache[idcss]||(cache[idcss]=css.replace(/__jsx-style-dynamic-selector/g,id)),cache[idcss]}var StyleSheetRegistry=function(){function StyleSheetRegistry(param){var ref=void 0===param?{}:param,_styleSheet=ref.styleSheet,styleSheet=void 0===_styleSheet?null:_styleSheet,_optimizeForSpeed=ref.optimizeForSpeed,optimizeForSpeed=void 0!==_optimizeForSpeed&&_optimizeForSpeed;this._sheet=styleSheet||new StyleSheet({name:"styled-jsx",optimizeForSpeed}),this._sheet.inject(),styleSheet&&"boolean"==typeof optimizeForSpeed&&(this._sheet.setOptimizeForSpeed(optimizeForSpeed),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),this._fromServer=void 0,this._indices={},this._instancesCounts={}}var _proto=StyleSheetRegistry.prototype;return _proto.add=function add(props){var _this=this;void 0===this._optimizeForSpeed&&(this._optimizeForSpeed=Array.isArray(props.children),this._sheet.setOptimizeForSpeed(this._optimizeForSpeed),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),"undefined"==typeof window||this._fromServer||(this._fromServer=this.selectFromServer(),this._instancesCounts=Object.keys(this._fromServer).reduce((function(acc,tagName){return acc[tagName]=0,acc}),{}));var ref=this.getIdAndRules(props),styleId=ref.styleId,rules=ref.rules;if(styleId in this._instancesCounts)this._instancesCounts[styleId]+=1;else{var indices=rules.map((function(rule){return _this._sheet.insertRule(rule)})).filter((function(index){return-1!==index}));this._indices[styleId]=indices,this._instancesCounts[styleId]=1}},_proto.remove=function remove(props){var _this=this,styleId=this.getIdAndRules(props).styleId;if(function invariant(condition,message){if(!condition)throw new Error("StyleSheetRegistry: "+message+".")}(styleId in this._instancesCounts,"styleId: `"+styleId+"` not found"),this._instancesCounts[styleId]-=1,this._instancesCounts[styleId]<1){var tagFromServer=this._fromServer&&this._fromServer[styleId];tagFromServer?(tagFromServer.parentNode.removeChild(tagFromServer),delete this._fromServer[styleId]):(this._indices[styleId].forEach((function(index){return _this._sheet.deleteRule(index)})),delete this._indices[styleId]),delete this._instancesCounts[styleId]}},_proto.update=function update(props,nextProps){this.add(nextProps),this.remove(props)},_proto.flush=function flush(){this._sheet.flush(),this._sheet.inject(),this._fromServer=void 0,this._indices={},this._instancesCounts={}},_proto.cssRules=function cssRules(){var _this=this,fromServer=this._fromServer?Object.keys(this._fromServer).map((function(styleId){return[styleId,_this._fromServer[styleId]]})):[],cssRules=this._sheet.cssRules();return fromServer.concat(Object.keys(this._indices).map((function(styleId){return[styleId,_this._indices[styleId].map((function(index){return cssRules[index].cssText})).join(_this._optimizeForSpeed?"":"\n")]})).filter((function(rule){return Boolean(rule[1])})))},_proto.styles=function styles(options){return function mapRulesToStyle(cssRules,options){return void 0===options&&(options={}),cssRules.map((function(args){var id=args[0],css=args[1];return React__default.default.createElement("style",{id:"__"+id,key:"__"+id,nonce:options.nonce?options.nonce:void 0,dangerouslySetInnerHTML:{__html:css}})}))}(this.cssRules(),options)},_proto.getIdAndRules=function getIdAndRules(props){var css=props.children,dynamic=props.dynamic,id=props.id;if(dynamic){var styleId=computeId(id,dynamic);return{styleId,rules:Array.isArray(css)?css.map((function(rule){return computeSelector(styleId,rule)})):[computeSelector(styleId,css)]}}return{styleId:computeId(id),rules:Array.isArray(css)?css:[css]}},_proto.selectFromServer=function selectFromServer(){return Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]')).reduce((function(acc,element){return acc[element.id.slice(2)]=element,acc}),{})},StyleSheetRegistry}();var StyleSheetContext=React.createContext(null);function createStyleRegistry(){return new StyleSheetRegistry}function useStyleRegistry(){return React.useContext(StyleSheetContext)}StyleSheetContext.displayName="StyleSheetContext";var useInsertionEffect=React__default.default.useInsertionEffect||React__default.default.useLayoutEffect,defaultRegistry="undefined"!=typeof window?createStyleRegistry():void 0;function JSXStyle(props){var registry=defaultRegistry||useStyleRegistry();return registry?"undefined"==typeof window?(registry.add(props),null):(useInsertionEffect((function(){return registry.add(props),function(){registry.remove(props)}}),[props.id,String(props.dynamic)]),null):null}JSXStyle.dynamic=function(info){return info.map((function(tagInfo){return computeId(tagInfo[0],tagInfo[1])})).join(" ")},exports.style=JSXStyle},"./node_modules/styled-jsx/style.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/styled-jsx/dist/index/index.js").style}}]);