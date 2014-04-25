/* Javascript for DsdXBlock. */
function DsdXBlock(runtime, element) {

    function updateCount(result) {
        $('.count', element).text(result.count);
    }

    var handlerUrl = runtime.handlerUrl(element, 'increment_count');
    $(function ($) {
        dsd.init(runtime, element);
    });
}