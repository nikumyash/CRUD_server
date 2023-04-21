const deleteButton = document.querySelectorAll('.del');
const likeButton = document.querySelectorAll('.like');

async function handler(e){
    const n = e.parentNode.childNodes[1].innerText;
    const studentn = e.parentNode.childNodes[3].innerText;
    try{
        const response = await fetch('deleteproject',{
            method : 'delete',
            headers: {'Content-type':'application/json'},
            body:JSON.stringify({
                name:n,
                studentname:studentn
            })
        })
        if(response.status==404)throw 'Failed';
        location.reload();
    }
    catch(e){
        console.error(e);
    }
}

async function likehandler(e){
    const n = e.parentNode.childNodes[1].innerText;
    try{
        const response = await fetch('likeproject',{
            method : 'put',
            headers: {'Content-type':'application/json'},
            body:JSON.stringify({
                name:n
            })
        })
        location.reload();
    }
    catch(e){
        console.error(e);
    }
}

deleteButton.forEach((elem)=>{elem.addEventListener('click',(e)=>{
    handler(e.target);
})});

likeButton.forEach((elem)=>{elem.addEventListener('click',(e)=>{
    likehandler(e.target);
})});