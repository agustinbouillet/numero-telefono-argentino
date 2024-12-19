process.env['NODE_DEV'] = 'TEST';
const TelefonoArgentino = require('../src/telefono-argentino.js');


test('Valid', () => {
    expect(new TelefonoArgentino("+54 9 11 5017-6006").isValid()).toBeTruthy();
    expect(new TelefonoArgentino("OLIVIA").isValid()).toBeFalsy();
    expect(new TelefonoArgentino("+54 9 11 1234-5678").isValid()).toBeFalsy();
    expect(new TelefonoArgentino("0388-2227105").isValid()).toBeFalsy();
});


test('Exception', () => {
    const trhowTypeError = param => new TelefonoArgentino();
    expect(trhowTypeError).toThrow(Error);
    expect(trhowTypeError).toThrow("Debe ingresar un número de teléfono.");
});


test('Chars', () => {
    const expected1 = ['E', 'M', 'I', 'L', 'A', '$', '%', '&'];
    expect(new TelefonoArgentino("-EMILIA- $%&()").invalidChars())
            .toEqual(expect.arrayContaining(expected1));

    expect(new TelefonoArgentino("911").invalidChars()).toBeFalsy();
});


test("Output", () => {
    const tel = new TelefonoArgentino("4639-1234");
    expect(tel._spanTag("key", "value"))
        .toBe('<span class="key" data-key="1">value</span>');

    expect(tel._spanTag("key"))
        .toBe('<span class="key" data-key="1"></span>');

    const returnFragment1 = tel._fragment(tel.data, '{{area_code|add_after: "-"}}');
    expect(returnFragment1).toMatchObject([
        {
            element: "-",
            key: "area_code",
            param: "add_after"
        }
    ]);

    const returnFragment2 = tel._fragment(
        tel.data, '{{ country, area_code|add_after: "-" }}');
    expect(returnFragment2).toMatchObject([
        {
            element: false,
            key: "country",
            param: false
        },
        {
            element: "-",
            key: "area_code",
            param: "add_after"
        },
    ]);
});


test("Format", () => {
    const tpl = "Mi número es: ( {{ international|add_after:' ', country | add_after:'-' }}"
            + "{{ area_code}} ) {{number}}.";

    const tel = new TelefonoArgentino("00 5411 46392313", {format: tpl});
    expect(tel.getData().format).toBe("Mi número es: (00 +54-11) 4639-2313.");

    const tel2 = new TelefonoArgentino(
        "00 5411 46392313",
        {
            format: tpl,
            numberFormat: "----##-## # ---# # # ",
            numberFormatSeparator:"."
        }
    );
    expect(tel2.getData().format).toBe("Mi número es: (00 +54-11) 46.392.313.");
});