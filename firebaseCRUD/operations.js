// Must add this line before doing any operations on Firebase firestore
// db is used to access the collections in your database
const db = firebase.firestore();

// 1. CREATE - Adding new items 

function addItemToList(){
    var item = document.getElementById('item').value;

    if(item == ""){
        // Don't allow empty items to be added.
        window.alert("Can't add empty item!");
    } else {
        // Code to ADD data to firebase
        db.collection('items').add({
            // Timestamp is added this way in Firebase
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            item: item
        })
        .then(() => {
            // Reload page once item added
            location.reload();
        })
        .catch((err) => {
            window.alert(err.message);
        });
    
        // Reset form field to empty once item is added
        document.getElementById('item').value = "";
    }
}


// =============================================================================================================================

// 2. READ - Show the items which already exist, when the page loads
window.onload = showItems();
function showItems(){
    var count = 0;

    // Ordering the items in Descending order of the time they were created (Most recent comes on top!)
    // Code used to READ data from firebase
    db.collection('items').orderBy('timestamp', 'desc').get().then(function(snapshot){
        snapshot.forEach(doc => {
            var allItems = document.getElementById('items');
            
            // ================== Creating HTML elements using JS ====================

            // Creating a new Item for each doc found in the database. This item will be appended to the list.
            var newItem = document.createElement('div');
            newItem.id = 'singleitem';
            newItem.innerHTML = "<div><h2>" + ++count + ". " +  doc.data().item + "</h2></div>";
            
            // Creating a div for edit and delete buttons
            var buttons = document.createElement('div');
            buttons.className = 'buttons';
            
            // Edit button
            var editButton = document.createElement('button');
            editButton.type = 'button';
            editButton.className = 'edit-btn';
            editButton.id = doc.id;
            editButton.addEventListener('click', openEditForm);
            editButton.innerHTML = "<i class='fa fa-pencil'></i>";
            buttons.appendChild(editButton);
        
            // Delete button
            var deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.className = 'delete-btn';
            deleteButton.id = doc.id;
            deleteButton.addEventListener('click', deleteItem);
            deleteButton.innerHTML = "<i class='fa fa-trash'></i>";
            buttons.appendChild(deleteButton);
        
            // Adding the buttons to the new Item
            newItem.appendChild(buttons);

            // Adding the new Item to the all Items list.
            allItems.appendChild(newItem);
        });
    })
}

// =============================================================================================================================

// 3. UPDATE - Edit items which already exist

var itemToBeEdited; // Stores doc id to be edited in firebase; A particular doc in firebase is referenced using doc id


// Open the edit form
function openEditForm(event){
    itemToBeEdited = this.id; // On clicking the pencil icon beside an item, the id of that item is retrieved with event, and stored in itemToBeEdited
    var editForm = document.getElementById('editContainer');
    editForm.style.display = "block"; // Display the edit item form now

    // Retrieve that particular item to show the user in edit item form field.
    // Code used to READ data from firebase
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
    var updatedItem = document.getElementById('editedItem').value; // Get the value of item from edit item form.

    if(updatedItem == ""){
        // Don't allow update to an empty item
        window.alert("Can't update to empty item!");
    } else {
        // Code used to UPDATE data in firebase
        db.collection('items').doc(itemToBeEdited).update({
            // Timestamp is added this way in Firebase
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            item: updatedItem
        })
        .then(function(){
            //  Reload page after editing item
            location.reload();
        })
        .catch(err => {
            window.alert(err.message);
        })
    }
}



// =============================================================================================================================

// 4. DELETE - Remove items present in list
function deleteItem(event){
    var itemToBeDeleted = this.id; // On clicking the trash icon beside an item, the id of that item is retrieved with event, and stored in itemToBeDeleted

    // Code used to DELETE data in firebase
    db.collection('items').doc(itemToBeDeleted).delete()
    .then(function(){
        // Reload page after deleting item
        location.reload();
    })
    .catch(err => {
        window.alert(err.message);
    });
}