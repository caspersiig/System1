const btn = [...document.querySelectorAll('.addBtn')]


btn.forEach(button => {
  button.addEventListener('click', async() => {
      let data = {imgsrc:"../IMG/1.jpg", titel:"my item", pris: 40};
    
      await fetch("/postdata", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      }).then(res => {
        console.log("Request complete! response:", res);
        //window.location.href = "/menu"
      });
    });
});