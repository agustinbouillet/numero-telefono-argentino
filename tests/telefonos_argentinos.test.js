const TelefonoArgentino = require('../src/telefonos_argentinos.js');

test('Valid', () => {
    expect(new TelefonoArgentino("+54 9 11 5017-6006").isValid()).toBeTruthy();
    expect(new TelefonoArgentino("OLIVIA").isValid()).toBeFalsy();
    // expect(new TelefonoArgentino()).toThrow(new Error("Debe ingresar un número de teléfono."));
});

test('Chars', () => {
    const expected1 = ['E', 'M', 'I', 'L', 'A', '$', '%', '&'];
    expect(new TelefonoArgentino("-EMILIA- $%&()").invalidChars())
            .toEqual(expect.arrayContaining(expected1));

    expect(new TelefonoArgentino("911").invalidChars()).toBeFalsy();
});