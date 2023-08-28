process.env['NODE_DEV'] = 'TEST';
const TelefonoArgentino = require('../src/telefonos_argentinos.js');

test('Valid', () => {
    expect(new TelefonoArgentino("+54 9 11 5017-6006").isValid()).toBeTruthy();
    expect(new TelefonoArgentino("OLIVIA").isValid()).toBeFalsy();
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