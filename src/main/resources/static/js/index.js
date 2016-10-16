$(document).ready(function () {
    $("#main").keypress(function (e) {
        if (e.which == 13 && $(this).val()) {
            $.ajax({
                url: "atodo",
                data: {content: $(this).val()}
            }).then(function (data) {
                $("#main").val('');
                $(".div_mid").append($("<div/>", {
                    id: "div_" + data.id
                }));
                $("#div_" + data.id).append($("<input type=checkbox>").click(function () {
                    var id_temp = $(this).parent().attr("id").substring(4);
                    var content_temp = $(this).siblings("input[type=text]").val();
                    var complite_temp = $(this).is(":checked");
                    alert(id_temp + content_temp + complite_temp);
                    /*if (complite_temp) {
                        $(this).parent().prop("class", "checked");
                    } else {
                        $(this).parent().removeAttr("class");
                    }*/
                    $.ajax({
                        url: "utodo",
                        data: {id: id_temp, content: content_temp, complete: complite_temp}
                    })/*.then(function (data) {
                        if (data > 0) {
                            //alert($(".div_mid").children(".checked").length);
                        }
                    })*/
                }));
                $("#div_" + data.id).append($("<input type=text value='" + data.content + "'>"));
                $("#div_" + data.id).append($("<input type=button value='DEL'>").click(function () {
                    $.ajax({
                        url: "dtodo",
                        data: {id: $(this).parent().attr("id").substring(4)}
                    }).then(function (data) {
                        $("#div_" + data).remove();
                        if ($(".div_mid").children().length == 0) {
                            $(".div_bot").prop("hidden", "hidden");
                        }
                    })
                }));
            });
            if ($(".div_bot").is(":hidden")) {
                $(".div_bot").removeAttr("hidden");
            }
        }
    });
});