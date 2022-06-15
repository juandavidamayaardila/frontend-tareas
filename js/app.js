

const container = document.querySelector("#container");
const txtSuperTitle = document.createElement("h1");

txtSuperTitle.textContent = "Lista tareas!!";
container.append(txtSuperTitle);

const divCreateList = document.createElement("div");

const inputTask = document.createElement("input");
inputTask.classList.add('form-control', 'inputIdex');
inputTask.setAttribute("placeholder", "Nueva lista");
inputTask.textContent = '';

const btnCrearTarea = document.createElement("button");
btnCrearTarea.classList.add('btn', 'btn-success', 'btnIndex', 'createTarea');
btnCrearTarea.textContent = "Crear tarea";

divCreateList.append(txtSuperTitle, inputTask, btnCrearTarea);
container.append(divCreateList);


/**creamos la tabla para mostrar las listas */


const loadTask = async () => {

    const respTask = await axios.get("http://localhost:8080/task"),
        jsonTask = await respTask.data;

    jsonTask.forEach(task => {
        console.log(task);

        getSubTaskID(task.id, task.description);

    });
}


const getSubTaskID = async (idTask, task) => {
    const respSubTas = await axios.get("http://localhost:8080/subtask/buscarsubtask?idtask=" + idTask),
        json = await respSubTas.data;

    console.log(json);

    const divCardMain = document.createElement("div");
    divCardMain.classList.add('card', 'text-white', 'bg-secondary', 'mb-3');

    const divCardHeader = document.createElement("div");
    divCardHeader.classList.add('card-header');

    const inputSubTask = document.createElement("input");
    inputSubTask.classList.add('form-control', 'inputIdex', 'input' + idTask);
    inputSubTask.setAttribute("placeholder", "Nueva sub tarea");
    inputSubTask.setAttribute("id", "inputSubtask" + idTask);
    inputSubTask.textContent = '';


    const btnCrearSubTarea = document.createElement("button");
    btnCrearSubTarea.classList.add('btn', 'btn-primary', 'btnIndex', 'createSubTask');
    btnCrearSubTarea.textContent = "Crear sub-tarea";
    btnCrearSubTarea.dataset.id = idTask;
    btnCrearSubTarea.dataset.task = task;

    const titleSubtask = document.createElement("h3");
    titleSubtask.textContent = idTask + " " + task;

    divCardHeader.append(inputSubTask, btnCrearSubTarea, titleSubtask);

    const divCardBody = document.createElement("div");
    divCardBody.classList.add('card-body');

    divCardHeader.appendChild(divCardBody);
    divCardMain.appendChild(divCardHeader);

    const table = document.createElement("table");
    table.classList.add('table', 'table-hover');

    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");
    const thIdSubtask = document.createElement("th");
    const thDescripcionSubtask = document.createElement("th");

    thIdSubtask.classList.add('col');
    thDescripcionSubtask.classList.add('col');

    trHead.append(thIdSubtask, thDescripcionSubtask);
    thead.append(trHead);
    table.appendChild(thead);

    thIdSubtask.textContent = "Id SubTarea";
    thDescripcionSubtask.textContent = "Descripcion";

    const tbody = document.createElement("tbody");

    json.forEach(element => {

        const trBody = document.createElement("tr");
        trBody.classList.add('table-active');


        const tdBodyId = document.createElement("td");
        const tdBodyDescription = document.createElement("td");

        tdBodyId.textContent = element.id;
        tdBodyDescription.textContent = element.description;

        trBody.append(tdBodyId, tdBodyDescription);
        tbody.append(trBody);
    });

    table.appendChild(tbody);

    divCardMain.appendChild(table)
    container.appendChild(divCardMain);
};


loadTask();

document.addEventListener("click", async e => {
    e.preventDefault();

    if (e.target.matches(".createSubTask")) {

        try {
            let options = {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=utf-8"
                },
                data: JSON.stringify({
                    description: e.target.previousElementSibling.value,
                    task: {
                        id: e.target.dataset.id,
                        description: e.target.dataset.task
                    }
                })
            },
            res = await axios("http://localhost:8080/subtask", options),
                json = await res.data;
            location.reload();
        } catch (error) {
            let message = error.statusText || "Ocurrio un error";
            alert(message);
        }
    }
    
})


btnCrearTarea.addEventListener('click', async(e) =>{
    
    alert(inputTask.value);
    try {
        let options = {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=utf-8"
            },
            data: JSON.stringify({
                description: inputTask.value
            })
        },
        res = await axios("http://localhost:8080/task", options),
            json = await res.data;
        location.reload();
    } catch (error) {
        let message = error.statusText || "Ocurrio un error";
        alert(message);
    }
})





