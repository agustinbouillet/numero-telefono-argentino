# Validador de números de teléfono argentinos

## Uso

```
var tel = new TelefonoArgentino('5491150716006');
```
### Métodos
#### isValid()

Tipo booleano `true` | `false`.

```
tel.isValid()
```

#### invalidChars()

Retorna un array con la lista de caracteres inválidos. Si no existieran caracteres inválidos el retorno es: `false`

```
tel.invalidChars()
```

#### data()

Retorna array asociativo con los tipos de datos pertenecienes al número telefónico. Si el número de teléfono es incorrecto retorna: `false`

```
tel.data()
```
##### Ejemplo datos de retorno
```
{
    area_code : "11",
    country :"54",
    filter_input :"5491150716006",
    format :" 54 9 11  5071-6006 ",
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

#### input()

Retorna el string ingresado para validar.

```
tel.input()
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
- [Wikipedia](https://es.wikipedia.org/wiki/Números_telefónicos_en_Argentina), Números telefónicos en Argentina
