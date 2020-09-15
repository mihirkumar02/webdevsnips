const db = firebase.firestore();

window.onload = showItems();

function showItems(){
    var count = 0;
    db.collection('items').orderBy('timestamp', 'desc').get().then(function(snapshot){
        snapshot.forEach(doc => {
            var allItems = document.getElementById('items');

            var newItem = document.createElement('div');
            newItem.id = 'singleitem';
            newItem.innerHTML = "<div><h2>" + ++count + ". " +  doc.data().item + "</h2></div>";
        
            var buttons = document.createElement('div');
            buttons.className = 'buttons';
        
            var editButton = document.createElement('button');
            editButton.type = 'button';
            editButton.className = 'edit-btn';
            editButton.id = doc.id;
            editButton.addEventListener('click', openEditForm);
            editButton.innerHTML = "<i class='fa fa-pencil'></i>";
            buttons.appendChild(editButton);
        
            var deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.className = 'delete-btn';
            deleteButton.id = doc.id;
            deleteButton.addEventListener('click', deleteItem);
            deleteButton.innerHTML = "<i class='fa fa-trash'></i>";
            buttons.appendChild(deleteButton);
        
            newItem.appendChild(buttons);
            allItems.appendChild(newItem);
        
        });
    })
}

function addItemToList(){
    var item = document.getElementById('item').value;

    if(item == ""){
        window.alert("Can't add empty item!");
    } else {
        db.collection('items').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            item: item
        })
        .then(() => {
            location.reload();
        })
        .catch((err) => {
            window.alert(err.message);
        });
    
        document.getElementById('item').value = "";
    }
}

var itemToBeEdited;

// Open the edit form
function openEditForm(event){
    itemToBeEdited = this.id;
    var editForm = document.getElementById('editContainer');
    editForm.style.display = "block";
    db.collection('items').doc(itemToBeEdited).get()
        .then(function(doc){
            document.getElementById('editedItem').value = doc.data().item;
        })    
        .catch(function(err){
            window.alert(err.message);
        })
}

// UPDATE / EDIT the item
function saveEditedItem(){
    var updatedItem = document.getElementById('editedItem').value;

    if(updatedItem == ""){
        window.alert("Can't update to empty item!");
    } else {
        db.collection('items').doc(itemToBeEdited).update({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            item: updatedItem
        })
        .then(function(){
            location.reload();
        })
        .catch(err => {
            window.alert(err.message);
        })
    }
}



// DELETE items present in list
function deleteItem(event){
    var itemToBeDeleted = this.id;

    db.collection('items').doc(itemToBeDeleted).delete()
    .then(function(){
        location.reload();
    })
    .catch(err => {
        window.alert(err.message);
    });
}