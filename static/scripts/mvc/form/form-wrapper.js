define(["mvc/form/form-view","mvc/ui/ui-misc"],function(a,b){var c=Backbone.View.extend({initialize:function(a){this.model=new Backbone.Model(a),this.url=this.model.get("url"),this.redirect=this.model.get("redirect"),this.setElement("<div/>"),this.render()},render:function(){var c=this;$.ajax({url:Galaxy.root+this.url,type:"GET"}).done(function(d){var e=$.extend({},c.model.attributes,d),f=new a({title:e.title,message:e.message,status:e.status,icon:e.icon,inputs:e.inputs,operations:{submit:new b.ButtonIcon({tooltip:e.submit_tooltip,title:e.submit_title||"Save settings",icon:e.submit_icon||"fa-save",onclick:function(){c._submit(f)}})}});c.$el.empty().append(f.$el)}).fail(function(){c.$el.empty().append(new b.Message({message:"Failed to load resource "+c.url+".",status:"danger",persistent:!0}).$el)})},_submit:function(a){var b=this;$.ajax({url:Galaxy.root+b.url,data:JSON.stringify(a.data.create()),type:"PUT",contentType:"application/json"}).done(function(c){var d={message:c.message,status:"success",persistent:!1};b.redirect?window.location=b.redirect+"?"+$.param(d):(a.data.matchModel(c,function(b,c){a.field_list[c].value(b.value)}),a.message.update(d))}).fail(function(b){a.message.update({message:b.responseJSON.err_msg,status:"danger",persistent:!1})})}});return{View:c}});
//# sourceMappingURL=../../../maps/mvc/form/form-wrapper.js.map