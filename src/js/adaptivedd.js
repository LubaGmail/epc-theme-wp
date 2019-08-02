//CMS library with functions for various functionalities. 

$(document).ready(function() {
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

});