async function addUsers(e){
    try{
        e.preventDefault();

        const amount = document.getElementById('expenseid').value;
        const description = document.getElementById('desid').value;
        const category = document.getElementById('listid').value;

        console.log(amount, description, category);
        const expense = {
            amount: amount,
            description: description,
            category: category
        };

        console.log(expense);

        //localStorage.setItem(user.description,JSON.stringify(user));
        const res = await axios.post('http://localhost:2000/expense', expense);
        console.log(res.data);
        showUserOnScreen(res.data);
        document.getElementById('expenseid').value = '';
        document.getElementById('desid').value = '';
        document.getElementById('listid').value = '';
    } catch(error){
        document.body.innerHTML=document.body.innerHTML+'<h4>Something Went Wrong</h4>';
        console.log(error);
    }
    
        //form.reset();
}

window.addEventListener('DOMContentLoaded', async () => {
    try{
        const res =await axios.get('http://localhost:2000/expense');
     
        console.log(res.data[0]);

        for(let i=0;i<res.data.length;i++)
        {
            showUserOnScreen(res.data[i]);
            console.log('reached');

     }
    } catch (error){
        document.body.innerHTML=document.body.innerHTML+'<h4>Something Went Wrong</h4>';
        console.log(error);
    }
    
})

function showUserOnScreen(user){
    let parentNode = document.getElementById('dataItems');

    const childNode=`<li id=${user.id}>${user.amount}-${user.description}-${user.category}
                        <button onclick=deleteUser('${user.id}')>Delete</button>
                        <button onclick=editUserDetail('${user.amount}','${user.description}','${user.category}','${user.id}')>Edit</button></li>`;

    parentNode.innerHTML=parentNode.innerHTML+childNode;
    
}

async function deleteUser(userid)
{
  console.log('comes');

    try {
        await axios.delete(`http://localhost:2000/expense/${userid}`);
        console.log('axios');
        removeFromScreen(userid);
        console.log('complete');
    } catch (err) {
        document.body.innerHTML= document.body.innerHTML+"<h4>Something Went Wrong</h4>"
    console.log(err);
    }
       
         
} 
  




function removeFromScreen(id)
 {
     let parent=document.getElementById('dataItems');
    const childNodeDeleted=document.getElementById(id);

    parent.removeChild(childNodeDeleted)
}

async function editUserDetail(userAmount, userDesc, userCategory, userId){
    try{
        await axios.delete(`http://localhost:2000/expense/${userId}`);
        removeFromScreen(userId);

        document.getElementById('expenseid').value = userAmount;
        document.getElementById('desid').value = userDesc;
        document.getElementById('listid').value = userCategory;
    } catch(err) {
        document.body.innerHTML += "<h4>Something went wrong</h4>";
        console.log(err);
    }
}






