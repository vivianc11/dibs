document.addEventListener("click", async (event)=>{
  let clicked = event.target;
  // console.log("this is what i clicked");
  // console.log(clicked.getAttribute("class"));
  // console.log(clicked.getAttribute("id"));

  if (clicked.getAttribute("class")==="picked-up mt-auto"){

    if(confirm("Are you sure the item was picked up? Proceeding will delete the item!")){
      const response = await fetch(`/api/item/${clicked.getAttribute("id")}`, {
        method: 'DELETE',
        body: JSON.stringify({
          id: clicked.getAttribute("id"),
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    //console.log("fetch test");
    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    } 
    }
  } else if (clicked.getAttribute("class")==="un-dib mt-auto") {

  if(confirm("Are you sure you want to put this item back in the market?")){
    const response = await fetch(`/api/item/${clicked.getAttribute("id")}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: clicked.getAttribute("id"),
        is_dibbed:false
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
// console.log("fetch test");
  if (response.ok) {
  // If successful, redirect the browser to the profile page
  // document.location.replace('/');
  // console.log("ok!")
  } else {
    alert(response.statusText);
  }
  }
  }
});