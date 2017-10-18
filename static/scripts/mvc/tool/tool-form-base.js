"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var _utils=require("utils/utils"),_utils2=_interopRequireDefault(_utils),_deferred=require("utils/deferred"),_deferred2=_interopRequireDefault(_deferred),_uiMisc=require("mvc/ui/ui-misc"),_uiMisc2=_interopRequireDefault(_uiMisc),_formView=require("mvc/form/form-view"),_formView2=_interopRequireDefault(_formView),_citationModel=require("mvc/citation/citation-model"),_citationModel2=_interopRequireDefault(_citationModel),_citationView=require("mvc/citation/citation-view"),_citationView2=_interopRequireDefault(_citationView);exports.default=_formView2.default.extend({initialize:function(e){var t=this;this.deferred=new _deferred2.default,_formView2.default.prototype.initialize.call(this,e),this._update(this.model.get("initialmodel")),this.model.get("listen_to_history")&&parent.Galaxy&&parent.Galaxy.currHistoryPanel&&this.listenTo(parent.Galaxy.currHistoryPanel.collection,"change",function(){t.model.get("onchange")()}),this.$el.on("remove",function(){t._destroy()})},_update:function(e){var t=this;(e=e||this.model.get("buildmodel"))?(this.deferred.reset(),this.deferred.execute(function(i){e(i,t),i.then(function(){t._render()})})):this._render()},_destroy:function(){var e=this;this.$el.off().hide(),this.deferred.execute(function(){_formView2.default.prototype.remove.call(e),Galaxy.emit.debug("tool-form-base::_destroy()","Destroy view.")})},_render:function(){var e=this,t=this.model.attributes;this.model.set({title:t.fixed_title||"<b>"+t.name+"</b> "+t.description+" (Galaxy Version "+t.version+")",operations:!t.hide_operations&&this._operations(),onchange:function(){e.deferred.reset(),e.deferred.execute(function(t){e.model.get("postchange")(t,e)})}}),this.render(),this.model.get("collapsible")||this.$el.append($("<div/>").addClass("ui-margin-top-large").append(this._footer())),this.show_message&&this.message.update({status:"success",message:"Now you are using '"+t.name+"' version "+t.version+", id '"+t.id+"'.",persistent:!1}),this.show_message=!0},_operations:function(){var e=this,t=this.model.attributes,i=new _uiMisc2.default.ButtonMenu({icon:"fa-cubes",title:!t.narrow&&"Versions"||null,tooltip:"Select another tool version"});if(!t.sustain_version&&t.versions&&t.versions.length>1)for(var o in t.versions){var n=t.versions[o];n!=t.version&&i.addMenu({title:"Switch to "+n,version:n,icon:"fa-cube",onclick:function(){e.model.set("id",t.id.replace(t.version,this.version)),e.model.set("version",this.version),e._update()}})}else i.$el.hide();var r=new _uiMisc2.default.ButtonMenu({icon:"fa-caret-down",title:!t.narrow&&"Options"||null,tooltip:"View available options"});return t.biostar_url&&(r.addMenu({icon:"fa-question-circle",title:"Question?",onclick:function(){window.open(t.biostar_url+"/p/new/post/")}}),r.addMenu({icon:"fa-search",title:"Search",onclick:function(){window.open(t.biostar_url+"/local/search/page/?q="+t.name)}})),r.addMenu({icon:"fa-share",title:"Share",onclick:function(){prompt("Copy to clipboard: Ctrl+C, Enter",window.location.origin+Galaxy.root+"root?tool_id="+t.id)}}),Galaxy.user&&Galaxy.user.get("is_admin")&&(r.addMenu({icon:"fa-download",title:"Download",onclick:function(){window.location.href=Galaxy.root+"api/tools/"+t.id+"/download"}}),r.addMenu({icon:"fa-refresh",title:"Reload XML",onclick:function(){_utils2.default.get({url:Galaxy.root+"api/tools/"+t.id+"/reload",success:function(t){e.message.update({persistent:!1,message:"Tool XML has been reloaded.",status:"success"})},error:function(t){e.message.update({persistent:!1,message:t.err_msg,status:"danger"})}})}})),t.requirements&&t.requirements.length>0&&r.addMenu({icon:"fa-info-circle",title:"Requirements",onclick:function(){!this.requirements_visible||e.portlet.collapsed?(this.requirements_visible=!0,e.portlet.expand(),e.message.update({persistent:!0,message:e._templateRequirements(t),status:"info"})):(this.requirements_visible=!1,e.message.update({message:""}))}}),t.sharable_url&&r.addMenu({icon:"fa-external-link",title:"See in Tool Shed",onclick:function(){window.open(t.sharable_url)}}),$.getJSON("/api/webhooks/tool-menu/all",function(e){_.each(e,function(e){e.activate&&e.config.function&&r.addMenu({icon:e.config.icon,title:e.config.title,onclick:function(){new Function("options",e.config.function)(t)}})})}),{menu:r,versions:i}},_footer:function(){var e=this.model.attributes,t=$("<div/>").append(this._templateHelp(e));if(e.citations){var i=$("<div/>"),o=new _citationModel2.default.ToolCitationCollection;o.tool_id=e.id,new _citationView2.default.CitationListView({el:i,collection:o}).render(),o.fetch(),t.append(i)}return t},_templateHelp:function(e){var t=$("<div/>").addClass("ui-form-help").append(e.help);return t.find("a").attr("target","_blank"),t},_templateRequirements:function(e){var t=e.requirements.length;if(t>0){var i="This tool requires ";_.each(e.requirements,function(e,o){i+=e.name+(e.version?" (Version "+e.version+")":"")+(o<t-2?", ":o==t-2?" and ":"")});var o=$("<a/>").attr("target","_blank").attr("href","https://galaxyproject.org/tools/requirements/").text("here");return $("<span/>").append(i+". Click ").append(o).append(" for more information.")}return"No requirements found."}});
//# sourceMappingURL=../../../maps/mvc/tool/tool-form-base.js.map
