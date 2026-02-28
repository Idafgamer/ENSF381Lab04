var userGrid = document.getElementById("userGrid");
var toggleButton = document.getElementById("viewToggleBtn");
var deleteIdIn = document.getElementById("deleteIdInput");
var deleteBtn = document.getElementById("deleteBtn");
var sortGroupBtn = document.getElementById("sortByGroupBtn");
var sortIdBtn = document.getElementById("sortByIdBtn");

let users;

retrieveData();

async function retrieveData(){
    try{
        const java = await fetch("https://69a1e4d32e82ee536fa281d9.mockapi.io/user_api");
        users = await java.json();
        console.log(users);
        render(users);
    } catch(error){
        console.log("There was an error in the system:" + error);
    }
    
}

function render(arr){
    let temp = "";
    arr.forEach(user => {
        temp +=  `<article class="user-card">
            <h3>${user.first_name ?? ""}</h3>
            <p>first_name: ${user.first_name ?? ""}</p>
            <p>user_group: ${user.user_group ?? ""}</p>
            <p>id: ${user.id ?? ""}</p>
            </article>
            `;
    }); 
    userGrid.innerHTML = temp;
}

toggleButton.addEventListener("click", function(){
    // console.log("Toggle Clicked");
    if(userGrid.classList.contains('grid-view')){
        userGrid.classList.remove("grid-view");
        userGrid.classList.add("list-view");
    } else if (userGrid.classList.contains('list-view')){
        userGrid.classList.remove("list-view");
        userGrid.classList.add("grid-view");
    }
})

sortGroupBtn.addEventListener("click", function(){
    // console.log("Sort by group btn clicked");
    users = users.sort((a,b) => a.user_group - b.user_group);
    render(users);
})

sortIdBtn.addEventListener("click", function(){
    // console.log("Sort by ID btn clicked");
    users = users.sort((a,b) => a.id - b.id);
    render(users);
})

deleteBtn.addEventListener("click", function(){
    let id = deleteIdIn.value.trim();

    if(!id){
        console.log("Invalid ID.");
        return;
    }

    const temp = `https://69a1e4d32e82ee536fa281d9.mockapi.io/user_api/${id}`;
    remove(temp, id);
})


async function remove(link, id){
    try{
        let index = users.findIndex(user => user.id == id);
        
        if (index == -1){
            console.log("No matching user exists.")
        }

        let response = await fetch(link, {method: "DELETE"});
        
        if(!response.ok){
           console.log("API deletion failed");
        }
        
        
        users.splice(index, 1);
        render(users);

        
    }catch (error){
        console.log("An error occured in deletion:", error);
    }
    
}