
const stripe_btn = document.querySelector("#stripe");

console.log("hello")

stripe_btn.addEventListener('click', async() => {

    await fetch("/create-checkout-session", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({object: "Ahmed hest"})
    }).then(res => {
        console.log("Request complete! response:", res.status);
    });
});