/**
 * 
 * @param {*} data 
 */
const renderTable = data => {
    const table = document.createElement("table");
    table.classList.add("table", "table-striped");
    table.id = "id_table";

    Object.entries(data).forEach(entry => {
        const tr = table.insertRow();
        const cell1 = tr.insertCell();
        const cell2 = tr.insertCell();

        cell1.textContent = entry[0];
        cell2.textContent = entry[1];
    });

    const tableContainer = document.querySelector("#id_table_container");
    tableContainer.innerHTML = "";
    tableContainer.appendChild(table);
};


/**
 * 
 * @param {*} data 
 */
const regionByAreaCode = (data) => {
    const table = document.querySelector("#id_table tbody");

    Object.entries(data).forEach(entry => {
        const tr = document.createElement("tr");
        const cell1 = tr.insertCell();
        const cell2 = tr.insertCell();

        cell1.textContent = entry[0];
        cell2.textContent = entry[1];
        table.appendChild(tr);
    });
};


/**
 * Render de resultados
 * @param {string} number Número de teléfono
 */
const render = number => {
    const tel = new TelefonoArgentino(number);
    renderTable(tel.data);
    if(tel.data.area_code){
        const region = regionByCode(response, tel.data.area_code);
        regionByAreaCode(region);
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