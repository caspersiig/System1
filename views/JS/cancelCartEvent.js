const btn = [...document.querySelectorAll('.cancel_btn')]

btn.forEach(button => {
    button.addEventListener('click', async() => {
        console.log("HEJ DRENGE! -- Hilsen Oliver")
    });
});