$(document).ready(function () {
    $("#all-cb").prop("checked", false);
    $("#all-cb").click(function () {
        var checked = $(this).is(":checked");
        $.ajax({
            url: "utodos",
            data: {complete: checked}
        }).then(function () {
            $("#div_mid").children().each(function () {
                var cb_local = $(this).children("input[type=checkbox]").prop("checked", checked);
                if (checked) {
                    cb_local.parent().prop("class", "checked");
                    setItemsHidden("active")
                } else {
                    cb_local.parent().removeAttr("class");
                    setItemsHidden("completed")
                }
            })
        });
    });

    $("#main").keypress(function (e) {
        if (e.which == 13 && $(this).val()) {
            $.ajax({
                url: "atodo",
                data: {content: $(this).val()}
            }).then(function (data) {
                $("#main").val('');
                $("#div_mid").append($("<div/>", {
                    id: "div_" + data.id
                }));
                setItemsCount();
                $("#div_" + data.id).append($("<input type=checkbox>").click(function () {
                    var id_temp = $(this).parent().prop("id").substring(4);
                    var content_temp = $(this).siblings("input[type=text]").val();
                    var complete_temp = $(this).is(":checked");
                    if (complete_temp) {
                        $(this).parent().prop("class", "checked");
                        setItemsHidden("active")
                    } else {
                        $(this).parent().removeAttr("class");
                        setItemsHidden("completed")
                    }
                    if (($("#div_mid").children("").length - $("#div_mid").children(".checked").length) == 0) {
                        $("#all-cb").prop("checked", true);
                    } else {
                        $("#all-cb").prop("checked", false);
                    }
                    updateItem(id_temp, content_temp, complete_temp);
                }));
                $("#div_" + data.id).append($("<input type=text value='" + data.content + "' readonly>"));
                $("#div_" + data.id).append($("<input type=button value='DEL'>").click(function () {
                    delItem($(this).parent().attr("id").substring(4));
                }));
            });
            show();
        }
    });

    $("#all").click(function () {
        $("#div_mid").prop("class", "all");
        setItemsHidden("all");
    });

    $("#active").click(function () {
        $("#div_mid").prop("class", "active");
        setItemsHidden("active");
    });

    $("#completed").click(function () {
        $("#div_mid").prop("class", "completed");
        setItemsHidden("completed");
    });

    $("#clear").click(function () {
        if ($("#div_mid").children("div").length > 0) {
            $("#div_mid").children("div").each(function () {
                if ($(this).prop("class")) {
                    delItem($(this).prop("id").substring(4))
                }
            })
        }
    });

    var setItemsCount = function () {
        var all_divs = $("#div_mid").children("").length;
        var checked_divs = $("#div_mid").children(".checked").length;
        var unchecked_divs = all_divs - checked_divs;
        $("#items").text(unchecked_divs + " of " + all_divs);
    };

    var setItemsHidden = function (c) {
        if (c == "all" && c == $("#div_mid").attr("class")) {
            if ($("#div_mid").children("div").length > 0) {
                $("#div_mid").children("div").each(function () {
                    if ($(this).is(":hidden")) {
                        $(this).removeAttr("hidden");
                    }
                })
            }
        } else if (c == "active" && c == $("#div_mid").attr("class")) {
            if ($("#div_mid").children("div").length > 0) {
                $("#div_mid").children("div").each(function () {
                    if (!$(this).prop("class")) {
                        $(this).removeAttr("hidden");
                    } else {
                        $(this).prop("hidden", "hidden");
                    }
                })
            }
        } else if (c == "completed" && c == $("#div_mid").attr("class")) {
            if ($("#div_mid").children("div").length > 0) {
                $("#div_mid").children("div").each(function () {
                    if ($(this).prop("class")) {
                        $(this).removeAttr("hidden");
                    } else {
                        $(this).prop("hidden", "hidden");
                    }
                })
            }
        }
    };

    var updateItem = function (id_temp, content_temp, complete_temp) {
        $.ajax({
            url: "utodo",
            data: {id: id_temp, content: content_temp, complete: complete_temp}
        }).then(function () {
            setItemsCount();
        })
    };

    var delItem = function (item_id) {
        $.ajax({
            url: "dtodo",
            data: {id: item_id}
        }).then(function (data) {
            $("#div_" + data).remove();
            if ($("#div_mid").children("").length == 0) {
               hide();
            }
            setItemsCount();
        })
    };

    var hide = function() {
        $("#all-cb").prop("checked", false);
        $("#all-cb").prop("hidden", "hidden");
        $("#div_bot").prop("hidden", "hidden");
    }

    var show = function() {
        if ($("#all-cb").is(":hidden")) {
            $("#all-cb").removeAttr("hidden");
            $("#div_bot").removeAttr("hidden");
        }
    }
});