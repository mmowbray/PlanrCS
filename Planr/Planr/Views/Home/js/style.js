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
});