const btn = [...document.querySelectorAll('.cancel_btn')]

btn.forEach(button => {
    button.addEventListener('click', async() => {
      let itemTitle = button.getAttribute("titel");
      let itemQuan = parseInt(button.getAttribute("quan"));
      let data = { titel:  itemTitle, quan: itemQuan };
      
      await fetch("/deleteData", {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      }).then(res => {
        console.log("Request complete - Data is deleted! Response: ", res.status);
        location.reload();
      });
    });
});