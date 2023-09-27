var form = document.getElementById('my-form');

form.addEventListener('submit', addExpenses);



function addExpenses(e){
    e.preventDefault();

    var amount = document.getElementById('amount').value;
    var description = document.getElementById('description').value;
    var category = document.getElementById('category').value;


    const myObj = {
        amount: amount,
        description: description,
        category: category
    };

    localStorage.setItem(myObj.description,JSON.stringify(myObj));

    showUserOnScreen(myObj);

   
    form.reset();
}

function showUserOnScreen(myObj){
    var dataItems = document.getElementById('dataItems');
    var li = document.createElement('li');
    dataItems.appendChild(li);

    li.appendChild(document.createTextNode(myObj.amount));
    li.appendChild(document.createTextNode("-" + myObj.description));
    li.appendChild(document.createTextNode("-" + myObj.category));

    const deletebtn = document.createElement('input');
    deletebtn.type = "button";
    deletebtn.value = "Delete";
    deletebtn.onclick = () => {
        localStorage.removeItem(myObj.description);
        dataItems.removeChild(li);
    }
    li.appendChild(deletebtn);
    dataItems.appendChild(li);


    const editbtn = document.createElement('input');
    editbtn.type = "button";
    editbtn.value = "Edit";
    editbtn.onclick = () => {
        localStorage.removeItem(myObj.description);
        dataItems.removeChild(li);
        document.getElementById('amount').value = myObj.amount;
        document.getElementById('description').value = myObj.description;
        document.getElementById('category').value = myObj.category;
    }
    li.appendChild(deletebtn);
    li.appendChild(editbtn);
    dataItems.appendChild(li);
    
}






