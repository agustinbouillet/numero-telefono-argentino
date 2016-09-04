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
function telefonos_argentinos(str) {

    var regex = /^(?:(?:(00)?(?:(54)|(0)?)?(?:(9)?(11|220|221|223|230|236|237|249|260|261|263|264|266|280|291|294|297|298|299|336|341|342|343|345|348|351|353|358|362|364|370|376|379|380|381|383|385|387|388|2202|2221|2223|2224|2225|2226|2227|2229|2241|2242|2243|2244|2245|2246|2252|2254|2255|2257|2261|2262|2264|2265|2266|2267|2268|2271|2272|2273|2274|2281|2283|2284|2285|2286|2291|2292|2296|2297|2302|2314|2316|2317|2320|2323|2324|2325|2326|2331|2333|2334|2335|2336|2337|2338|2342|2343|2344|2345|2346|2352|2353|2354|2355|2356|2357|2358|2392|2393|2394|2395|2396|2473|2474|2475|2477|2478|2622|2624|2625|2626|2646|2647|2648|2651|2652|2655|2656|2657|2658|2901|2902|2903|2920|2921|2922|2923|2924|2925|2926|2927|2928|2929|2931|2932|2933|2934|2935|2936|2940|2942|2945|2946|2948|2952|2953|2954|2962|2963|2964|2966|2972|2982|2983|3327|3329|3382|3385|3387|3388|3400|3401|3402|3404|3405|3406|3407|3408|3409|3435|3436|3437|3438|3442|3444|3445|3446|3447|3454|3455|3456|3458|3460|3462|3463|3464|3465|3466|3467|3468|3469|3471|3472|3476|3482|3483|3487|3489|3491|3492|3493|3496|3497|3498|3521|3522|3524|3525|3532|3533|3537|3541|3542|3543|3544|3546|3547|3548|3549|3562|3563|3564|3571|3572|3573|3574|3575|3576|3582|3583|3584|3585|3711|3715|3716|3718|3721|3725|3731|3734|3735|3741|3743|3751|3754|3755|3756|3757|3758|3772|3773|3774|3775|3777|3781|3782|3786|3821|3825|3826|3827|3832|3835|3837|3838|3841|3843|3844|3845|3846|3854|3855|3856|3857|3858|3861|3862|3863|3865|3867|3868|3869|3873|3876|3877|3878|3885|3886|3887|3888|3891|3892|3894)|(0800|0810|0822|0823|0610|0611|0612|0609|0600|0747|0939|0605|0603))?(15)?([\d]{6,8}))|(000|19|100|101|102|103|105|106|107|110|112|113|114|115|121|125|126|130|131|132|133|134|135|136|137|138|139|144|145|147|911))$/m;

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

    var filtered_str = cleanup(str);
    var result = filtered_str.match(regex);
    if (result != null) {

        var data = set_data(result);

        // Valida el numero y retorna el tipo
        var phone_type = get_type(data);

        // si no valida el numero retorna false.
        if (!phone_type) { return false; }

        // Incorporo datos
        data['input'] = str;
        data['type'] = phone_type;
        data['format'] = format_number(data);

        return data;
    }

    return false;
}

/**
 * Prepara los datos de entrada
 * @param {array} result Resultado de la expresion regular
 */
function set_data(result) {
    var data = {
        'filter_input': (result[0] !== undefined) ? result[0] : false,
        'international': (result[1] !== undefined) ? result[1] : false,
        'country': (result[2] !== undefined) ? result[2] : false,
        'national_call': (result[3] !== undefined) ? result[3] : false,
        'mobile': (result[4] !== undefined) ? result[4] : false,
        'area_code': (result[5] !== undefined) ? result[5] : false,
        'specific': (result[6] !== undefined) ? result[6] : false,
        'mobile_prefix': (result[7] !== undefined) ? result[7] : false,
        'number': (result[8] !== undefined) ? result[8] : false,
        'special': (result[9] !== undefined) ? result[9] : false,
    }
    return data;
}

/**
 * Retorna el tipo de telefono
 * @param  {object} data
 * @return {string} Tipo de teléfono
 */
function get_type(data) {
    // case 1
    if (data.special) {
        type = 'special';
    } else if (data.specific && data.number.length === 7) {
        type = 'specific';
        // El numero tiene codigo de area
    } else if (data.area_code &&
        ((data.area_code.length + data.number.length) === 10)) {

        if (data.mobile_prefix || data.mobile) {
            type = 'mobile';
        } else {
            type = 'landline';
        }

        // El numero no tiene codigo de area y debe tener un rango 
        // de numeros de 6 a 8.
    } else if (!data.area_code &&
        (data.number.length >= 6 && data.number.length <= 8)) {

        if (data.mobile_prefix || data.mobile) {
            type = 'mobile';
        } else {
            type = 'landline';
        }

    } else {
        type = false;
    }

    return type;
}

/**
 * Retorna el numero de telefon con un formato standard
 * @param  {object} data
 * @return {string}
 */
function format_number(data) {
    if (!data.number) {
        return data.filter_input;
    }

    // Defino el formato del numero
    number = data.number.slice(0, data.number.length - 4) +
        '-' + data.number.slice(-4);

    // Defino los valores que voy a concatenar
    space = ' ';
    country = data.country ? data.country : '';
    mobile = data.mobile ? data.mobile + space : '';
    mobile_prefix = data.mobile_prefix ? data.mobile_prefix : '';
    international = data.international ? data.international : '';
    national_call = data.national_call ? data.national_call : '';
    area_code = data.area_code ? data.area_code : '';
    specific = data.specific ? data.specific : '';

    formated_number = international + space + country + space + mobile +
        national_call + area_code + mobile_prefix + space +
        specific + space + number;

    // hace un string trim e impide que haya mas de un espacio 
    // entre palabras.
    function cleanup(str){
        var re = /(^\s*|\s(?=\s+)|\s*$)/g;
        var subst = ' ';
        var result = str.replace(re, subst);
        return result;
    }
    
    return cleanup(formated_number);
}