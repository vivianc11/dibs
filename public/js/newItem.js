const newItemHandler = async (event) => {
  event.preventDefault();

  const itemName = document.querySelector('#item-name').value.trim();
  const itemDescription = document.querySelector('#item-descr').value.trim();
  const itemImage = document.querySelector('#image-upload')
  // alert("hi")
  // Set item ID to something specific instead of allowing it to autoincrement on its own, as that was causing issues with deletions:
  let itemId = (Date.now()+itemName.trim()+itemDescription.slice(0,5)).replace(/\s+/g, '');

  const response = await fetch('/api/item', {
    method: 'POST',
    body: JSON.stringify({ id: itemId, name: itemName, description: itemDescription }),
    headers: { 'Content-Type': 'application/json' },
  });
  // console.log(response);

  async function fetchItems() {
    const response = await fetch('/api/item');
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    const items = await response.json();
    // console.log(items[items.length-1].id)
    return items[items.length-1].id;
  }
 var nextId = await fetchItems();

  // console.log("This is the number of items")
  // fetchItems().then(function (result){
  //   console.log(result)
  //   itemCount=result
  // });
  // console.log("nextId");

  // console.log(nextId);
  // console.log(event.target.files); 
  // console.log(itemName, itemDescription);
  // console.log(itemImage.files[0])
  
  let formData = new FormData();
  formData.append('file',itemImage.files[0]);
  const response2 = await fetch(`/upload/${nextId}`, {
    method: 'POST',
    body: formData
  });
  
  // console.log("hit second response")

  // This will allow window to automatically refresh when we post new item
  window.location.reload();
}

document
  .getElementById('new-post-submit')
  .addEventListener('click' , newItemHandler);