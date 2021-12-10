const in_quantity = [...document.querySelectorAll('.in_quantity')]

in_quantity.forEach(input => {

    input.contenteditable = false;


    let before_quan = parseInt(input.value);
    
  input.addEventListener('change', async() => {

    let parent = input.parentElement.parentElement; //TABLEROW
    let src = parent.firstChild.firstChild.src; //PRODUCT_IMGSRC
    let productname = parent.firstChild.lastChild.innerHTML; //PRODUCT_NAME
    let pris = parseInt(parent.children[1].children[0].innerHTML.substring(0,parent.children[1].children[0].innerHTML.length-4)); //svær kode men det virker. //PRODUCT_PRIS
    

    let after_quan = parseInt(input.value);


    let data = undefined;

   if(after_quan < before_quan){
        data = {do: "delete", object:{imgsrc: src, titel: productname, pris: pris}}
   }else{
        data = {do: "create", object:{imgsrc: src, titel: productname, pris: pris}}
   }
     
       await fetch("/updateItemQuantity", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      }).then(res => {
        console.log("Request complete! response:", res.status);
        location.reload();
      }); 
    });
});