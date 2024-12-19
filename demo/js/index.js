/**
 * 
 * @param {object} data Datos a mostrar
 * @param {string} selector Selector donde se desea la tabla
 * @param {string} heading Título para la tabla
 */
const renderTable = (data, selector, heading=false, th=true) => {
    const table = document.createElement("table");
    table.classList.add("table", "table-striped", "mb-0", "text-secondary", "small");
    table.id = "id_table";

    Object.entries(data).forEach(entry => {
        const tr = table.insertRow();
        if(th){
            const cell1 = tr.insertCell();
            cell1.style.width = "20%";
            cell1.textContent = entry[0];
            cell1.className = "fw-bold";
        }
        const cell2 = tr.insertCell();
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
    const selectors = [
        "#id_invalid_chars",
        "#id_table_container",
        "#id_table_region_container"
    ];
    selectors.forEach(e => document.querySelector(e).innerHTML = "");
    const isValid = document.querySelector('.is-valid');
    isValid.innerHTML = "";
    const tel = new TelefonoArgentino(number);

    if(tel.isValid()){
        isValid.innerHTML = `<p class="py-2 alert alert-success" role="alert">Número válido</p>`;
    } else {
        isValid.innerHTML = `<p class="py-2 alert alert-danger" role="alert">Número inválido</p>`;
    }

    
    if(tel.invalidChars()){
        renderTable(
            tel.invalidChars(), 
            "#id_invalid_chars",
            "Caracteres inválidos",
            false
        );
        return;
    }
    
    // Número válido
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
    const phoneNumber = document.querySelector("#id_phone_number");

    const form = document.querySelector("#validator");
    form.addEventListener("submit", event => {
        event.preventDefault();
        const formData = new FormData(form);
        render(formData.get("phone_number"));
    });

    // Ejemplos
    const example = document.querySelectorAll(".js-validate");
    example.forEach(element => {
        element.addEventListener("click", event => {
            event.preventDefault();
            const regex = /(^\s*)(.*?)(\s*)$/gm;
            const phone = element.textContent.replace(regex, `$2`);
            
            phoneNumber.value = phone;
            render(phone);
        });
    })
});
