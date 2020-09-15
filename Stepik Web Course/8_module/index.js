module.exports.changes = function($) {
    $("button").on("click", () => {
        if ($("#resizable").width() == 100) {
            $("#resizable").css({width: '200px'});
            return;
        } else {
            $("#resizable").css({width: '100px'});
        }
    });
}
