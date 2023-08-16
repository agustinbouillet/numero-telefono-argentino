/**
 * 
 * @param {*} data 
 */
const renderTable = (data, selector, heading=false) => {
    const table = document.createElement("table");
    table.classList.add("table", "_table-striped", "mb-0", "text-secondary", "small");
    table.id = "id_table";

    Object.entries(data).forEach(entry => {
        const tr = table.insertRow();
        const cell1 = tr.insertCell();
        const cell2 = tr.insertCell();

        cell1.textContent = entry[0];
        cell1.className = "fw-bold";
        cell2.textContent = entry[1];
    });



    const tableContainer = document.createElement("div");
    tableContainer.classList.add("border", "rounded", "p-2");
    tableContainer.appendChild(table);

    const container = document.querySelector(selector);
    container.innerHTML = "";

    if(heading){
        const title = document.createElement("h2");
        title.classList.add("text-primary", "h5");
        title.textContent = heading;
        container.appendChild(title);
    }

    container.appendChild(tableContainer);
};


/**
 * Render de resultados
 * @param {string} number Número de teléfono
 */
const render = number => {
    ["#id_table_container", "#id_table_region_container"]
            .forEach(e => document.querySelector(e).innerHTML = "");

    const tel = new TelefonoArgentino(number);
    renderTable(tel.data, "#id_table_container", "Información");

    if(tel.data.area_code){
        const values = response.values.find(f => f[0] == tel.data.area_code);
        const keys = response.values[0];
        const obj = keys.reduce((accumulator, key, index) => {
            return {...accumulator, [key]: values[index]};
        }, {});

        renderTable(obj, "#id_table_region_container", "Región");
    }
};


// Listeners
document.addEventListener("DOMContentLoaded", function() {
    // Validador
    phoneNumber = document.querySelector("#id_phone_number");
    validate = document.querySelector("#id_validate");
    validate.addEventListener("click", event => {
        event.preventDefault();
        render(phoneNumber.value);
    });

    // Ejemplos
    const example = document.querySelectorAll(".js-validate");
    example.forEach(element => {
        element.addEventListener("click", event => {
            event.preventDefault();
            phoneNumber.value = element.textContent;
            render(element.textContent);
        });
    })
});