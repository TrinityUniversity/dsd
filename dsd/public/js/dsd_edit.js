/* Javascript for DsdXBlock. */
function DsdXBlock(runtime, element) {

    function updateCount(result) {
        $('.count', element).text(result.count);
    }

    var handlerUrl = runtime.handlerUrl(element, 'save_teacher');

    $('.save-button', element).click(function(eventObject) {
        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: JSON.stringify(
                {   "stage": dsd.stage(),
                    "nodes": dsd.nodes(),
                    "lines": dsd.lines()
                }),
            success: updateCount
        });
    });

    $(function ($) {
        dsd.init(runtime, element);
    });
}