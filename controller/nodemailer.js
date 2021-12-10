import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config()


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", 
    port: 587,
    secureConnection: false,
       auth:{
           user: process.env.GMAIL_MAIL,
           pass: process.env.GMAIL_PASSWORD
       }
   })



export function mailToOwner(res,toString, client_name, client_tlf, client_time){
     
    const mailOptions = {
        from: process.env.GMAIL_MAIL,
        to: process.env.GMAIL_RECEIVER_TEST,
        subject: `From: ${process.env.GMAIL_MAIL} || BESTILLING`,
        text: "ORDRE: \n \n" + toString +"\nKundenavn:\t"+ client_name +"\nTlf:\t" +client_tlf+ "\n Afhentning: "+ client_time +`\n From: ${process.env.GMAIL_MAIL}`,
    }
  
       transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            console.log(err);
            res.send('error');
        }
        else{ 
            console.log('Email succesfully sent')
            res.send('succes');
        }

        
    })
}
//______________________________________________________________________________________________________________________________
//______________________________________________________________________________________________________________________________
//______________________________________________________________________________________________________________________________


export function mailToClient(res, toString, client_name, client_email, client_time){
     
       const mailOptions = {
           from: process.env.GMAIL_MAIL,
           to: client_email,
           subject: `From: ${process.env.GMAIL_MAIL} || ORDREBEKRÆFTELSE`,
           text: "\nTak for dit køb "+ client_name +". Din mad kan afhentes kl:"+ client_time +". Vi håber du vil blive tilfreds med din ordre \n\n"+ "DIN ORDRE: \n \n" + toString,
       }
     
       transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            console.log(err);
            res.send('error');
        }
        else{ 
            console.log('Email succesfully sent')
            res.send('succes');
        }
       })

}


//______________________________________________________________________________________________________________________________
//______________________________________________________________________________________________________________________________
//______________________________________________________________________________________________________________________________

export function mailContact(req, res){

     
       const mailOptions = {
           from: req.body.email,
           to: process.env.GMAIL_RECEIVER_TEST,
           subject: `From: ${req.body.email} || Subject: ${req.body.emne}`,
           text: req.body.text + "\nName: "+ req.body.navn +"\n"+ `From: ${req.body.email}`,
       }


       transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            console.log(err);
            res.send('error');
        }
        else{ 
            console.log('Email succesfully sent')
            res.send('succes');
        }
    })
     
       
}