
const stripe_btn = document.querySelector("#stripe");

console.log("hello")

stripe_btn.addEventListener('click', async() => {

    await fetch("/create-checkout-session", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({object: "Ahmed hest"})
    }).then(res => { 
        if(res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
    })
    .then(({ url }) => {
        window.location = url;
    })
    .catch(e => {
        console.error(e.error)
    })

});