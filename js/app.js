
let isEdit = 0;
let idSubTaskTmp = 0;
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
};


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

    const btnDeleteTask = document.createElement("button");
    btnDeleteTask.classList.add('btn', 'btn-warning', 'btnIndex', 'deleteTask');
    btnDeleteTask.textContent = "Eliminar Tarea";
    btnDeleteTask.dataset.id = idTask;


    const titleSubtask = document.createElement("h3");
    titleSubtask.textContent = idTask + " - " + task;

    divCardHeader.append(inputSubTask, btnCrearSubTarea, titleSubtask, btnDeleteTask);

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
    const thEditar = document.createElement("th");
    const thEliminar = document.createElement("th");
    const thCompletado = document.createElement("th");

    thIdSubtask.classList.add('col');
    thDescripcionSubtask.classList.add('col');

    trHead.append(thIdSubtask, thDescripcionSubtask, thEditar, thEliminar, thCompletado);
    thead.append(trHead);
    table.appendChild(thead);

    thIdSubtask.textContent = "Id SubTarea";
    thDescripcionSubtask.textContent = "Descripcion";
    thEditar.textContent = "Editar";
    thEliminar.textContent = "Eliminar";
    thCompletado.textContent = "Completado";

    const tbody = document.createElement("tbody");

    json.forEach(element => {

        const trBody = document.createElement("tr");
        trBody.classList.add('table-active');

        const tdBodyId = document.createElement("td");
        const tdBodyDescription = document.createElement("td");
        const tdEditar = document.createElement("td");
        const tdEliminar = document.createElement("td");
        const tdCompletado = document.createElement("td");

        tdBodyId.textContent = element.id;
        tdBodyDescription.textContent = element.description;

        const btnEditar = document.createElement("button");
        const btnEliminar = document.createElement("button");
        const spanTmp = document.createElement("span");
        spanTmp.className = idTask;

        const check = document.createElement("input");
        check.setAttribute("type", "checkbox");
        check.classList.add("complet");
        check.setAttribute("id", "check" + element.id);

        const spanTmpCheck = document.createElement("span");
        spanTmpCheck.className = element.id;

        btnEditar.classList.add('edit');
        btnEliminar.classList.add('delete');

        btnEditar.dataset.idTask = element.id;
        btnEditar.dataset.description = element.description;
        btnEliminar.dataset.idTask = element.id;

        btnEditar.textContent = "Editar";
        btnEliminar.textContent = "Eliminar";

        tdEditar.append(spanTmp);
        tdEditar.appendChild(btnEditar);
        tdEliminar.appendChild(btnEliminar);
        tdCompletado.append(spanTmpCheck,check);

        trBody.append(tdBodyId, tdBodyDescription, tdEditar, tdEliminar, tdCompletado);
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
        if (isEdit !== 0) {
            try {
                let options = {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json; charset=utf-8"
                    },
                    data: JSON.stringify({
                        id: idSubTaskTmp,
                        description: e.target.previousElementSibling.value,
                        task: {
                            id: isEdit,
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
        } else {
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
    }
    if (e.target.matches(".edit")) {

        const idTaskTmp = e.target.previousElementSibling.className;
        console.log(idTaskTmp);
        const inputTmp = document.querySelector("#inputSubtask" + idTaskTmp);
        inputTmp.value = e.target.dataset.description;
        console.log(e.target.dataset.idTask);
        idSubTaskTmp = e.target.dataset.idTask;
        isEdit = idTaskTmp;
    }
    if (e.target.matches(".delete")) {
        const confirmAnswer = confirm("Desea eliminar esta subtarea");
        if (confirmAnswer) {
            const idSubTareaDel = e.target.dataset.idTask;
            console.log(idSubTareaDel);
            try {
                let options = {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json; charset=utf-8"
                    }
                },
                    res = await axios("http://localhost:8080/subtask/deletesubtask?idsubtask=" + idSubTareaDel, options),
                    json = await res.data;
                location.reload();
            } catch (error) {
                let message = error.statusText || "Ocurrio un error";
                alert(message);
            }
        }
    }
    if (e.target.matches(".deleteTask")) {


        const confirmAnswer = confirm("Desea eliminar esta tarea");
        if (confirmAnswer) {
            const idTareaDel = e.target.dataset.id;
            console.log(idTareaDel);

            try {
                let options = {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json; charset=utf-8",
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    }
                },
                    res = await axios("http://localhost:8080/task/deletetask?idtask=" + idTareaDel, options),
                    json = await res.data;
                location.reload();
            } catch (error) {
                let message = error.statusText || "Ocurrio un error";
                alert(message);
            }
        }

    }
    if (e.target.matches(".complet")) {
        const idSubTaskTmp = e.target.previousElementSibling.className;
        console.log(idSubTaskTmp);
        const checkt = document.querySelector("#check" + idSubTaskTmp);
        checkt.setAttribute('checked',true);
        
    }
})


btnCrearTarea.addEventListener('click', async (e) => {
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
});







