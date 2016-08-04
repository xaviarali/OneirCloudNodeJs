/**
 * Created by Junal on 2016-06-24.
 */
$(document).ready(function () {
    /*
     Signup/Register user
     */
    $("#signin").submit(function (event) {
        event.preventDefault();
        var formData = $(this).serializeObject();
        $.ajax({
            type: 'POST',
            url: "http://localhost:3000/api/login",
            data: JSON.stringify(formData),
            timeout: 6000,
            contentType: 'application/json',
            dataType: 'json',
            success: function (msg) {
                /*
                    Login successful.
                 */
                $('.alert').hide();
                window.location.href = "index.html"
            },
            error: function (msg) {
                $('.alert').hide();
                $('.alert-danger').html(msg.responseText).show(1000);
            }
        });
    });
});