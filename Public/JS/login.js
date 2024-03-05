let form=$("#login__form");
is_error = false;
console.log(form);
form.submit((event)=>{
    event.preventDefault();
    $("body").addClass("cursor-wait");
    let formData={
        username: $("#username").val(),
        password: $("#password").val()
    };
    $.ajax({type:"POST",url:"/login",data:formData})
        .done((response)=>{
            console.log(response)
            window.location.href = response;
            $("body").removeClass("cursor-wait")
        })
        .fail((xhr,status,error)=>{//this function is to handle the invalid user name and password
            console.log(xhr.responseText);
            console.log(status);
            console.log(error);
            $("body").removeClass("cursor-wait");
            is_error = true;
            $("#username").addClass("error");
            $("#password").addClass("error");

        })
})

$("input").on("input", ()=>{
    $("#username").removeClass("error");
    $("#password").removeClass("error");
})

