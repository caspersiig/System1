const btn = [...document.querySelectorAll('.addBtn')]

btn.forEach(button => {
  button.addEventListener('click', async() => {
    let dataArray = button.getAttribute("data").split(',')
      let data = {imgsrc:"../IMG/Retter/"+dataArray[0]+".png", titel:dataArray[0], pris: parseInt(dataArray[1])};

      await fetch("/postdata", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      }).then(res => {
        console.log("Request complete! response:", res.status);
        location.reload();
      });
    });
});