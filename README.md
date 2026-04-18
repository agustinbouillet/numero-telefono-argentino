
[![GitHub version](https://badge.fury.io/gh/agustinbouillet%2Ftelefono-argentino.svg?icon=si%3Agithub)](https://badge.fury.io/gh/agustinbouillet%2Ftelefono-argentino) [![npm version](https://badge.fury.io/js/telefono-argentino.svg)](https://badge.fury.io/js/telefono-argentino) [![](https://data.jsdelivr.com/v1/package/npm/telefono-argentino/badge?style=rounded)](https://www.jsdelivr.com/package/npm/telefono-argentino) [![Colaborá con el script: telefono-argentino.js, haciéndo una donación por PayPal](https://raw.githubusercontent.com/k4m4/donations/refs/heads/master/images/badge.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=C5TSLQQEEE5PQ)


# Validador de números de teléfono argentinos

Este _script_ valida números de teléfono argentinos utilizando el listado oficial de [numeración geográfica publicada por ENACOM](https://www.enacom.gob.ar/asignaciones-a-la-fecha_p445) (Ente Nacional de Comunicaciones).

La validación, para números no específicos, se basa en comparar el código de área y el bloque numérico asignado a cada una de las operadoras. Si estas condiciones se cumplen, se considera que los números subsiguientes podrían pertenecer a un abonado.

Actualmente, no existe un servicio que permita verificar si un número completo (código de área, bloque y número asignado), pertenece efectivamente a un abonado en servicio. Por lo tanto, este _script_ asume esa posibilidad, quedando su interpretación y uso a criterio del usuario.


**Versión numeración geográfica (ENACOM)**: 13 de marzo de 2025.

## Versión actual
2.0.4

### Obtener versión

```javascript
(new TelefonoArgentino).version;
// '2.0.4'
```

o

```javascript
const tel = new TelefonoArgentino("+5491150176006");
tel.version;
// '2.0.4'
```

## Instalación

### NPM

```bash
npm i telefono-argentino
```

### Yarn

```bash
yarn add telefono-argentino
```

### CDN

#### jsDelivr

[https://www.jsdelivr.com/package/npm/telefono-argentino](https://www.jsdelivr.com/package/npm/telefono-argentino)


## Uso

```js
var tel = new TelefonoArgentino('5491150176006');
```

### Métodos

#### getData()

Retorna un objeto con los datos pertenecientes al número telefónico. Si el número de teléfono es incorrecto, retorna `false`.

```javascript
tel.getData();
```

##### Ejemplo datos de retorno

```javascript
{
    area_code : "11",
    country :"54",
    filter_input :"5491150176006",
    format :"+54 9 11 5017-6006",
    htmlify :"<span class="country">+54</span> <span class="mobile">9</span> <span class="area_code">11</span> <span class="number">5071-6006</span>"
    input :"5491150176006",
    international : false,
    mobile :"9",
    mobile_prefix : false,
    national_call : false,
    number :"50176006",
    special : false,
    specific : false,
    type :"mobile",
    block_number: "5017",
    given_number: "6006"
}
```

#### input()

Retorna el _string_ ingresado para validar.

```javascript
tel.input();
```

#### isValid()

Retorna un valor booleano: `true` | `false`.

```javascript
tel.isValid();
```

#### getType()
Retorna el tipo de teléfono.
Los tipos pueden ser:

- `landline` Teléfono fijo.
- `mobile` Teléfono móvil.
- `special` Comprendido por los números como: 911, 112, 113, 114, etc.
- `specific` Comprendido por los números como: 0800, 0810, etc.

```js
tel.getType();
```

#### invalidChars()

Retorna un array con la lista de caracteres inválidos. Si no existen caracteres inválidos, retorna `false`.

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

#### htmlify()

Retorna el número de teléfono con cada una de sus partes encapsuladas en una etiqueta `<span/>`.

##### Ejemplo

```javascript
new TelefonoArgentino("+54 9 11 4639-1234").htmlify();
```

Retorna:

```html
<span class="country" data-country="1">+54</span> <span class="mobile" data-mobile="1">9</span> <span class="area-code" data-area_code="1">11</span> <span class="number" data-number="1">4639-1234</span>
```

## Opciones

### Formatos de salida

#### Formato

Para darle formato al número de teléfono puede configurarse un _template_ y pasarlo al parámetro opciones usando la clave: `format`.

El formato por defecto contempla todos los formatos y tipos de teléfono que valida el _script_.

```javascript
{
    format: '{{specific}}{{special}}{{international|add_after:" "}}{{country|add_after:" "}}{{mobile|add_after:" "}}{{national_call}}{{area_code|add_after:" "}}{{mobile_prefix|add_after:" "}} {{number}}'
}
```

El formato solo acepta las claves de retorno del _script_ (por ejemplo: `area_code`, `country`, etc.). Para reemplazar la clave por su valor, se debe encerrar la clave entre _doble llave_: {{ `clave` }}.

Las claves pueden ir separadas o concatenadas mediante una coma: `{{ area_code,number }}`.

Para agregar un elemento antes o después del valor, se puede incorporar un parámetro con `add_before` o `add_after` del siguiente modo:

```js
'{{ area_code|add_after:"-" }}'

// 11-
```

```javascript
'{{ area_code|add_after:"+",number|add_before:"=" }}'

// 11+=4639-2313
```

También se pueden utilizar las claves por separado; sin usar la concatenación.

```js
'{{ area_code|add_after:"+" }}{{ number|add_before:"=" }}'

// 11+=4639-2313
```

Es importante tener en cuenta que si la clave no tiene valor, es decir, si es `false`, no se imprime nada, incluido el separador.

##### Ejemplos

Caso con número, código de área y código país.

```javascript
const tel = new TelefonoArgentino(
    "54.3624448012",
    {
        format: '({{ country|add_after:"-" }}{{ area_code }}){{ number|add_before:" " }}'
    }
);
tel.getData().format;

// '(+54-362) 444-8012'
```

Sin código de país.

```javascript
const tel = new TelefonoArgentino(
    "11 4639-1234",
    {
        format: '({{ country|add_after:"-" }}{{ area_code }}){{ number|add_before:" " }}'
    }
);
tel.getData().format;

// '(11) 4639-1234'
```

Sin código de país y código de área. Como el paréntesis queda vacío, se remueve. Los espacios y elementos agregados antes y después no se imprimen.

```javascript
const tel = new TelefonoArgentino(
    "4639-1234",
    {
        format: '({{ country|add_after:"-" }}{{ area_code }}){{ number|add_before:" " }}'
    }
);
tel.getData().format;

// '4639-1234'
```

---

#### Formato de número

El número puede segmentarse en la cantidad de partes que se desee utilizando la combinación del carácter _numeral_ y _guión_. El formato se debe pensar de derecha a izquierda. Por ejemplo, para que un número de ocho dígitos se divida en _miles_, el formato sería:
`##-###-###`. El número `12345678` quedaría de este modo: `12-345-678`.

**Algunos casos**

```javascript
const tel = new TelefonoArgentino("+54.3624448012", {numberFormat: "##-###-###"});
tel.getData().format;

// '+54 362 4-448-012'
```

```javascript
const tel = new TelefonoArgentino("+54.3624448012", {numberFormat: "##-##-##-##"});
tel.getData().format;

// '+54 362 4-44-80-12'
```

Se puede incorporar el parámetro `numberFormatSeparator` para cambiar el separador de dígitos.

```javascript
const tel = new TelefonoArgentino(
    "54.3624448012",
    {
        numberFormat: "##-###-###", 
        numberFormatSeparator: "."
    }
);
tel.getData().format;

// '+54 362 4.448.012'
```

---

## Información geográfica

La información referenciada de las regiones se puede obtener de un _Google spreadsheet_ en:


```
https://sheets.googleapis.com/v4/spreadsheets/14H7VE3zfllDDTC73L0bL7nyjkdodPMXvqs1CH__xgFY/values/db?key={{your-google-api-key}}&alt=json
```

O usar el archivo response.json ubicado dentro del directorio _data_, dentro del repositorio.

## Ejemplo de conexión con google sheet

```javascript
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
```


## Demo

- [CodePen](https://codepen.io/agustinbouillet/pen/ozNVaP)


## Referencias

- [ENACOM](https://www.enacom.gob.ar) — Ente Nacional de Comunicaciones.
- [Numeración y señalización](https://www.enacom.gob.ar/numeracion_p136) — ENACOM.
- [Números telefónicos en Argentina](https://es.wikipedia.org/wiki/Números_telefónicos_en_Argentina) — Wikipedia.


---

[![Invitame un café en cafecito.app](https://cdn.cafecito.app/imgs/buttons/button_2.svg)](https://cafecito.app/agustinbouillet)

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=C5TSLQQEEE5PQ)
