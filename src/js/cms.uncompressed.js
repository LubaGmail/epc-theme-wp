//CMS library with functions for various functionalities. 

$(document).ready(function() {

    //Spinner stop.
    $('#cms-spinnerArea').on('click', function() {
        $(this).hide();
        $("#hc-gov-assets").removeClass("cms-spinner-block");
    });

    //Smooth scrolling from top elements.
    $('a[href*="#"]:not([href="#"])').on('click', function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 250
                }, 1000);
                return false;
            }
        }
    });

    //Smooth scrolling for validation errors on alert-box
    // Select all links with hashes

    $('#cms-alert-box').on('click', '.cms-error-alert-link', function(event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname
        ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 1000, function() {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    }
                });
            }
        }
    });

    //Smooth scrolling for profile side-nav

    $('#twoli').on('click', function() {
        $('#cms-securityqns-show-box').focus();
        $('html, body').animate({
            scrollTop: $('#cms-securityqns-show-box').offset().top - 70
        }, 1000);
    });
    $('#threeli').on('click', function() {
        $('#change-password-box').focus();
        $('html, body').animate({
            scrollTop: $('#change-password-box').offset().top - 70
        }, 1000);
    });
    $('#fourli').on('click', function() {
        $('#cms-userid-password-box').focus();
        $('html, body').animate({
            scrollTop: $('#cms-userid-password-box').offset().top - 70
        }, 1000);
    });
    $('#fiveli').on('click', function() {
        $('#cms-register-mfa-box').focus();
        $('html, body').animate({
            scrollTop: $('#cms-register-mfa-box').offset().top - 70
        }, 1000);
    });
    $('#sixli').on('click', function() {
        $('#cms-remove-mfa-box').focus();
        $('html, body').animate({
            scrollTop: $('#cms-remove-mfa-box').offset().top - 70
        }, 1000);
    });

    //Expanding about/find your app.
    $('#cms-find a, #cms-about-header-link a').on('click', function() {
        $('.cms-hw-container').animate({
            height: '400'
        }, 800);
    });

    //Restoring initial height when scrolling back.
    $(window).on('scroll', function() {
        var scrollTop = $(window).scrollTop();
        if (scrollTop < 1) {
            $('.cms-hw-container').stop().animate({
                height: "300px"
            }, 200);
        } else {
            //Do nothing.
        }
    });

    //Back to top button and scroll animation fade in/out
    $('.cms-go-top').hide(); //Hidden on dom ready by default.
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 200) {
            $('.cms-go-top').fadeIn(500);
        } else {
            $('.cms-go-top').fadeOut(500);
        }
    });

    //Scroll to top smooth animation.
    $('.to-top').each(function() {
        $(this).on('click', function() {
            $('html,body').animate({
                scrollTop: 0
            }, 'slow');
            return false;
        });
    });

    //Modals on homepage widgets dropdown

    //Select2 initialize
    if ($('#cms-helpdesk-selectbox').length > 0) {
        $("#cms-helpdesk-selectbox").select2({
            placeholder: "Find Your Application",
            allowClear: true
        });
    }

    $("#cms-helpdesk-selectbox").change(function() {
        $($(this).val()).modal('show');
        // console.log('calling from selectbox');
    });

    //Adding down caret via FA
    $('.select2-arrow > b').hide();
    $('.select2-arrow').append('<i class="fa fa-chevron-down" aria-hidden="true"></i>');

    //Reset dropdown after dismissing the modal.
    $('[id^=cms-modal-]').on('hidden.bs.modal', function() {
        $('#cms-helpdesk-selectbox').select2("val", "");
    });

    //Adaptive Placeholders for Dropdowns.
    $(function() {
        var onClass = "on";
        var showClass = "show";
        $("input, select[id^=cms-]")
            .on("checkval", function() {
                var label = $(this).prev(".cms-select-opt");
                if (this.value !== "")
                    label.addClass(showClass);
                else
                    label.removeClass(showClass);
            })
            .on("keyup", function() {
                $(this).trigger("checkval");
            })
            .on("focus", function() {
                $(this).prev("label").addClass(onClass);
            })
            .on("blur", function() {
                $(this).prev("label").removeClass(onClass);
            })
            .trigger("checkval");

        $("select[id^=cms-]").on("change", function() {
                var $this = $(this);
                if ($this.val() === "")
                    $this.addClass("cms-watermark");
                else
                    $this.removeClass("cms-watermark");
                $this.trigger("checkval");
            })
            .change();
    });


    //Tooltips/Popovers
    // $('[data-toggle="tooltip"]').tooltip();

    //UserID popover settings
    var popOverUserIDSettings = {
        trigger: 'focus',
        placement: 'auto left',
        container: 'body',
        html: true,
        title: 'User ID Requirements',
        content: '&#8226; Must be between 6 and 74 characters and contain at least 1 letter.<br/> &#8226; Can contain alphanumeric characters.<br/> &#8226; Allowed special characters are limited to hyphens (-), underscores (_), apostrophes (‘), and periods (.).<br/> &#8226; The @ symbol is allowed only if the User ID is in a valid email address format (j.doe@abc.xxx or 123@abc.com).<br/> &#8226; Cannot contain 9 consecutive numbers.<br/> &#8226; Cannot begin or end with special characters, or contain more than 1 consecutive special character.'
    };

    //Password popover settings
    var popOverPasswordSettings = {
        trigger: 'focus',
        placement: 'auto left',
        container: 'body',
        html: true,
        title: 'Password Requirements',
        content: '&#8226; Your Password must be changed at least every 60 days.<br/> &#8226; Be a minimum of 8 and a maximum of 20 characters.<br/> &#8226; Passwords must contain: 1 upper case and 1 lower case letter, 1 number, and 1 special character.<br/> &#8226; The following special characters may not be used &#63; &#60;&#62; &#40;&#41; &#39; &#34; &#47; &#92; &#38;.<br/> &#8226; Passwords must be different from previous passwords, cannot contain your User ID or commonly used words.<br/> &#8226; Password can only be changed once every 24 hours.'
    };

    //Password Confirm popover settings
    var popOverConfirmPasswordSettings = {
        trigger: 'focus',
        placement: 'auto right',
        container: 'body',
        html: true,
        title: 'Confirm Password',
        content: 'Enter the same password.'
    };

    //Calling settings for popovers, the classes below must be added to the field as well as the settings for them to work, see new user registration step #3 for examples.
    $('.cms-userid-field').popover(popOverUserIDSettings);
    $('.cms-password-field').popover(popOverPasswordSettings);
    $('.cms-conf-password-field').popover(popOverConfirmPasswordSettings);

    //Interior Nav highlight my profile.
    $(".cms-interior-navigation a").on("click", function() {
        $(".cms-interior-navigation").find(".active").removeClass("active");
        $(this).parent().addClass("active");
    });

    //Bootstrap Accordion - One expanded at a time.
    var $accordion = $('#accordion');
    $accordion.on('show.bs.collapse', '.collapse', function() {
        $accordion.find('.collapse.in').collapse('hide');
    });





    //Collapse menu once selection is made or when clicking outside of it.
    $(document).on('click', function() {
        $('.navbar-collapse.in').collapse('hide');
    });
    $(window).on('scroll', function() {
        $('.navbar-collapse.in').collapse('hide');
    });


    //Sticky Sidenav.
    var $body = $(document.body);
    var navHeight = $('.navbar').outerHeight(true) + 10;


    $('#sidenav-ul').affix({
        offset: {
            /* affix after header */
            top: 100,
            /* un-affix when footer is reached */
            bottom: function() {
                return (this.bottom = $('footer').outerHeight(true) + 20);
            }
        }
    });

    $body.scrollspy({
        target: '#side-nav-container',
        offset: navHeight
    });

    //Styleguide Scripts
    var acc = document.getElementsByClassName("accordion-radiobutton");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].onclick = function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        };
    }

    $("#cms-login-userid").on("keyup", function(e) {
        //EIDM .. Show MFA Entry
        var typedValue = e.target.value.toLowerCase();
        var isEidm = typedValue.toLowerCase().indexOf("eidm") != -1 ? true : false;
        if (isEidm) {
            $('#cms-show-mfa').slideDown(800);
        } else {
            $('#cms-show-mfa').slideUp(800);
        }
    });

    //End doc.ready

    //Mockups special Cases - In Progress.
    //Disclosure
    $('#uicomps').after('<div class="cms-stg-disclosure"><i class="cms-progress fa fa-spinner" aria-hidden="true"></i><span>Please note that this styleguide is a work in progress and it is updated periodically to reflect any updates in requirements.</span></div>');

    $('#Colors, #Alerts, #Buttons, #FormComtrols, #ExternalR').prepend('<i class="cms-progress fa fa-spinner" aria-hidden="true"></i><span>In Progress - </span>');

    //Password fields functionality.  
    $('#cms-user-password-sg, #cms-user-password-conf-sg').before('<div class="cms-sh-icons"><i class="fa fa-eye-slash" aria-hidden="true" tabindex="0"></i><i class="fa fa-eye" aria-hidden="true"></i></div>');

    //Begin hide cross lash
    $('.fa-eye-slash').hide();
    //Mask means password hidden
    mask = true;
    $('.cms-sh-icons').on('click', function() {
        //If masked then we show
        if (mask === true) {
            mask = false;
            $(this).parent().find('input').attr("type", "text");
            $(this).parent().find('.fa-eye-slash').show();
            $(this).parent().find('.fa-eye').hide();
        } else {
            mask = true;
            $(this).parent().find('input').attr("type", "password");
            $(this).parent().find('.fa-eye').show();
            $(this).parent().find('.fa-eye-slash').hide();
        }
        //We return focus to the actual field
        $(this).parent().find('input').focus();
    });

    //Hide the password value when leaving the field.
    $('#cms-user-password-sg, #cms-user-password-conf-sg').on('blur', function() {
        $(this).attr("type", "password");
        $(this).parent().find('.fa-eye').show();
        $(this).parent().find('.fa-eye-slash').hide();
    });


    //Validate passwords' value
    $('#cms-user-password-conf-sg').on('blur', function() {
        var id = $(this).attr('id');
        //Check only if not empty
        if ($(this).val()) {
            if ($('#cms-user-password-sg').val() == $(this).val() && $('#cms-user-password-sg').val()) {
                //console.log('Same Value');
                $(this).parent().find('span.cms-inline-error-match').remove();
                $('#cms-user-password-sg').parent().find('span.cms-inline-error-match').remove();
                $(this).removeClass('cms-error-border-match');
                $('#cms-user-password-sg').removeClass('cms-error-border-match');
            } else {
                //console.log('Not Same Value');
                if ($(this).parent().find('span.cms-inline-error-match').length < 1) {
                    $(this).parent().append('<span id="' + id + '-error-match" class="cms-inline-error-match cms-error"><span class="sr-only">Error:</span> Must match Password value.</span>');
                    $(this).addClass("cms-error-border-match");
                }
            }
        } else if (!$(this).val()) {
            //If empty, then do regular empty check.
            $(this).parent().find('span.cms-inline-error-match').remove();
            $(this).removeClass('cms-error-border-match');
        }
    });

    //Validate passwords' value both ways
    $('#cms-user-password-sg').on('blur', function() {
        var id = $(this).attr('id');
        //Check only if not empty
        if ($(this).val() && $('#cms-user-password-conf-sg').val()) {
            if ($('#cms-user-password-conf').val() == $(this).val()) {
                //console.log('Same Value');
                $(this).parent().find('span.cms-inline-error-match').remove();
                $('#cms-user-password-conf-sg').parent().find('span.cms-inline-error-match').remove();
                $(this).removeClass('cms-error-border-match');
                $('#cms-user-password-conf-sg').removeClass('cms-error-border-match');
            } else {
                //console.log('Not Same Value');
                if ($(this).parent().find('span.cms-inline-error-match').length < 1) {
                    $(this).parent().append('<span id="' + id + '-error-match" class="cms-inline-error-match cms-error"><span class="sr-only">Error:</span> Must match Password value.</span>');
                    $(this).addClass("cms-error-border-match");
                }
            }
        } else if (!$(this).val()) {
            //If empty, then do regular empty check.
            $(this).parent().find('span.cms-inline-error-match').remove();
            $(this).removeClass('cms-error-border-match');
        }
    });


});