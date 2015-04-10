/*$(".field_input").focus(function(){
  $(this).parent().addClass("is-active is-completed");
});

$(".field_input").focusout(function(){
  if($(this).val() === "")
    $(this).parent().removeClass("is-completed");
  $(this).parent().removeClass("is-active");
});
*/


jQuery(document).ready(function($){  
	
	
$('[data-toggle="tooltip"]').tooltip()
	
	
$("#un").focusin(function(){
	$($(".field_label")[0]).css("display", "block");
});

$("#un").focusout(function(){
	if($("#un").val().length === 0){
		$($(".field_label")[0]).hide();
	}
});
	
$("#pass").focusin(function(){$($(".field_label")[1]).css("display", "block");});
$("#pass").focusout(function(){
		if($("#pass").val().length === 0){
			$($(".field_label")[1]).hide();
		}
	});

<<<<<<< HEAD
$("#day_time").click(function(){$("#day_time").toggleClass( "pref_icon_selected");});
$("#night_time").click(function(){$("#night_time").toggleClass( "pref_icon_selected");});
$("#day_off").click(function(){$("#day_off").toggleClass( "pref_icon_selected");});
=======
/*$("#day_time").click(function(){$("#day_time").toggleClass( "pref_icon_selected");});
$("#night_time").click(function(){$("#night_time").toggleClass( "pref_icon_selected");});
$("#day_off").click(function(){$("#day_off").toggleClass( "pref_icon_selected");});*/
>>>>>>> 77332e4421e9e709959281974d53765b0b69adcf
});