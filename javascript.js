//KEY
var key="f2c641-02b088-3b1c5b-e8fa56-7b3983";
document.getElementById("form").addEventListener("submit", createToDo);//function(item){createToDo()}
//GET
var xhttpa = new XMLHttpRequest();
xhttpa.onreadystatechange = function(){
    if((this.readyState==4)&&(this.status==200)){
        var todos = JSON.parse(this.responseText);
    for(var i=0; i<todos.length; i++){
        renderToDo(todos[i]);
    }
}
};
xhttpa.open("GET", "https://cse204.work/todos", true);
xhttpa.setRequestHeader("x-api-key", key);
xhttpa.send();

function renderToDo(item){
    var item_id=item.id;
    var item_text=item.text;
    // add to do item
    var line = document.createElement("li");
    line.innerHTML = item_text;
    //add delete button
    var deleteBtn = document.createElement("button");
    deleteBtn.innerHTML="Delete";
    deleteBtn.style.position="absolute";
    // add to do item check
    var completeCheck = document.createElement("input");
    completeCheck.setAttribute("type", "checkbox");
    completeCheck.style.position="absolute";
    // marking to do item as "complete" changes styling
    if(item.completed == true){
        completeCheck.check=true;
        line.style.textDecoration = "underline";
    }
    else if(item.completed == false){
        completeCheck.check = false;
        line.style.textDecoration = "none";
    }
    // append
    var completeList = document.getElementById("list");//id was task
    line.setAttribute("id",item_id);
    line.setAttribute("text",item_text);
    completeList.appendChild(line);
    line.appendChild(deleteBtn);
    line.appendChild(completeCheck);
    // reload
    completeCheck.addEventListener("click", function(item){complete(item_id)}, false);//complete
    deleteBtn.addEventListener("click", function(item){deleteToDo(item_id)}, false);//deleteToDo
}
//POST
function createToDo(item){
    item.preventDefault();
    var newToDo={
        text: document.getElementById("input").value
    };
    var xhttpb = new XMLHttpRequest();
    xhttpb.onreadystatechange = function(){
        if((this.readyState==4)&&(this.status==200)){
            var todos = JSON.parse(this.responseText);
            console.log(todos);
            renderToDo(todos);
        }
        else if(this.readyState==4){
            console.log(this.responseText);
        }
    };
    xhttpb.open("POST", "https://cse204.work/todos", true);
    xhttpb.setRequestHeader("content-type","application/json");
    xhttpb.setRequestHeader("x-api-key", key);
    xhttpb.send(JSON.stringify(newToDo));
    // clear input box after adding todo item
    document.getElementById("input").value="";
}
//PUT
function complete(current_id){
    var complete_id=current_id;
    var xhttpc = new XMLHttpRequest();
    var item={completed:true}
    xhttpc.onreadystatechange = function(){
        if((this.readyState==4)&&(this.status==200)){
            var todos = JSON.parse(this.responseText);
            var id=document.getElementById(complete_id);
            id.style.textDecoration="underline";
        }
    };
    xhttpc.open("PUT", "https://cse204.work/todos/", true);
    xhttpc.setRequestHeader("content-type","application/json");
    xhttpc.setRequestHeader("x-api-key", key);
    xhttpc.send(JSON.stringify(item));
}
//DELETE
function deleteToDo(current_id){
    var delete_id=current_id;
    var xhttpd = new XMLHttpRequest();
    xhttpd.onreadystatechange = function(){
        if((this.readyState==4)&&(this.status==200)){
            document.getElementById(delete_id).remove();
        }
    };
    xhttpd.open("DELETE", "https://cse204.work/todos/" + delete_id, true);
    xhttpd.setRequestHeader("content-type","application/json");
    xhttpd.setRequestHeader("x-api-key", key);
    xhttpd.send();
}

// if you press return, instead of the "Add" button it also works
function enterKeyPress(event) {
    if (event.keyCode === 13) {
        document.getElementById("submit").click();
    }
}

//EXTRA CREDIT
//toggle
// Clicking an checked item's checkbox unchecks it, and clicking an unchecked item's checkbox checks it. The checked status must be saved to the API.
function toggleItem(item){
    let current = item.target;
    let current_id=item.target.getAttribute("data-id");
    if (current.getAttribute("class") === "checked") {
        complete(current_id,true); 
    }
    else {
        complete(current_id,false);
    }
    // update locally
    if (current.getAttribute("class") === "checked") {
        current.className = "unchecked";
    }
    else {
        current.className = "checked";
    }
}
document.addEventListener("DOMContentLoaded", renderToDo);