

let isEdit = 0;
let idSubTaskTmp = 0;
const container = document.querySelector("#container");
const txtSuperTitle = document.createElement("h1");


txtSuperTitle.textContent = "Lista tareas!!";
container.append(txtSuperTitle);

const divCreateList = document.createElement("div");
const divCreateListMain = document.createElement("div");
divCreateListMain.classList.add("row", "divTarea");

const divCreateListBody = document.createElement("div");
divCreateListBody.classList.add("col-6");

const divCreateListBodyBotton = document.createElement("div");
divCreateListBodyBotton.classList.add("col-6");

const inputTask = document.createElement("input");
inputTask.classList.add('form-control', 'inputIdex');
inputTask.setAttribute("placeholder", "Nueva lista");
inputTask.textContent = '';

const btnCrearTarea = document.createElement("button");
btnCrearTarea.classList.add('btn', 'btn-success', 'btnIndex', 'createTarea');
btnCrearTarea.textContent = "Crear tarea";

divCreateListBody.append(inputTask);
divCreateListBodyBotton.append(btnCrearTarea);

divCreateListMain.append(divCreateListBody, divCreateListBodyBotton);

divCreateList.append(txtSuperTitle, divCreateListMain);
container.append(divCreateList);


/**creamos la tabla para mostrar las listas */
const loadTask = async () => {

    const respTask = await axios.get("http://localhost:8080/task"),
        jsonTask = await respTask.data;
    //console.log("prueba",jsonTask);
    const listOrdenada = jsonTask.sort((x,y) => x.id - y.id);
    console.log("orden ",listOrdenada);

    jsonTask.sort((x,y) => x.id - y.id).forEach(task => {
        console.log(task);

        getSubTaskID(task.id, task.description);

    });
};

const getSubTaskID = async (idTask, task) => {
    const respSubTas = await axios.get("http://localhost:8080/subtask/buscarsubtask?idtask=" + idTask),
        json = await respSubTas.data;

    console.log("sub",json);

    const divCardMain = document.createElement("div");
    divCardMain.classList.add('card', 'text-white', 'bg-secondary', 'mb-3');

    const divCardHeader = document.createElement("div");
    divCardHeader.classList.add('card-header');

    const divCreateSubMain = document.createElement("div");
    divCreateSubMain.classList.add("row");

    const divCreateSubBody = document.createElement("div");
    divCreateSubBody.classList.add("col-6");

    const divCreateSubBotton = document.createElement("div");
    divCreateSubBotton.classList.add("col-6");

    const inputSubTask = document.createElement("input");
    inputSubTask.classList.add('form-control', 'inputIdex', 'input' + idTask);
    inputSubTask.setAttribute("placeholder", "Nueva sub tarea");
    inputSubTask.setAttribute("id", "inputSubtask" + idTask);
    inputSubTask.textContent = '';

    const spanTask = document.createElement("span");
    spanTask.className = idTask;

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

    divCreateSubBody.append(inputSubTask, spanTask);
    divCreateSubBotton.append(btnCrearSubTarea);
    divCreateSubMain.append(divCreateSubBody, divCreateSubBotton);

    divCardHeader.append(divCreateSubMain, titleSubtask, btnDeleteTask);


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
        const btnCompletar = document.createElement("button");


        const btnEditarImg = document.createElement("input");
        btnEditarImg.setAttribute("type", "image")
        btnEditarImg.setAttribute("src", "imges/edit1.png");
        btnEditarImg.classList.add('edit');
        btnEditarImg.dataset.idTask = element.id;
        btnEditarImg.dataset.description = element.description;

        const btnDeleteImg = document.createElement("input");
        btnDeleteImg.setAttribute("type", "image")
        btnDeleteImg.setAttribute("src", "imges/clean.png");
        btnDeleteImg.classList.add('delete');
        btnDeleteImg.dataset.idTask = element.id;


        const spanTmp = document.createElement("span");
        spanTmp.className = idTask;

        const spanTmpCheck = document.createElement("span");
        spanTmpCheck.className = element.id;

        btnEditar.classList.add('edit');
        btnEliminar.classList.add('delete');
        btnCompletar.classList.add('complet');


        btnEditar.dataset.idTask = element.id;
        btnEditar.dataset.description = element.description;
        btnEliminar.dataset.idTask = element.id;

        btnCompletar.dataset.idTask = idTask;
        btnCompletar.dataset.complet = element.complet;

        btnEditar.textContent = "Editar";
        btnEliminar.textContent = "Eliminar";
       
        if (element.complet) {
            btnCompletar.classList.add('btn', 'btn-success');
            btnCompletar.textContent = "Completado";
        } else {
            btnCompletar.textContent = "Completar";
            btnCompletar.classList.add('btn', 'btn-secondary');
        }

        tdEditar.append(spanTmp);
        tdEditar.append(btnEditarImg);
        tdEliminar.appendChild(btnDeleteImg);
        tdCompletado.append(btnCompletar);

        trBody.append(tdBodyId, tdBodyDescription, tdEditar, tdEliminar, tdCompletado);
        tbody.append(trBody);
    });

    table.appendChild(tbody);

    divCardMain.appendChild(table)
    container.appendChild(divCardMain);
};


loadTask();

document.addEventListener("click", async e => {

    if (e.target.matches(".createSubTask")) {
        e.preventDefault();
        /**
         * Obtenemos los valores para hacer la acción,
         * con el mismo boton sabemos si esta editando o 
         * creando un elemento nuevo
         */
        const idTask = e.target.dataset.id;
        const inputTmp = document.querySelector("#inputSubtask" + idTask);
        const txtImput = inputTmp.value;
        if (txtImput === "") {
            alert("Por favor complete el nombre de la tarea");
        } else {
            if (isEdit !== 0) {
                try {
                    let options = {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json; charset=utf-8"
                        },
                        data: JSON.stringify({
                            id: idSubTaskTmp,
                            description: txtImput,
                            complet: false,
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
                            description: txtImput,
                            complet: false,
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

    }
    /**
     * Cargamos los valores en el input.
     */
    if (e.target.matches(".edit")) {

        const idTaskTmp = e.target.previousElementSibling.className;
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
        const confirmAnswer = confirm("Desea eliminar esta tarea, se eliminaran todas las subtareas");
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
        const idSubtask = e.target.parentElement.parentElement.children[0].textContent;
        const complet = (e.target.dataset.complet) === "true" ? false : true;
        console.log(idSubtask, complet);
        try {
            let options = {
                method: "GET",
                headers: {
                    "Content-type": "application/json; charset=utf-8"
                }
            },
                res = await axios(`http://localhost:8080/subtask/subtaskcomplet?idsubtask=${idSubtask}&complet=${complet}`, options),
                json = await res.data;
            location.reload();
        } catch (error) {
            let message = error.statusText || "Ocurrio un error";
            alert(message);
        }
    }
})

btnCrearTarea.addEventListener('click', async (e) => {
    if (inputTask.value === "") {
        alert("Por favor diligencie el campo tarea");
    } else {
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
    }
});







