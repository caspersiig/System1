const betalKnap = [...document.querySelectorAll('.knap')];
const modal = [...document.querySelectorAll('#modal')];
const modalContent = [...document.querySelectorAll('#modal_content')];
const body = [...document.querySelectorAll('body')];
const classBody = [...document.querySelectorAll('#body')];

// luk knap
const span = [...document.querySelectorAll('.close')];

betalKnap.forEach(btn => {
    btn.addEventListener("click", () => {
        modal[0].style.display = "block"
        classBody[0].style.opacity="0.2"
    });
})

span.forEach(btn => {
    btn.addEventListener("click", () => {
        modal[0].style.display="none"; 
        classBody[0].style.opacity="1"
    });
}) 

window.addEventListener("click", (e) => {
    if (e.target == body[0] || e.target == modal[0]) {
        classBody[0].style.opacity="1"
        body[0].style.opacity="1";
        modal[0].style.display="none"
    }
})