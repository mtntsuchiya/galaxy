"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=Backbone.View.extend({initialize:function(t){this.$container=t.$container,this.collection=t.collection,this.new_content=t.new_content,this.max=t.max||50,this.content_list={},this.$message=$("<div/>").addClass("ui-limitloader").append("...only the first "+this.max+" entries are visible."),this.$container.append(this.$message),this.listenTo(this.collection,"reset",this._reset,this),this.listenTo(this.collection,"add",this._refresh,this),this.listenTo(this.collection,"remove",this._remove,this)},_done:function(){var t=_.size(this.content_list)>this.max;return this.$message[t?"show":"hide"](),t},_reset:function(){_.each(this.content_list,function(t){t.remove()}),this.content_list={},this.$message.hide()},_remove:function(t){var e=t.id,i=this.content_list[e];i&&(i.remove(),delete this.content_list[e]),this._refresh()},_refresh:function(){if(!this._done())for(var t in this.collection.models){var e=this.collection.models[t];this.content_list[e.id];if(!this.content_list[e.id]){var i=this.new_content(e);if(this.content_list[e.id]=i,this._done())break}}}});
//# sourceMappingURL=../../../maps/mvc/lazy/lazy-limited.js.map
