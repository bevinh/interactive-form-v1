//TODO: Make sure that the error messages doesn't just keep repeating. Then move on to the other stuff :)


//When the page loads, give focus to the first text field
$(document).ready(function () {
    $("#name").focus();
    //The "Credit Card" payment option should be selected by default and result in the display of the #credit-card div, and hide the "Paypal" and "Bitcoin information.
    $("#payment").children("option[value='credit card']").attr("selected", true);
     $('p:contains("Paypal")').hide();
     $('p:contains("Bitcoin")').hide();
     $("#credit-card").show();
    $("#other-title").hide();
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
       if ($("#priceDiv").length > 0){
            $("#priceDiv").remove()
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
    

//Form validation: display error messages and don't let the user submit the form if any of these validation errors exist:
function validateForm(){
    //Name field can't be empty
    if ($('#name').val().length < 1) {
        $("html, body").animate({ scrollTop: "200px" });
        $("label[for=name").css("color", "red").append(" Whoops! You forgot your name!");        
    }
    //Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example. You'll need to use a regular expression to get this requirement. See the list of Resources for links to learn about regular expressions.
    if ($('#mail').val().length < 1) {
         $("html, body").animate({ scrollTop: "200px" });
        $("label[for=mail").css("color", "red").append(" Hmmm, your email doesn't seem to be quite right!");
    }
     //At least one activity must be checked from the list under "Register for Actitivities."
    if ( $('input[type=checkbox]:checked').length <= 0) {
        $("html, body").animate({ scrollTop: "200px" });
        $(".activities legend").css("color", "red").append(" Hey, you might want to join an activity at the conference.");
    }
    //Payment option must be selected.
    if ($('#payment').val() === "select_method"){
        $("html, body").animate({ scrollTop: "50px" });
        $("label[for=payment").css("color", "red").append(" Whoops, you must have forgotten to pay.");
    }
    //If "Credit card" is the selected payment option, make sure the user supplied a credit card number, a zip code, and a 3 number CVV val
    if ($('#payment').val() === "credit card"){
        if ($('#cc-num').val().length < 1) {
            $("label[for=cc-num").css("color", "red").append(" Oh man, we can't process your payment if it's empty.");
        }
        if ($('#zip').val().length < 1) {
            $("label[for=zip").css("color", "red").append(" Sorry, the credit card company needs your zip code.");
        }
        if ($('#cvv').val().length < 1) {
            $("label[for=cvv").css("color", "red").append(" That's those 3 little numbers on the back. We need those.");
        }
    }
}

    $("button[type=submit]").click(function( event ){
        event.preventDefault();
        validateForm();
    });
    
    
    
   
    
    


//Exceeds
//Hide the "Color" label and select menu until a T-Shirt design is selected from the "Design" menu.
//Style the "select" menus (drop down menus) on the form, so they match the styling of the text fields (see Resources links for an article on how to improve the look of select menus using CSS and JavaScript
//Validate the credit card number so that it's a validly formatted credit card number. (see the Resources links for information on how to do this.)