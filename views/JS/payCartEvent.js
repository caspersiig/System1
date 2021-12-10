const betalKnap = document.querySelector('.knap');
const modal = [...document.querySelectorAll('#modal')];
const modalContent = [...document.querySelectorAll('#modal_content')];
const body = [...document.querySelectorAll('body')];
const classBody = [...document.querySelectorAll('#body')];

const timestamp = document.querySelector('#time');

// luk knap
const span = [...document.querySelectorAll('.close')];

const date_closing = new Date()
date_closing.setHours(20);
date_closing.setMinutes(30);

const date_open = new Date()
date_open.setHours(15);
date_open.setMinutes(30);



timestamp.addEventListener('change', () =>{

    let user_time = timestamp.value;

    let date = new Date();
    date.setHours(parseInt(user_time.substring(0,2)));
    date.setMinutes(parseInt(user_time.substring(3,5)));

    console.log(date)
    console.log(date_open)
    console.log(date_closing)

        if(date_open <= date && date <= date_closing){
            
            betalKnap.disabled = false;
            betalKnap.style.cursor = "pointer"


                betalKnap.addEventListener('click', async() => {
                    user_time = timestamp.value;
                    let client_name = document.querySelector('#kunde_navn').value;
                    let client_email = document.querySelector('#kunde_email').value;
                    let client_tlf = document.querySelector('#kunde_tlf').value;



                    let data = { client_name: client_name, client_email: client_email, client_tlf : client_tlf, client_time: user_time};
                    
                    await fetch("/postCartClientInfo", {
                        method: "POST",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(data)
                    }).then(res => {
                        console.log("Request complete - Res:", res.status);
                    });
                    });

                betalKnap.addEventListener("click", () => {
                    modal[0].style.display = "block";
                    classBody[0].style.opacity="0.2";
                });

            span.forEach(btn => {
                btn.addEventListener("click", () => {
                    modal[0].style.display="none"; 
                    body[0].style.opacity="1"; 
                    classBody[0].style.opacity="1";
                });
            }) 

            window.addEventListener("click", (e) => {
                if (e.target == body[0] || e.target == modal[0]) {
                    classBody[0].style.opacity="1";
                    body[0].style.opacity="1";
                    modal[0].style.display="none";
                }
            })
        }else{
            classBody[0].style.opacity="1";
            body[0].style.opacity="1";
            modal[0].style.display="none";
            betalKnap.disabled = true;
            betalKnap.style.opacity = "1"
            betalKnap.style.cursor = "not-Allowed"
        }
})