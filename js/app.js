

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
btnCrearTarea.classList.add('btn', 'btn-success', 'btnIndex');
btnCrearTarea.textContent = "Crear tarea";

divCreateList.append(txtSuperTitle, inputTask, btnCrearTarea);
container.append(divCreateList);


/**creamos la tabla para mostrar las listas */
const divCardMain = document.createElement("div");
divCardMain.classList.add('card', 'text-white', 'bg-secondary', 'mb-3');

const divCardHeader = document.createElement("div");
divCardHeader.classList.add('card-header');

const inputSubTask = document.createElement("input");
inputSubTask.classList.add('form-control', 'inputIdex');
inputSubTask.setAttribute("placeholder", "Nueva sub tarea");
inputSubTask.textContent = '';

const btnCrearSubTarea = document.createElement("button");
btnCrearSubTarea.classList.add('btn', 'btn-primary', 'btnIndex');
btnCrearSubTarea.textContent = "Crear sub-tarea";

const titleSubtask = document.createElement("h3");

divCardHeader.append(inputSubTask, btnCrearSubTarea,titleSubtask);

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


const loadTask = async () => {
    const resp = await axios.get("http://localhost:8080/subtask"),
    json = await resp.data;

    console.log(json);
    
    json.forEach(element => {
        titleSubtask.textContent = element.tarea.description;
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
}

loadTask();






