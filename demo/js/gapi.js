// JSON Google Drive
const gapiId = "14H7VE3zfllDDTC73L0bL7nyjkdodPMXvqs1CH__xgFY";
const gapiSheetName = "db";
const gapiCredential = "AIzaSyCq2wEEKL9-6RmX-TkW23qJsrmnFHFf5tY";
// const gapiCredential = "[DEBE OBTENER UNA KEY]";
const uri = new URL(
    `/v4/spreadsheets/${gapiId}/values/${gapiSheetName}`,
    "https://sheets.googleapis.com"
);
uri.searchParams.set("key", gapiCredential);
uri.searchParams.set("alt", "json");

/**
 * Fetch data by area code
 */
async function regionByAreaCode(options = {}) {
    let data = [];
    const uri = "https://sheets.googleapis.com/v4/spreadsheets/14H7VE3zfllDDTC73L0bL7nyjkdodPMXvqs1CH__xgFY/values/db?key={{your-google-api-key}}&alt=json";
    let response = await fetch(uri, options);
    data = await response.json();
    return data;
}


// Validate
const tel = new TelefonoArgentino("+54 9 11 5017-6006");
console.log(tel.getData());

regionByAreaCode().then((data) => {
    const values = data.values.find((f) => f[0] == tel.getData().area_code);
    console.log(values);
});