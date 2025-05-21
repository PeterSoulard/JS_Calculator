document.addEventListener("DOMContentLoaded", function() {

    function buttonClicked(id) {
        alert(id);
    }

    let buttons = document.getElementsByClassName("button");
    for (let i = 0; i < buttons.length; i++) {
        document.getElementsByClassName("button")[i].addEventListener("click", function() {
            buttonClicked(i);
        });
    }

});
