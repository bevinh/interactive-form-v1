function addRemovePrice(e){$("#priceDiv").length>0?($("#priceDiv").remove(),$(".activities").append("<div id='priceDiv'>$"+e)):$(".activities").append("<div id='priceDiv'>$"+e)}function validateCC(e){var o=e.split("").pop();e=e.slice(0,e.length-1);var r=e.split("");r.reverse();var l=r.length;for(i=0;i<l;i+=2)r[i]*=2,r[i]>9&&(r[i]-=9);var a=0,t;for(i=0,l=r.length;i<l;i+=1)t=parseInt(r[i]),a+=t;var n=a%10;n===o?$("#payment-invalid").length&&($("#payment-invalid").remove(),$("label[for=cc-num]").css("color","black")):$("#payment-invalid").length||$("label[for=cc-num]").append("<p id='payment-invalid'>Your credit card number is invalid. Did you perhaps type it wrong?</p>").css("color","red")}function validateForm(){$("#name").val().length<1?($("html, body").animate({scrollTop:"200px"}),$("#name-error").length||$("label[for=name").css("color","red").append("<p id='name-error'> Whoops! You forgot your name! </p>")):$("#name-error").length&&($("#name-error").remove(),$("label[for=name").css("color","black")),$("#mail").val().length<1?($("html, body").animate({scrollTop:"200px"}),$("#mail-error").length||$("label[for=mail").css("color","red").append("<p id='mail-error'> Hmmm, your email doesn't seem to be quite right!</p>")):$("#mail-error").length&&($("#mail-error").remove(),$("label[for=mail").css("color","black")),$("input[type=checkbox]:checked").length<=0?($("html, body").animate({scrollTop:"200px"}),$("#activities-error").length||$(".activities legend").css("color","red").append("<p id='activities-error'>Hey, you might want to join an activity at the conference.</p>")):$("#activities-error").length&&($("#activites-error").remove(),$(".activities legend").css("color","black")),"select_method"===$("#payment").val()?($("html, body").animate({scrollTop:"50px"}),$("#payment-error").length||$("label[for=payment").css("color","red").append("<p id='payment-error'> Whoops, you must have forgotten to pay.</p>")):$("#payment-error").length&&($("#payment-error").remove(),$("label[for=payment").css("color","black")),"credit card"===$("#payment").val()&&($("#cc-num").val().length<1?$("#cc-num-error").length||$("label[for=cc-num]").css("color","red").append("<p id='cc-num-error'>Oh man, we can't process your payment if it's empty.</p>"):($("#cc-num-error").remove(),$("label[for=cc-num]").css("color","black"),validateCC($("#cc-num").val())),$("#zip").val().length<1?$("#zip-error").length||$("label[for=zip]").css("color","red").append("<p id='zip-error'> Sorry, the credit card company needs your zip code.</p>"):$("#zip-error").length&&($("#zip-error").remove(),$("label[for=zip").css("color","black")),$("#cvv").val().length<1?$("#cvv-error").length||$("label[for=cvv]").css("color","red").append("<p id='cvv-error'>That's those 3 little numbers on the back. We need those.</p>"):$("#cvv-error").length&&($("#cvv-error").remove(),$("label[for=cvv").css("color","black")))}var i;$(document).ready(function(){$("#name").focus(),$("#payment").children("option[value='credit card']").attr("selected",!0),$("p:contains('Paypal')").hide(),$("p:contains('Bitcoin')").hide(),$("#credit-card").show(),$("#other-title").hide(),$("label[for=color]").hide(),$("#color").hide(),$("#design").addClass("styled-select"),$("#size").addClass("styled-select"),$("#color").addClass("styled-select"),$("#payment").addClass("styled-select"),$("#title").addClass("styled-select"),$("#exp-month").addClass("styled-select"),$("#exp-year").addClass("styled-select")}),$("#title").change(function(){"other"===$(this).val()&&$("#other-title").show()}),$("#design").change(function(){$(this).children("option:first-child").is(":selected")?($("label[for=color]").hide(),$("#color").hide()):($("label[for=color]").show(),$("#color").show()),"js puns"===$(this).val()?($("#color").children('option[value="tomato"]').hide(),$("#color").children('option[value="steelblue"]').hide(),$("#color").children('option[value="dimgrey"]').hide(),$("#color").children('option[value="cornflowerblue"]').show(),$("#color").children('option[value="darkslategrey"]').show(),$("#color").children('option[value="gold"]').show()):"heart js"===$(this).val()&&($("#color").children('option[value="cornflowerblue"]').hide(),$("#color").children('option[value="darkslategrey"]').hide(),$("#color").children('option[value="gold"]').hide(),$("#color").children('option[value="tomato"]').show(),$("#color").children('option[value="steelblue"]').show(),$("#color").children('option[value="dimgrey"]').show())}),$(".activities").click(function(){var e=0;$("input[name=all]").is(":checked")&&(e+=200),$("input[name=js-frameworks]").is(":checked")?($("input[name=express]").attr("disabled",!0),e+=100):$("input[name=express]").attr("disabled",!1),$("input[name=js-libs]").is(":checked")?($("input[name=node]").attr("disabled",!0),e+=100):$("input[name=node]").attr("disabled",!1),$("input[name=express]").is(":checked")?($("input[name=js-frameworks]").attr("disabled",!0),e+=100):$("input[name=js-frameworks]").attr("disabled",!1),$("input[name=node]").is(":checked")?($("input[name=js-libs]").attr("disabled",!0),e+=100):$("input[name=js-libs]").attr("disabled",!1),$("input[name=build-tools]").is(":checked")&&(e+=100),$("input[name=npm]").is(":checked")&&(e+=100),addRemovePrice(e)}),$("#payment").change(function(){"paypal"===$(this).val()&&($("#credit-card").hide(),$('p:contains("Bitcoin")').hide(),$('p:contains("Paypal")').show()),"bitcoin"===$(this).val()&&($("#credit-card").hide(),$('p:contains("Paypal")').hide(),$('p:contains("Bitcoin")').show()),"credit card"===$(this).val()&&($("#credit-card").show(),$('p:contains("Paypal")').hide(),$('p:contains("Bitcoin")').hide())}),$("button[type=submit]").click(function(e){e.preventDefault(),validateForm()});