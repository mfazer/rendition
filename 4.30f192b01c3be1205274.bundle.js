(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{1771:function(module,exports,__webpack_require__){"use strict";var extendStatics,__extends=this&&this.__extends||(extendStatics=function(d,b){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])})(d,b)},function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}),__assign=this&&this.__assign||function(){return(__assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t}).apply(this,arguments)},__importStar=this&&this.__importStar||function(mod){if(mod&&mod.__esModule)return mod;var result={};if(null!=mod)for(var k in mod)Object.hasOwnProperty.call(mod,k)&&(result[k]=mod[k]);return result.default=mod,result},__importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});var jellyschema=__importStar(__webpack_require__(1772)),cloneDeep_1=__importDefault(__webpack_require__(128)),isEqual_1=__importDefault(__webpack_require__(253)),merge_1=__importDefault(__webpack_require__(387)),omit_1=__importDefault(__webpack_require__(254)),React=__importStar(__webpack_require__(0)),Form_1=__importDefault(__webpack_require__(655)),formulas_1=__webpack_require__(1776),computeFormSchemas=function(jellySchema,uiSchema){var computed=jellyschema.generateJsonAndUiSchema(jellySchema);return{schema:computed.jsonSchema,uiSchema:merge_1.default({},computed.uiSchema,uiSchema)}},JellyForm=function(_super){function JellyForm(props){var _this=_super.call(this,props)||this;_this.onChange=function(changeData){var formData=changeData.formData,schema=_this.state.schema,data=cloneDeep_1.default(formData),evaluate=formulas_1.runFormulas(schema,data),startingState=formulas_1.defaultValueForSchema(schema),result=merge_1.default(startingState,formData,evaluate);_this.setState({value:result}),_this.props.onFormChange&&_this.props.onFormChange(__assign({},changeData,{formData:result}))};var _a=computeFormSchemas(props.schema,props.uiSchema),schema=_a.schema,uiSchema=_a.uiSchema;return _this.state={value:props.value||formulas_1.defaultValueForSchema(schema),schema:schema,uiSchema:uiSchema},_this}return __extends(JellyForm,_super),JellyForm.prototype.componentWillReceiveProps=function(nextProps){if(isEqual_1.default(this.props.value,nextProps.value)||this.setState({value:formulas_1.runFormulas(this.state.schema,nextProps.value)}),!isEqual_1.default(this.props.schema,nextProps.schema)||!isEqual_1.default(this.props.uiSchema,nextProps.uiSchema)){var _a=computeFormSchemas(nextProps.schema,nextProps.uiSchema),schema=_a.schema,uiSchema=_a.uiSchema;this.setState({schema:schema,uiSchema:uiSchema})}},JellyForm.prototype.render=function(){var _a=this.state,value=_a.value,schema=_a.schema,uiSchema=_a.uiSchema,options=omit_1.default(this.props,["value","schema","uiSchema","onFormChange"]);return React.createElement(Form_1.default,__assign({value:value,schema:schema,uiSchema:uiSchema,onFormChange:this.onChange},options))},JellyForm}(React.Component);exports.default=JellyForm},1775:function(module,exports){function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=function(){return[]},webpackEmptyContext.resolve=webpackEmptyContext,module.exports=webpackEmptyContext,webpackEmptyContext.id=1775},1776:function(module,exports,__webpack_require__){"use strict";var __importStar=this&&this.__importStar||function(mod){if(mod&&mod.__esModule)return mod;var result={};if(null!=mod)for(var k in mod)Object.hasOwnProperty.call(mod,k)&&(result[k]=mod[k]);return result.default=mod,result},__importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});var temen=__importStar(__webpack_require__(1773)),cloneDeep_1=__importDefault(__webpack_require__(128)),get_1=__importDefault(__webpack_require__(129)),isPlainObject_1=__importDefault(__webpack_require__(203)),merge_1=__importDefault(__webpack_require__(387)),set_1=__importDefault(__webpack_require__(1779));exports.runFormulas=function(schema,value){var evaluate,data=cloneDeep_1.default(value);replaceDataWithFormulaContent(schema,data);try{evaluate=temen.evaluate(data)}catch(e){console.error("Caught error when evaluating formulas",e),evaluate=value}var startingState=defaultValueForSchema(schema);return merge_1.default(startingState,value,evaluate)};var defaultValueForSchema=function(schema){return"array"===schema.type?[]:{}};exports.defaultValueForSchema=defaultValueForSchema;var replaceDataWithFormulaContent=function(schema,data){getFormulaKeys(schema).map(function(path){return{formula:get_1.default(schema,path),path:path.replace(/properties\./g,"")}}).forEach(function(formula){var fullPath=formula.path,formulaText=formula.formula;if(fullPath.includes(".items.")){var pathFragments=fullPath.split(".items.");replaceArrayWithFormulaContent(pathFragments,data,formulaText)}else set_1.default(data,fullPath,formulaText)})},replaceArrayWithFormulaContent=function(pathFragments,data,formulaText){var firstFragment=pathFragments[0],lastFragment=pathFragments[1],array=data[firstFragment]||[];if(pathFragments.length>2){var subFragments_1=pathFragments.slice(1,pathFragments.length);array.forEach(function(item){replaceArrayWithFormulaContent(subFragments_1,item,formulaText)})}else array.forEach(function(item){set_1.default(item,lastFragment,formulaText)})},getFormulaKeys=function(obj,prefix){void 0===prefix&&(prefix="");var keys=Object.keys(obj);return prefix=prefix?prefix+".":"",keys.reduce(function(result,key){return isPlainObject_1.default(obj[key])?result=result.concat(getFormulaKeys(obj[key],prefix+key)):"$$formula"===key&&result.push(prefix+key),result},[])}},1778:function(module,exports){function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=function(){return[]},webpackEmptyContext.resolve=webpackEmptyContext,module.exports=webpackEmptyContext,webpackEmptyContext.id=1778}}]);
//# sourceMappingURL=4.30f192b01c3be1205274.bundle.js.map