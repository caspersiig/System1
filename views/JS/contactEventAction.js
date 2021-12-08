import { waitForPendingWrites } from "@firebase/firestore";

const contactForm = document.querySelector('.contact-form');

const C_email = document.querySelector('#email');
const C_name = document.querySelector('#navn');
const C_subject = document.querySelector('#emne');
const C_text = document.querySelector('#tekst');

window.alert("AALERT!")


contactForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    let mailData = {

        name: C_name.value,
        email: C_email.value,
        subject: C_subject.value,
        text: C_text.value

    };
     
if(C_name.value == 'a' || C_email.value == '' || C_text.value == ''){
    window.alert("Something went wrong \nPlease fill out the form correctly and try again.")
}else{   
    console.log(mailData);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/send-contact-form');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function(){
    if(xhr.responseText == 'succes'){
        window.alert("SUCCESFUL - Thank you for the submission. We will review your request and get back to you as fast as possible. Best regards Top100Movies");
        C_name.value = ''
        C_email.value = ''
        C_subject.value = ''
        C_text.value = ''
    }
    }
    xhr.send(JSON.stringify(mailData)); 
    }
})
