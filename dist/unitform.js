$.fn.unitform=function(e){var n=$(this.selector),a={fileHelperText:"No File Selected.",fileHelperButton:"Upload"},t=$.extend({},a,e),s={ifChecked:function(e){$(e).is(":checked")?($(e).parent("span").addClass("checked"),1==$(e).parents("label").length&&$(e).parents("label").addClass("unitform_label")):($(e).parent("span").removeClass("checked"),1==$(e).parents("label").length&&$(e).parents("label").removeClass("unitform_label"))},onFocus:function(e){$(e).parent("div").addClass("unitform_focus")},onBlur:function(e){$(e).parent("div").removeClass("unitform_focus")},moveClass:function(e){var n=$(e).attr("class");if(n){var a="div";1==$(e).parents("label").length&&(a="label"),$(e).removeClass(n).parent().closest(a).addClass(n)}}},l={select_markup:function(e){$(e).wrap('<div class="unitform_select"></div>').parent().append("<span>"+$(e).find("option:selected").text()+"</span> <em>Arrow</em>"),s.moveClass(e),$(e).attr("disabled")&&$(e).parent().addClass("unitform_disabled")},select_onChange:function(e){$(e).parent().find("span").html($(e).find("option:selected").text())},radio_markup:function(e){$(e).wrap('<div class="unitform_radio"><span></span></div>'),s.ifChecked(e),s.moveClass(e)},radio_onChange:function(e){var n=$(e).attr("name");n.length&&$("input:radio[name="+n+"]").each(function(){$(this).prop("checked",!1).parent("span").removeClass("checked"),1==$(this).parents("label").length&&$(this).parents("label").removeClass("unitform_label")}),$(e).prop("checked",!0).parent("span").addClass("checked"),1==$(e).parents("label").length&&$(e).parents("label").addClass("unitform_label")},checkbox_markup:function(e){$(e).wrap('<div class="unitform_checkbox"><span></span></div>'),s.ifChecked(e),s.moveClass(e)},checkbox_onChange:function(e){s.ifChecked(e)},file_markup:function(e){$(e).wrap('<div class="unitform_file"></div>').parent().append("<span>"+t.fileHelperText+"</span> <em>"+t.fileHelperButton+"</em>")},file_onChange:function(e){var n=$(e).val().split("/").pop();$(e).parent().find("span").text(n)}};n.length&&n.each(function(){var e=this.type||this.tagName.toLowerCase(),n=e.split("-")[0];l[n+"_markup"](this),$(this).bind("change",function(){l[n+"_onChange"](this)}),$(this).bind("focus",function(){s.onFocus(this)}),$(this).bind("blur",function(){s.onBlur(this)})})};