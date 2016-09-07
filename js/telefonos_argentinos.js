/*
title: Argentinian phonenumber validator \ 
    Validador de números telefónicos argentinos.
autor: Agustín Bouillet
year: 2016
email: agustin.bouillet@gmail.com
website: www.bouillet.com.ar
*/

/**
 * Valida un numero de telefono
 * @param  {string}  str
 * @return {Boolean | object}
 */
function TelefonoArgentino(str) {
    this.input = str;
    this.getData = telefono;
    this.getType = getTelephoneType;
    this.isValid = isValid;
    this.filterInt = filterInt(str);
    this.invalidChars = invalidChars;
    this.getGeoPolitc = getGeoPolitc;

}


//https://regex101.com/r/yB9jT6/1
function telefono() {
    var regex = /^(?:(?:(00)?(?:(\+?54)|(0)?)?(?:(9)?(((3894|3892|3891|3888|3887|3886|3885|3878|3877|3876|3873|3869|3868|3867|3865|3863|3862|3861|3858|3857|3856|3855|3854|3846|3845|3844|3843|3841|3838|3837|3835|3832|3827|3826|3825|3821|3786|3782|3781|3777|3775|3774|3773|3772|3758|3757|3756|3755|3754|3751|3743|3741|3735|3734|3731|3725|3721|3718|3716|3715|3711|3585|3584|3583|3582|3576|3575|3574|3573|3572|3571|3564|3563|3562|3549|3548|3547|3546|3544|3543|3542|3541|3537|3533|3532|3525|3524|3522|3521|3498|3497|3496|3493|3492|3491|3489|3487|3483|3482|3476|3472|3471|3469|3468|3467|3466|3465|3464|3463|3462|3460|3458|3456|3455|3454|3447|3446|3445|3444|3442|3438|3437|3436|3435|3409|3408|3407|3406|3405|3404|3402|3401|3400|3388|3387|3385|3382|3329|3327|2983|2982|2972|2966|2964|2963|2962|2954|2953|2952|2948|2946|2945|2942|2940|2936|2935|2934|2933|2932|2931|2929|2928|2927|2926|2925|2924|2923|2922|2921|2920|2903|2902|2901|2658|2657|2656|2655|2652|2651|2648|2647|2646|2626|2625|2624|2622|2478|2477|2475|2474|2473|2396|2395|2394|2393|2392|2358|2357|2356|2355|2354|2353|2352|2346|2345|2344|2343|2342|2338|2337|2336|2335|2334|2333|2331|2326|2325|2324|2323|2320|2317|2316|2314|2302|2297|2296|2292|2291|2286|2285|2284|2283|2281|2274|2273|2272|2271|2268|2267|2266|2265|2264|2262|2261|2257|2255|2254|2252|2246|2245|2244|2243|2242|2241|2229|2227|2226|2225|2224|2223|2221|2202)(15)?([\d]{6})|(388|387|385|383|381|380|379|376|370|364|362|358|353|351|348|345|343|342|341|336|299|298|297|294|291|280|266|264|263|261|260|249|237|236|230|223|221|220)(15)?([\d]{7})|(11)(15)?([\d]{8})|(15)([\d]{6})|(15)([\d]{7})|(15)([\d]{8}))|(0800|0810)([\d]{7}))?)|(000|19|911)))$/;

    /**
     * Limpia caracteres de uso común en la sintaxis empleada 
     * para representar números de teléfono.
     * @param {string} str
     */
    function cleanup(str) {
        var re = /([\-\.\(\)\[\]\s\+]+)/g;
        var subst = '';
        var result = str.replace(re, subst);
        return result;
    }

    var filtered_str = cleanup(this.input);
    var result = filtered_str.match(regex);

    if (result !== null) {
        var data = setData(result);

        // Valida el numero y retorna el tipo
        var phone_type = getType(data);

        // si no valida el numero retorna false.
        if (!phone_type) {
            return false;
        }

        // Incorporo datos
        data['input'] = this.input;
        data['type'] = phone_type;
        data['format'] = numberFormat(data);

        return data;
    }

    return false;
}

/**
 * Retorna el numero filtrando todos los caracteres o espacios del string
 * @return {boolean}
 */
function filterInt(str) {
    re = /([^\d])/g;
    subst = '';

    result = str.replace(re, subst);
    return result;
}

/**
 * Verifica si el string pasado tiene caracteres validos.
 * @return {array | false} Array con todos los caracteres inválidos, o false
 * si no tiene caracters inapropiados.
 */
function invalidChars() {
    var re = /([^\d\-\(\)\[\]\s\+\.])/g;
    var m;
    var chars = new Array();

    while ((m = re.exec(this.input)) !== null) {
        if (m.index === re.lastIndex) {
            re.lastIndex++;
        }

        if (chars.indexOf(m[0]) < 0) {
            chars.push(m[0]);
        }
    }

    return chars.length > 0 ? chars : false;
}



/**
 * Prepara los datos de entrada
 * @param {array} result Resultado de la expresion regular
 */
/*
international -> 1
country -> 2
mobile -> 4
area_code dos digitos -> 13
area_code tes digitos -> 10
area_code cuatro digitos -> 7
national_call -> 3
mobile_prefix: 
8 -> n9, 
14 -> n15,
11 -> n12, 
20 -> n21,
15 -> n17, 
18 -> n19,

special -> 24
specific -> 22 n23
*/
function setData(result) {

    // Obtengo numero
    number_list = [9, 15, 12, 21, 17, 19, 23];
    for (i = 0; i <= number_list.length - 1; i++) {
        if (result[parseInt(number_list[i])] !== undefined) {
            var number = result[parseInt(number_list[i])];
            break;
        } else {
            var number = false;
        }
    }

    // Obtengo el prefijo mobile
    mobile_prefix_list = [8, 11, 14, 18, 20];
    for (i = 0; i <= mobile_prefix_list.length - 1; i++) {
        if (result[parseInt(mobile_prefix_list[i])] !== undefined) {
            var mobile_prefix = result[parseInt(mobile_prefix_list[i])];
            break;
        } else {
            var mobile_prefix = false;
        }
    }

    // Obtengo el area code
    area_code_list = [13, 10, 7];
    for (i = 0; i <= area_code_list.length - 1; i++) {
        if (result[parseInt(area_code_list[i])] !== undefined) {
            var area_code = result[parseInt(area_code_list[i])];
            break;
        } else {
            var area_code = false;
        }
    }


    var data = {
        'filter_input': (result[0] !== undefined) ? result[0] : false,
        'international': (result[1] !== undefined) ? result[1] : false,
        'country': (result[2] !== undefined) ? result[2] : false,
        'national_call': (result[3] !== undefined) ? result[3] : false,
        'mobile': (result[4] !== undefined) ? result[4] : false,
        'special': (result[24] !== undefined) ? result[24] : false,
        'specific': (result[22] !== undefined) ? result[22] : false,
        'mobile_prefix': mobile_prefix,
        'area_code': area_code,
        'number': number
    }

    return data;
}

/**
 * Telefono váliodo o inválido
 * @return {Boolean}
 */
function isValid() {
    return this.getData() ? true : false;
}

/**
 * Retorna el tipo de telefono
 * @return {string | false}
 */
function getTelephoneType() {
    return this.getData().type;
}

/**
 * Retorna el tipo de telefono
 * @param  {object} data
 * @return {string} Tipo de teléfono
 */
function getType(data) {
    // case 1

    // Si los dos prefijos de telefono existen retorna false.
    if (data.mobile_prefix && data.mobile) {
        return false;
    }

    if (data.special) {

        type = 'special';

    } else if (data.specific && data.number.length === 7) {

        type = 'specific';

        // El numero tiene codigo de area
    } else if (data.area_code &&
        ((data.area_code.length + data.number.length) === 10)) {

        type = data.mobile_prefix || data.mobile ? 'mobile' : 'landline';

        // El numero no tiene codigo de area y debe tener un rango 
        // de numeros de 6 a 8.
    } else if (!data.area_code &&
        (data.number.length >= 6 && data.number.length <= 8)) {

        type = data.mobile_prefix || data.mobile ? 'mobile' : 'landline';

    } else {

        type = false;

    }

    return type;
}

/**
 * hace un string trim e impide que haya mas de un espacio entre palabras.
 * @param  {string} str
 * @return {string}
 */
function cleanupNumberFormat(str) {
    var re = /(^\s*|\s(?=\s+)|\s*$)/g;
    var subst = ' ';
    var result = str.replace(re, subst);
    return result;
}

/**
 * Retorna el numero de telefon con un formato standard
 * @param  {object} data
 * @return {string}
 */
function numberFormat(data) {
    if (!data.number) {
        return data.filter_input;
    }

    // Defino el formato del numero
    number = data.number.slice(0, data.number.length - 4) +
        '-' + data.number.slice(-4);

    d = [];
    for (key in data) {
        d[key] = data[key] ? data[key] : '';
    }

    // Defino los valores que voy a concatenar
    space = ' ';

    formated_number = d['international'] + space + d['country'] + space +
        d['mobile'] + space + d['national_call'] + d['area_code'] +
        d['mobile_prefix'] + space + d['specific'] + space + d['number'];


    return cleanupNumberFormat(formated_number);
}
/**
 * Obtiene la provincia y la ciudad a la que pertenece el codigo de area
 * @return {object | false}
 */
function getGeoPolitc(){
    if(!this.getData().area_code){
        return false;
    }

    var json_data = [{"area_code":11,"province":"Ciudad de Buenos Aires","city":"Buenos Aires"},{"area_code":220,"province":"Buenos Aires","city":"Merlo"},{"area_code":221,"province":"Buenos Aires","city":"La Plata"},{"area_code":223,"province":"Buenos Aires","city":"Mar del Plata"},{"area_code":230,"province":"Buenos Aires","city":"Pilar"},{"area_code":236,"province":"Buenos Aires","city":"Jun\u00edn"},{"area_code":237,"province":"Buenos Aires","city":"Moreno"},{"area_code":249,"province":"Buenos Aires","city":"Tandil"},{"area_code":260,"province":"Mendoza","city":"San Rafael"},{"area_code":261,"province":"Mendoza","city":"Mendoza"},{"area_code":263,"province":"Mendoza","city":"San Mart\u00edn"},{"area_code":264,"province":"San Juan","city":"San Juan"},{"area_code":266,"province":"San Luis","city":"San Luis"},{"area_code":280,"province":"Chubut","city":"Trelew"},{"area_code":291,"province":"Buenos Aires","city":"Bah\u00eda Blanca"},{"area_code":294,"province":"R\u00edo Negro Neuqu\u00e9n\/Chubut","city":"San Carlos de Bariloche"},{"area_code":297,"province":"Chubut\/Santa Cruz","city":"Comodoro Rivadavia"},{"area_code":298,"province":"R\u00edo Negro","city":"General Roca"},{"area_code":299,"province":"Neuqu\u00e9n\/R\u00edo Negro\/La Pampa","city":"Neuqu\u00e9n"},{"area_code":336,"province":"Buenos Aires","city":"San Nicol\u00e1s de los Arroyos"},{"area_code":341,"province":"Santa Fe","city":"Rosario"},{"area_code":342,"province":"Santa Fe","city":"Santa Fe"},{"area_code":343,"province":"Entre R\u00edos","city":"Paran\u00e1"},{"area_code":345,"province":"Entre R\u00edos","city":"Concordia"},{"area_code":348,"province":"Buenos Aires","city":"Bel\u00e9n de Escobar"},{"area_code":351,"province":"C\u00f3rdoba","city":"C\u00f3rdoba"},{"area_code":353,"province":"C\u00f3rdoba","city":"Villa Mar\u00eda"},{"area_code":358,"province":"C\u00f3rdoba","city":"R\u00edo Cuarto"},{"area_code":362,"province":"Chaco","city":"Resistencia"},{"area_code":364,"province":"Chaco","city":"Presidencia Roque S\u00e1enz Pe\u00f1a"},{"area_code":370,"province":"Formosa","city":"Formosa"},{"area_code":376,"province":"Misiones","city":"Posadas"},{"area_code":379,"province":"Corrientes","city":"Corrientes"},{"area_code":380,"province":"La Rioja","city":"La Rioja"},{"area_code":381,"province":"Tucum\u00e1n","city":"San Miguel de Tucum\u00e1n"},{"area_code":383,"province":"Catamarca","city":"San Fernando del Valle de Catamarca"},{"area_code":385,"province":"Santiago del Estero","city":"Santiago del Estero"},{"area_code":387,"province":"Salta","city":"Salta"},{"area_code":388,"province":"Jujuy","city":"San Salvador de Jujuy"},{"area_code":2202,"province":"Buenos Aires","city":"Gonz\u00e1lez Cat\u00e1n"},{"area_code":2221,"province":"Buenos Aires","city":"Magdalena"},{"area_code":2223,"province":"Buenos Aires","city":"Brandsen"},{"area_code":2224,"province":"Buenos Aires","city":"Glew"},{"area_code":2225,"province":"Buenos Aires","city":"Alejandro Korn"},{"area_code":2226,"province":"Buenos Aires","city":"Ca\u00f1uelas"},{"area_code":2227,"province":"Buenos Aires","city":"Lobos"},{"area_code":2229,"province":"Buenos Aires","city":"Juan Mar\u00eda Guti\u00e9rrez"},{"area_code":2241,"province":"Buenos Aires","city":"Chascom\u00fas"},{"area_code":2242,"province":"Buenos Aires","city":"Lezama"},{"area_code":2243,"province":"Buenos Aires","city":"General Belgrano"},{"area_code":2244,"province":"Buenos Aires","city":"Las Flores"},{"area_code":2245,"province":"Buenos Aires","city":"Dolores"},{"area_code":2246,"province":"Buenos Aires","city":"Santa Teresita"},{"area_code":2252,"province":"Buenos Aires","city":"San Clemente del Tuy\u00fa"},{"area_code":2254,"province":"Buenos Aires","city":"Pinamar"},{"area_code":2255,"province":"Buenos Aires","city":"Villa Gesell"},{"area_code":2257,"province":"Buenos Aires","city":"Mar de Aj\u00f3"},{"area_code":2261,"province":"Buenos Aires","city":"Lober\u00eda"},{"area_code":2262,"province":"Buenos Aires","city":"Necochea"},{"area_code":2264,"province":"Buenos Aires","city":"Nicanor Olivera (Est. La Dulce)"},{"area_code":2265,"province":"Buenos Aires","city":"Coronel Vidal"},{"area_code":2266,"province":"Buenos Aires","city":"Balcarce"},{"area_code":2267,"province":"Buenos Aires","city":"General Juan Madariaga"},{"area_code":2268,"province":"Buenos Aires","city":"Maip\u00fa"},{"area_code":2271,"province":"Buenos Aires","city":"San Miguel del Monte"},{"area_code":2272,"province":"Buenos Aires","city":"Navarro"},{"area_code":2273,"province":"Buenos Aires","city":"Carmen de Areco"},{"area_code":2274,"province":"Buenos Aires","city":"Carlos Spegazzini"},{"area_code":2281,"province":"Buenos Aires","city":"Azul"},{"area_code":2283,"province":"Buenos Aires","city":"Tapalqu\u00e9"},{"area_code":2284,"province":"Buenos Aires","city":"Olavarr\u00eda"},{"area_code":2285,"province":"Buenos Aires","city":"Laprida"},{"area_code":2286,"province":"Buenos Aires","city":"General La Madrid"},{"area_code":2291,"province":"Buenos Aires","city":"Miramar"},{"area_code":2292,"province":"Buenos Aires","city":"Benito Ju\u00e1rez"},{"area_code":2296,"province":"Buenos Aires","city":"Ayacucho"},{"area_code":2297,"province":"Buenos Aires","city":"Rauch"},{"area_code":2302,"province":"La Pampa\/Buenos Aires","city":"General Pico"},{"area_code":2314,"province":"Buenos Aires","city":"San Carlos de Bol\u00edvar"},{"area_code":2316,"province":"Buenos Aires","city":"Daireaux"},{"area_code":2317,"province":"Buenos Aires","city":"Nueve de Julio"},{"area_code":2320,"province":"Buenos Aires","city":"Jos\u00e9 C. Paz"},{"area_code":2323,"province":"Buenos Aires","city":"Luj\u00e1n"},{"area_code":2324,"province":"Buenos Aires","city":"Mercedes"},{"area_code":2325,"province":"Buenos Aires","city":"San Andr\u00e9s de Giles"},{"area_code":2326,"province":"Buenos Aires","city":"San Antonio de Areco"},{"area_code":2331,"province":"La Pampa","city":"Realic\u00f3"},{"area_code":2333,"province":"La Pampa","city":"Quem\u00fa Quem\u00fa"},{"area_code":2334,"province":"La Pampa","city":"Eduardo Castex"},{"area_code":2335,"province":"La Pampa","city":"Caleuf\u00fa"},{"area_code":2336,"province":"C\u00f3rdoba","city":"Huinca Renanc\u00f3"},{"area_code":2337,"province":"Buenos Aires","city":"Am\u00e9rica"},{"area_code":2338,"province":"La Pampa","city":"Victorica"},{"area_code":2342,"province":"Buenos Aires","city":"Bragado"},{"area_code":2343,"province":"Buenos Aires","city":"Norberto de La Riestra"},{"area_code":2344,"province":"Buenos Aires","city":"Saladillo"},{"area_code":2345,"province":"Buenos Aires","city":"25 de Mayo"},{"area_code":2346,"province":"Buenos Aires","city":"Chivilcoy"},{"area_code":2352,"province":"Buenos Aires","city":"Chacabuco"},{"area_code":2353,"province":"Buenos Aires\/Santa Fe","city":"General Arenales"},{"area_code":2354,"province":"Buenos Aires","city":"Vedia"},{"area_code":2355,"province":"Buenos Aires","city":"Lincoln"},{"area_code":2356,"province":"Buenos Aires","city":"General Pinto"},{"area_code":2357,"province":"Buenos Aires","city":"Carlos Tejedor"},{"area_code":2358,"province":"Buenos Aires","city":"Los Toldos"},{"area_code":2392,"province":"Buenos Aires","city":"Trenque Lauquen"},{"area_code":2393,"province":"Buenos Aires","city":"Salazar"},{"area_code":2394,"province":"Buenos Aires","city":"Tres Lomas"},{"area_code":2395,"province":"Buenos Aires","city":"Carlos Casares"},{"area_code":2396,"province":"Buenos Aires","city":"Pehuaj\u00f3"},{"area_code":2473,"province":"Buenos Aires\/Santa Fe","city":"Col\u00f3n"},{"area_code":2474,"province":"Buenos Aires","city":"Salto"},{"area_code":2475,"province":"Buenos Aires","city":"Rojas"},{"area_code":2477,"province":"Buenos Aires\/Santa Fe","city":"Pergamino"},{"area_code":2478,"province":"Buenos Aires","city":"Arrecifes"},{"area_code":2622,"province":"Mendoza","city":"Tunuy\u00e1n"},{"area_code":2624,"province":"Mendoza","city":"Uspallata"},{"area_code":2625,"province":"Mendoza","city":"General Alvear"},{"area_code":2626,"province":"Mendoza","city":"La Paz"},{"area_code":2646,"province":"San Juan","city":"Villa San Agust\u00edn"},{"area_code":2647,"province":"San Juan","city":"San Jos\u00e9 de J\u00e1chal"},{"area_code":2648,"province":"San Juan","city":"Calingasta"},{"area_code":2651,"province":"San Luis","city":"San Francisco del Monte de Oro"},{"area_code":2652,"province":"San Luis","city":"---"},{"area_code":2655,"province":"San Luis","city":"La Toma"},{"area_code":2656,"province":"San Luis","city":"Tilisarao"},{"area_code":2657,"province":"San Luis","city":"Villa Mercedes"},{"area_code":2658,"province":"San Luis","city":"Buena Esperanza"},{"area_code":2901,"province":"Tierra del Fuego","city":"Ushuaia"},{"area_code":2902,"province":"Santa Cruz","city":"R\u00edo Turbio"},{"area_code":2903,"province":"Chubut","city":"R\u00edo Mayo"},{"area_code":2920,"province":"R\u00edo Negro\/Buenos Aires","city":"Viedma"},{"area_code":2921,"province":"Buenos Aires","city":"Coronel Dorrego"},{"area_code":2922,"province":"Buenos Aires","city":"Coronel Pringles"},{"area_code":2923,"province":"Buenos Aires","city":"Pig\u00fc\u00e9"},{"area_code":2924,"province":"Buenos Aires\n        La Pampa","city":"Darregueira"},{"area_code":2925,"province":"Buenos Aires\/La Pampa","city":"Villa Iris"},{"area_code":2926,"province":"Buenos Aires","city":"Coronel Su\u00e1rez"},{"area_code":2927,"province":"Buenos Aires","city":"M\u00e9danos"},{"area_code":2928,"province":"Buenos Aires","city":"Pedro Luro"},{"area_code":2929,"province":"Buenos Aires","city":"Guamin\u00ed"},{"area_code":2931,"province":"R\u00edo Negro\/La Pampa","city":"R\u00edo Colorado"},{"area_code":2932,"province":"Buenos Aires","city":"Punta Alta"},{"area_code":2933,"province":"Buenos Aires","city":"Huanguel\u00e9n"},{"area_code":2934,"province":"R\u00edo Negro","city":"San Antonio Oeste"},{"area_code":2935,"province":"Buenos Aires","city":"Rivera"},{"area_code":2936,"province":"Buenos Aires","city":"Carhu\u00e9"},{"area_code":2940,"province":"R\u00edo Negro","city":"Ingeniero Jacobacci"},{"area_code":2942,"province":"Neuqu\u00e9n\/R\u00edo Negro","city":"Zapala"},{"area_code":2945,"province":"Chubut","city":"Esquel"},{"area_code":2946,"province":"R\u00edo Negro","city":"Choele Choel"},{"area_code":2948,"province":"Neuqu\u00e9n","city":"Chos Malal"},{"area_code":2952,"province":"La Pampa","city":"General Acha"},{"area_code":2953,"province":"La Pampa","city":"Macach\u00edn"},{"area_code":2954,"province":"La Pampa","city":"Santa Rosa"},{"area_code":2962,"province":"Santa Cruz","city":"Puerto San Juli\u00e1n"},{"area_code":2963,"province":"Santa Cruz","city":"Perito Moreno"},{"area_code":2964,"province":"Tierra del Fuego","city":"R\u00edo Grande"},{"area_code":2966,"province":"Santa Cruz","city":"R\u00edo Gallegos"},{"area_code":2972,"province":"Neuqu\u00e9n","city":"San Mart\u00edn de los Andes"},{"area_code":2982,"province":"Buenos Aires","city":"Orense"},{"area_code":2983,"province":"Buenos Aires","city":"Tres Arroyos"},{"area_code":3327,"province":"Buenos Aires","city":"Benav\u00eddez"},{"area_code":3329,"province":"Buenos Aires","city":"San Pedro"},{"area_code":3382,"province":"Santa Fe\/Buenos Aires\/C\u00f3rdoba","city":"Rufino"},{"area_code":3385,"province":"C\u00f3rdoba","city":"Laboulaye"},{"area_code":3387,"province":"C\u00f3rdoba","city":"Buchardo"},{"area_code":3388,"province":"Buenos Aires","city":"General Villegas"},{"area_code":3400,"province":"Santa Fe","city":"Villa Constituci\u00f3n"},{"area_code":3401,"province":"Santa Fe","city":"El Tr\u00e9bol"},{"area_code":3402,"province":"Santa Fe","city":"Arroyo Seco"},{"area_code":3404,"province":"Santa Fe","city":"San Carlos Centro"},{"area_code":3405,"province":"Santa Fe","city":"San Javier"},{"area_code":3406,"province":"Santa Fe","city":"San Jorge"},{"area_code":3407,"province":"Buenos Aires","city":"Ramallo"},{"area_code":3408,"province":"Santa Fe","city":"San Crist\u00f3bal"},{"area_code":3409,"province":"Santa Fe","city":"Mois\u00e9s Ville"},{"area_code":3435,"province":"Entre R\u00edos","city":"Nogoy\u00e1"},{"area_code":3436,"province":"Entre R\u00edos","city":"Victoria"},{"area_code":3437,"province":"Entre R\u00edos","city":"La Paz"},{"area_code":3438,"province":"Entre R\u00edos","city":"Bovril"},{"area_code":3442,"province":"Entre R\u00edos","city":"Concepci\u00f3n del Uruguay"},{"area_code":3444,"province":"Entre R\u00edos","city":"Gualeguay"},{"area_code":3445,"province":"Entre R\u00edos","city":"Rosario del Tala"},{"area_code":3446,"province":"Entre R\u00edos","city":"Gualeguaych\u00fa"},{"area_code":3447,"province":"Entre R\u00edos","city":"Col\u00f3n"},{"area_code":3454,"province":"Entre R\u00edos","city":"Federal"},{"area_code":3455,"province":"Entre R\u00edos","city":"Villaguay"},{"area_code":3456,"province":"Entre R\u00edos","city":"Chajar\u00ed"},{"area_code":3458,"province":"Entre R\u00edos","city":"San Jos\u00e9 de Feliciano"},{"area_code":3460,"province":"Santa Fe","city":"Santa Teresa"},{"area_code":3462,"province":"Santa Fe","city":"Venado Tuerto"},{"area_code":3463,"province":"C\u00f3rdoba","city":"Canals"},{"area_code":3464,"province":"Santa Fe","city":"Casilda"},{"area_code":3465,"province":"Santa Fe","city":"Firmat"},{"area_code":3466,"province":"Santa Fe","city":"Barrancas"},{"area_code":3467,"province":"C\u00f3rdoba\/Santa Fe","city":"Cruz Alta"},{"area_code":3468,"province":"C\u00f3rdoba\/Santa Fe","city":"Corral de Bustos"},{"area_code":3469,"province":"Santa Fe","city":"Acebal"},{"area_code":3471,"province":"Santa Fe","city":"Ca\u00f1ada de G\u00f3mez"},{"area_code":3472,"province":"C\u00f3rdoba","city":"Marcos Ju\u00e1rez"},{"area_code":3476,"province":"Santa Fe","city":"San Lorenzo"},{"area_code":3482,"province":"Santa Fe","city":"Reconquista"},{"area_code":3483,"province":"Santa Fe","city":"Vera"},{"area_code":3487,"province":"Buenos Aires","city":"Z\u00e1rate"},{"area_code":3489,"province":"Buenos Aires","city":"Campana"},{"area_code":3491,"province":"Santa Fe\/Santiago del Estero","city":"Ceres"},{"area_code":3492,"province":"Santa Fe","city":"Rafaela"},{"area_code":3493,"province":"Santa Fe","city":"Sunchales"},{"area_code":3496,"province":"Santa Fe","city":"Esperanza"},{"area_code":3497,"province":"Santa Fe","city":"Llambi Campbell"},{"area_code":3498,"province":"Santa Fe","city":"San Justo"},{"area_code":3521,"province":"C\u00f3rdoba","city":"De\u00e1n Funes"},{"area_code":3522,"province":"C\u00f3rdoba","city":"Villa de Mar\u00eda"},{"area_code":3524,"province":"C\u00f3rdoba","city":"Villa del Totoral"},{"area_code":3525,"province":"C\u00f3rdoba","city":"Jes\u00fas Mar\u00eda"},{"area_code":3532,"province":"C\u00f3rdoba","city":"Oliva"},{"area_code":3533,"province":"C\u00f3rdoba","city":"Las Varillas"},{"area_code":3537,"province":"C\u00f3rdoba","city":"Bell Ville"},{"area_code":3541,"province":"C\u00f3rdoba","city":"Villa Carlos Paz"},{"area_code":3542,"province":"C\u00f3rdoba","city":"Salsacate"},{"area_code":3543,"province":"C\u00f3rdoba","city":"C\u00f3rdoba (Arg\u00fcello)"},{"area_code":3544,"province":"C\u00f3rdoba","city":"Villa Dolores"},{"area_code":3546,"province":"C\u00f3rdoba","city":"Santa Rosa de Calamuchita"},{"area_code":3547,"province":"C\u00f3rdoba","city":"Alta Gracia"},{"area_code":3548,"province":"C\u00f3rdoba","city":"La Falda"},{"area_code":3549,"province":"C\u00f3rdoba","city":"Cruz del Eje"},{"area_code":3562,"province":"C\u00f3rdoba\/Santa Fe","city":"Morteros"},{"area_code":3563,"province":"C\u00f3rdoba","city":"Balnearia"},{"area_code":3564,"province":"C\u00f3rdoba\/Santa Fe","city":"San Francisco"},{"area_code":3571,"province":"C\u00f3rdoba","city":"R\u00edo Tercero"},{"area_code":3572,"province":"C\u00f3rdoba","city":"R\u00edo Segundo"},{"area_code":3573,"province":"C\u00f3rdoba","city":"Villa del Rosario"},{"area_code":3574,"province":"C\u00f3rdoba","city":"R\u00edo Primero"},{"area_code":3575,"province":"C\u00f3rdoba","city":"La Puerta"},{"area_code":3576,"province":"C\u00f3rdoba","city":"Arroyito"},{"area_code":3582,"province":"C\u00f3rdoba\/San Luis","city":"Sampacho"},{"area_code":3583,"province":"C\u00f3rdoba","city":"Vicu\u00f1a Mackenna"},{"area_code":3584,"province":"C\u00f3rdoba","city":"La Carlota"},{"area_code":3585,"province":"C\u00f3rdoba","city":"Adelia Mar\u00eda"},{"area_code":3711,"province":"Formosa","city":"Ingeniero Ju\u00e1rez"},{"area_code":3715,"province":"Formosa\/Chaco","city":"Las Lomitas"},{"area_code":3716,"province":"Formosa","city":"Comandante Fontana"},{"area_code":3718,"province":"Formosa","city":"Clorinda"},{"area_code":3721,"province":"Chaco","city":"Charadai"},{"area_code":3725,"province":"Chaco","city":"General Jos\u00e9 de San Mart\u00edn"},{"area_code":3731,"province":"Chaco","city":"Charata"},{"area_code":3734,"province":"Chaco","city":"Presidencia de la Plaza"},{"area_code":3735,"province":"Chaco","city":"Villa \u00c1ngela"},{"area_code":3741,"province":"Misiones","city":"Bernardo de Irigoyen"},{"area_code":3743,"province":"Misiones","city":"Puerto Rico"},{"area_code":3751,"province":"Misiones","city":"Eldorado"},{"area_code":3754,"province":"Misiones","city":"Leandro N. Alem"},{"area_code":3755,"province":"Misiones","city":"Ober\u00e1"},{"area_code":3756,"province":"Corrientes","city":"Santo Tom\u00e9"},{"area_code":3757,"province":"Misiones","city":"Puerto Iguaz\u00fa"},{"area_code":3758,"province":"Misiones\/Corrientes","city":"Ap\u00f3stoles"},{"area_code":3772,"province":"Corrientes","city":"Paso de los Libres"},{"area_code":3773,"province":"Corrientes","city":"Mercedes"},{"area_code":3774,"province":"Corrientes","city":"Curuz\u00fa Cuati\u00e1"},{"area_code":3775,"province":"Corrientes","city":"Monte Caseros"},{"area_code":3777,"province":"Corrientes","city":"Goya"},{"area_code":3781,"province":"Corrientes","city":"Ca\u00e1 Cat\u00ed"},{"area_code":3782,"province":"Corrientes","city":"Saladas"},{"area_code":3786,"province":"Corrientes","city":"Ituzaing\u00f3"},{"area_code":3821,"province":"La Rioja","city":"Chepes"},{"area_code":3825,"province":"La Rioja","city":"Chilecito"},{"area_code":3826,"province":"La Rioja","city":"Chamical"},{"area_code":3827,"province":"La Rioja","city":"Aimogasta"},{"area_code":3832,"province":"Catamarca\/Santiago del Estero","city":"Recreo"},{"area_code":3835,"province":"Catamarca","city":"Andalgal\u00e1"},{"area_code":3837,"province":"Catamarca","city":"Tinogasta"},{"area_code":3838,"province":"Catamarca","city":"Santa Mar\u00eda"},{"area_code":3841,"province":"Santiago del Estero","city":"Monte Quemado"},{"area_code":3843,"province":"Santiago del Estero","city":"Quimil\u00ed"},{"area_code":3844,"province":"Santiago del Estero","city":"A\u00f1atuya"},{"area_code":3845,"province":"Santiago del Estero","city":"Loreto"},{"area_code":3846,"province":"Santiago del Estero","city":"Tintina"},{"area_code":3854,"province":"Santiago del Estero","city":"Fr\u00edas"},{"area_code":3855,"province":"Santiago del Estero","city":"Suncho Corral"},{"area_code":3856,"province":"Santiago del Estero","city":"Villa Ojo de Agua"},{"area_code":3857,"province":"Santiago del Estero","city":"Bandera"},{"area_code":3858,"province":"Santiago del Estero","city":"Termas de R\u00edo Hondo"},{"area_code":3861,"province":"Santiago del Estero","city":"Nueva Esperanza"},{"area_code":3862,"province":"Tucum\u00e1n","city":"Trancas"},{"area_code":3863,"province":"Tucum\u00e1n","city":"Monteros"},{"area_code":3865,"province":"Tucum\u00e1n","city":"Concepci\u00f3n"},{"area_code":3867,"province":"Tucum\u00e1n","city":"Taf\u00ed del Valle"},{"area_code":3868,"province":"Salta","city":"Cafayate"},{"area_code":3869,"province":"Tucum\u00e1n","city":"Ranchillos y San Miguel"},{"area_code":3873,"province":"Salta","city":"Tartagal"},{"area_code":3876,"province":"Salta","city":"San Jos\u00e9 de Met\u00e1n"},{"area_code":3877,"province":"Salta\/Chaco","city":"Joaqu\u00edn V\u00edctor Gonz\u00e1lez"},{"area_code":3878,"province":"Salta","city":"Or\u00e1n"},{"area_code":3885,"province":"Jujuy\/Salta","city":"La Quiaca"},{"area_code":3886,"province":"Jujuy","city":"Libertador General San Mart\u00edn"},{"area_code":3887,"province":"Jujuy","city":"Humahuaca"},{"area_code":3888,"province":"Jujuy","city":"San Pedro de Jujuy"},{"area_code":3891,"province":"Tucum\u00e1n","city":"Graneros"},{"area_code":3892,"province":"Tucum\u00e1n","city":"Amaicha del Valle"},{"area_code":3894,"province":"Tucum\u00e1n","city":"Burruyac\u00fa"}];
    
    for (k in json_data) {
        values = json_data[k];
        if (values['area_code'] === parseInt(this.getData().area_code)) {
            val = {
                'province': values['province'],
                'city': values['city']
            };
            break;
        }
    }

    return val;
}



