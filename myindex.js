let global=[];
taskContents=document.getElementById("taskContents");
const addCard=()=>{
    const addDetails ={
        id:`${Date.now()}`,
        url:document.getElementById("imageURL").value,
        title:document.getElementById("taskTitle").value,
        type:document.getElementById("taskType").value,
        descp:document.getElementById("taskDescription").value,
    };
    taskContents.insertAdjacentHTML('beforeend',generateCard(addDetails));
    global.push(addDetails);
    saveToLocal();
}

const generateCard= ({id,url,title,type,descp}) =>{
    return (`<div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
                <div class="card">
                    <div class="card-header">
                        <div class="card-header d-flex justify-content-end">
                            <button type="button" class="btn btn-outline-info" onclick="updateCard(${id})" data-bs-toggle="modal" data-bs-target="#edit">
                                <i class="fas fa-pencil-alt"></i>
                            </button>
                            <button type="button" class="btn btn-outline-danger" onclick="deleteDetail(${id})">
                                    <i class="far fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                    <img class="card-img-top" src="${url}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${descp}</p>
                        <span class="badge bg-primary">${type}</span>
                    </div>
                    <div class="card-footer">
                        <button type="button" class="btn btn-outline-primary float-end">
                            Open Task
                        </button>
                    </div>
                </div>
            </div>`)
        }
    
const saveToLocal=()=>
{
    localStorage.setItem("task",JSON.stringify({tasky:global}));
}
const reloadCard=()=>{
    const temp=JSON.parse(localStorage.getItem("task"));
    if(temp)
    {
        global=temp["tasky"]
    }
    global.map((cardDetail)=>{
        taskContents.insertAdjacentHTML('beforeend',generateCard(cardDetail));
    });
}

const deleteDetail =(e) =>{
    global.forEach((item)=>{
        const index = global.indexOf(item);
            if(item.id==e)
            {
                console.log(item);
                global.splice(index,1);
            }
    })
    saveToLocal();
    window.location.reload();
}


const updateCard =(e)=>
{
    global.forEach((item)=>{
        const index = global.indexOf(item);
            if(item.id==e)
            {
                url=item.url;
                title=item.title;
                type=item.type;
                descp=item.descp;
            }
    })
    u=document.getElementById("url");
    u.value=url;
    t=document.getElementById("title");
    t.value=title;
    ty=document.getElementById("type");
    ty.value=type;
    d=document.getElementById("desc");
    d.value=descp;
    i=document.getElementById("i_D");
    i.value=e;
}

const reedit=()=>{
    taskId=document.getElementById("i_D").value;
    global.forEach((item)=>{
        if(item.id==taskId)
        {
            u=document.getElementById("url").value; 
            item.url=u;
            t=document.getElementById("title").value;
            item.title=t;
            ty=document.getElementById("type").value;
            item.type=ty;
            d=document.getElementById("desc").value;
            item.descp=d;
        }
    })
    saveToLocal();
    window.location.reload();

}

