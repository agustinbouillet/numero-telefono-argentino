# Validador de números de teléfono argentinos
===================

## Uso

```
var tel = new TelefonoArgentino('5491150716006');
```
### Métodos

#### getData()

Retorna un array asociativo con los tipos de datos pertenecienes al número telefónico. Si el número de teléfono es incorrecto retorna: `false`

```javascript
tel.getData();
```
##### Ejemplo datos de retorno
```javascript
{
    area_code : "11",
    country :"54",
    filter_input :"5491150716006",
    format :"+54 9 11 5071-6006",
    htmlify :"<span class="country">+54</span> <span class="mobile">9</span> <span class="area_code">11</span> <span class="number">5071-6006</span>"
    input :"5491150716006",
    international : false,
    mobile :"9",
    mobile_prefix : false,
    national_call : false,
    number :"50716006",
    special : false,
    specific : false,
    type :"mobile",
}
```
#### getGeoPolitic()
Retorna el nombre de la provincia y ciudad a partir del código de área.
```javascript
var tel = new TelefonoArgentino('+54 3743 123456');
tel.getGeoPolitic();

// Retorna
{
    area_code: 3743, 
    province: "Misiones", 
    city: "Puerto Rico"
}
```

#### input()

Retorna el string ingresado para validar.

```javascript
tel.input();
```

#### isValid()

Tipo booleano `true` | `false`.

```javascript
tel.isValid();
```

#### getType()
Retorna el tipo de teléfono.
Los tipos puenden ser:
- `landline` Teléfono fijo.
- `mobile` Teléfono móvil.
- `special` Comprendido por los números como: 911, 112, 113, 114, etc.
- `specific` Comprendido por los números como: 0800, 0810, etc.

```
tel.getType();
```

#### invalidChars()

Retorna un array con la lista de caracteres inválidos. Si no existieran caracteres inválidos el retorno es: `false`

```javascript
tel.invalidChars();
```
##### Ejemplo
```javascript
var tel = new TelefonoArgentino('54911501;><76006^%$^%$^');
tel.invalidChars();
// Resultado
[";", ">", "<", "^", "%", "$"]
```

## Ejemplos válidos
- +54 9 11 4639-1234
- 00 5411 46392313
- 011 4639-1234
- 11 4639-1234
- 15 4639-1234
- 1550176006
- 4639.1234
- 4639-1234
- 911
- 0810 666 4444
- 000
- (54) 11 5789-1489
- (02966) 441200

## Demo
- https://codepen.io/agustinbouillet/pen/ozNVaP
- [CODEPEN](http://codepen.io)


## Referencias
- [ENACOM](http://www.enacom.gob.ar), Ente Nacional de Comunicaciones
- https://www.enacom.gob.ar/numeracion_p136, ENACOM, Numeración y señalización.
- https://es.wikipedia.org/wiki/Números_telefónicos_en_Argentina, Wikipedia, Números telefónicos en Argentina, 2016
