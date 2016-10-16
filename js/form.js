var i; //counter variable

//When the page loads, give focus to the first text field
$(document).ready(function () {
    $("#name").focus();
    //The "Credit Card" payment option should be selected by default and result in the display of the #credit-card div, and hide the "Paypal" and "Bitcoin information.
    $("#payment").children("option[value='credit card']").attr("selected", true);
    $("p:contains('Paypal')").hide();
    $("p:contains('Bitcoin')").hide();
    $("#credit-card").show();
    $("#other-title").hide();

    //Hide the "Color" label and select menu until a T-Shirt design is selected from the "Design" menu.
    $("label[for=color]").hide();
    $("#color").hide();
    
    //Style all the dropdowns using both jQuery and CSS
    $("#design").addClass("styled-select");
    $("#size").addClass("styled-select");
    $("#color").addClass("styled-select");
    $("#payment").addClass("styled-select");
    $("#title").addClass("styled-select");
    $("#exp-month").addClass("styled-select");
    $("#exp-year").addClass("styled-select");
   });

//"Job Role" section of the form:
    //reveal a text field when the "Other" option is selected from the "Job Role" drop down menu
    $( "#title" ).change(function() {
        if($(this).val() === "other"){
           $("#other-title").show();
        }
    });

//"T-Shirt Info" section of the form: 
    //for the T-Shirt color menu, only display the options that match the design selected in the "Design" menu.
    $("#design").change(function(){
        //if the Select Theme is chosen, make sure the color label is hidden
        if ($(this).children('option:first-child').is(':selected')){
            $("label[for=color]").hide();
            $("#color").hide();
        } else {
        $("label[for=color]").show();
        $("#color").show();
        }
        //If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
        if($(this).val() === "js puns") {
            $("#color").children('option[value="tomato"]').hide();
            $("#color").children('option[value="steelblue"]').hide();
            $("#color").children('option[value="dimgrey"]').hide();
            $("#color").children('option[value="cornflowerblue"]').show();
            $("#color").children('option[value="darkslategrey"]').show();
            $("#color").children('option[value="gold"]').show();
        } else if ($(this).val() === "heart js") {
            //If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
            $("#color").children('option[value="cornflowerblue"]').hide();
            $("#color").children('option[value="darkslategrey"]').hide();
            $("#color").children('option[value="gold"]').hide();
            $("#color").children('option[value="tomato"]').show();
            $("#color").children('option[value="steelblue"]').show();
            $("#color").children('option[value="dimgrey"]').show();
        }
    });

    //Create a function to add and remove a div when you calculate the price
   function addRemovePrice(price) {
       if ($("#priceDiv").length > 0) {
            $("#priceDiv").remove();
            $(".activities").append("<div id='priceDiv'>$" + price);
       } else {
           $(".activities").append("<div id='priceDiv'>$" + price);
       }
   }

//"Register for Activities" section of the form:
    //Some events are at the same time as others. If the user selects a workshop, don't allow selection of a workshop at the same date and time -- you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.
    //When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.
    $(".activities").click(function(){
        var price = 0;
        
        if ($('input[name=all]').is(":checked")) {
            price = price + 200;
        }
        
        if ($('input[name=js-frameworks]').is(":checked")) {
            $('input[name=express]').attr("disabled", true);
            price = price + 100;
        } else {
            $('input[name=express]').attr("disabled", false);
        }
        
        if ($('input[name=js-libs]').is(":checked")) {
            $('input[name=node]').attr("disabled", true);
            price = price + 100;
        } else {
            $('input[name=node]').attr("disabled", false);
        }
        
        if ($('input[name=express]').is(":checked")) {
            $('input[name=js-frameworks]').attr("disabled", true);
            price = price + 100;
        } else {
            $('input[name=js-frameworks]').attr("disabled", false);
        }
        
        if ($('input[name=node]').is(":checked")) {
            $('input[name=js-libs]').attr("disabled", true);
            price = price + 100;
        } else {
            $('input[name=js-libs]').attr("disabled", false);
        }
        
        if ($('input[name=build-tools]').is(":checked")) {
            price = price + 100;
        }
        
        if ($('input[name=npm]').is(":checked")) {
            price = price + 100;
        }
         //As a user selects activities to register for, a running total is listed below the list of checkboxes. For example, if the user selects "Main conference" then Total: $200 should appear. If they add 1 workshop, the total should change to Total: $300.
        addRemovePrice(price);
    });
    
   

//Payment Info section of the form: display payment sections based on chosen payment option
    $("#payment").change(function(){
        //When a user selects the "PayPal" payment option, display the Paypal information, and hide the credit card information and the "Bitcoin" information.
        if($(this).val() === "paypal") {
            $('#credit-card').hide();
            $('p:contains("Bitcoin")').hide();
             $('p:contains("Paypal")').show();
        }
        //When a user selects the "Bitcoin" payment option, display the Bitcoin information, and hide the credit card and paypal information.
        if($(this).val() === "bitcoin") {
            $('#credit-card').hide();
            $('p:contains("Paypal")').hide();
             $('p:contains("Bitcoin")').show();
        }
        //When a user selects the CC payment option, display the credit card information, and hide the paypal and bitcoin information.
        if($(this).val() === "credit card") {
            $("#credit-card").show();
            $('p:contains("Paypal")').hide();
            $('p:contains("Bitcoin")').hide();
        }
    });

//Validate the credit card number so that it's a validly formatted credit card number. 
function validateCC(ccnum) {
    var lastDig = ccnum.split("").pop();
    //Drop the last digit
    ccnum = ccnum.slice(0, ccnum.length -1);
    var ccnumArray = ccnum.split("");
    //Reverse the digits
    ccnumArray.reverse();
    //Multiply odd digits by 2
    var l = ccnumArray.length; 
    for ( i = 0; i < l; i+=2) {
        ccnumArray[i] *= 2;
        //Subtract 9 to numbers over 9
        if (ccnumArray[i] > 9) {
            ccnumArray[i] -= 9;
        }
    }
    var total = 0;
    var number;
    for (i = 0, l = ccnumArray.length; i < l; i+=1 ) {
        number = parseInt(ccnumArray[i]);
        total = total + number;
    }
    var isDivisible = total % 10;
    if (isDivisible === lastDig) {
        if ($("#payment-invalid").length) {
            $("#payment-invalid").remove();
            $("label[for=cc-num]").css("color", "black");
        }
    } else {
        if (!$("#payment-invalid").length) {
            $("label[for=cc-num]").append("<p id='payment-invalid'>Your credit card number is invalid. Did you perhaps type it wrong?</p>").css("color", "red");
            
        }
    }
   
}
//Form validation: display error messages and don't let the user submit the form if any of these validation errors exist:
function validateForm(){
    //Name field can't be empty
    if ($('#name').val().length < 1) {
        $("html, body").animate({ scrollTop: "200px" });
        if (!$("#name-error").length) {
            $("label[for=name").css("color", "red").append("<p id='name-error'> Whoops! You forgot your name! </p>"); 
        }
    } else {
         if ($("#name-error").length) {
            $("#name-error").remove();
            $("label[for=name").css("color", "black");
        }
    }
    //Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example. You'll need to use a regular expression to get this requirement. See the list of Resources for links to learn about regular expressions.
    if ($('#mail').val().length < 1) {
         $("html, body").animate({ scrollTop: "200px" });
        if (!$("#mail-error").length) {
        $("label[for=mail").css("color", "red").append("<p id='mail-error'> Hmmm, your email doesn't seem to be quite right!</p>");
        }
    } else {
         if ($("#mail-error").length) {
            $("#mail-error").remove();
            $("label[for=mail").css("color", "black");
        }
    }
     //At least one activity must be checked from the list under "Register for Actitivities."
    if ( $('input[type=checkbox]:checked').length <= 0) {
        $("html, body").animate({ scrollTop: "200px" });
        if (!$("#activities-error").length) {
            $(".activities legend").css("color", "red").append("<p id='activities-error'>Hey, you might want to join an activity at the conference.</p>");
        }
    } else {
         if ($("#activities-error").length) {
            $("#activites-error").remove();
            $(".activities legend").css("color", "black");
        }
    }
    //Payment option must be selected.
    if ($('#payment').val() === "select_method"){
        $("html, body").animate({ scrollTop: "50px" });
        if (!$("#payment-error").length) {
            $("label[for=payment").css("color", "red").append("<p id='payment-error'> Whoops, you must have forgotten to pay.</p>");
        }
    } else {
         if ($("#payment-error").length) {
            $("#payment-error").remove();
            $("label[for=payment").css("color", "black");
        }
    }
    //If "Credit card" is the selected payment option, make sure the user supplied a credit card number, a zip code, and a 3 number CVV val
    if ($('#payment').val() === "credit card"){
        if ($('#cc-num').val().length < 1) {
            if (!$("#cc-num-error").length) {
            $("label[for=cc-num]").css("color", "red").append("<p id='cc-num-error'>Oh man, we can't process your payment if it's empty.</p>");
            }
        } else {
            $("#cc-num-error").remove();
             $("label[for=cc-num]").css("color", "black");
            validateCC($('#cc-num').val());
        }
        if ($('#zip').val().length < 1) {
            if (!$("#zip-error").length) {
            $("label[for=zip]").css("color", "red").append("<p id='zip-error'> Sorry, the credit card company needs your zip code.</p>");
            }
        } else {
             if ($("#zip-error").length) {
                $("#zip-error").remove();
                $("label[for=zip").css("color", "black");
            }
    }
        if ($('#cvv').val().length < 1) {
            if (!$("#cvv-error").length) {
            $("label[for=cvv]").css("color", "red").append("<p id='cvv-error'>That's those 3 little numbers on the back. We need those.</p>");
            }
        } else {
             if ($("#cvv-error").length) {
                $("#cvv-error").remove();
                $("label[for=cvv").css("color", "black");
            }
        }
    }
}

//Intercept the button action and validate the form before a submit action
$("button[type=submit]").click(function( event ){
    event.preventDefault();
    validateForm();
});
