/*
title: Argentinian phonenumber validator \
  Validador de números telefónicos argentinos.
autor: Agustín Bouillet
year: 2016
email: agustin.bouillet@gmail.com
website: www.bouillet.com.ar
gitHub: https://github.com/agustinbouillet/validador-de-numeros-de-telefono-argentinos
*/

const json_url   = 'https://spreadsheets.google.com/feeds/list/14H7VE3zfllDDTC73L0bL7nyjkdodPMXvqs1CH__xgFY/1/public/values?alt=json';
// const json_url   = '../data/geo.json';
var geo_politics = [];

/**
 * Retorna el JSON con las regiones.
 */
fetch(json_url, {
    method: "get",
    credentials: "same-origin",
    headers: {
        "Accept"       : "application/json",
        "Content-Type" : "application/json"
    }
}).then(function(response) {
  return response.json();
}).then(function(data) {
  // Chequea si la data es de spreadshhets
  if(data.hasOwnProperty('feed')){
    data.feed.entry.forEach(function(v,k){
      geo_politics.push(
          {
            code         : v.gsx$code.$t,
            jurisdiction : v.gsx$jurisdiction.$t,
            localities   : v.gsx$localities.$t
          }
      );
    });
  // Si se decide utilizar un JSON local o con otra url, se debe mantener
  // la siguiente estructura:
  //     {
  //       code         : [str],
  //       jurisdiction : [str]t,
  //       localities   : [str]
  //     }
  } else if (data && data[0].hasOwnProperty('code')) {
    geo_politics = data;
  }

}).catch(function(ex) {
  console.log("parsing failed", ex);
});


/**
 * Valida un numero de telefono
 * @param  {string}  str
 * @return {Boolean | object}
 */
function TelefonoArgentino(str) {
  this.input        = str;
  this.getData      = telefono;
  this.getType      = getTelephoneType;
  this.isValid      = isValid;
  this.filterInt    = filterInt(str);
  this.invalidChars = invalidChars;
  this.getGeoPolitc = getGeoPolitc;
}


/**
 * Retorna los datos regionales segun el código de área ingresado.
 * @param  {integer} code Código de área.
 * @return {object}
 */
function region_by_code(code){
    var res = false;
    geo_politics.forEach(function(v){
        if(v.code == code){
           res = v;
        }
    });
    return res;
}


function telefono() {

  var regex = /^(?:(?:(00)?(?:(\+?54)|(0)?)?(?:(9)?(((3894|3892|3891|3888|3887|3886|3885|3878|3877|3876|3873|3869|3868|3867|3865|3863|3862|3861|3858|3857|3856|3855|3854|3846|3845|3844|3843|3841|3838|3837|3835|3832|3827|3826|3825|3821|3786|3782|3781|3777|3775|3774|3773|3772|3758|3757|3756|3755|3754|3751|3743|3741|3735|3734|3731|3725|3721|3718|3716|3715|3711|3585|3584|3583|3582|3576|3575|3574|3573|3572|3571|3564|3563|3562|3549|3548|3547|3546|3544|3543|3542|3541|3537|3533|3532|3525|3524|3522|3521|3498|3497|3496|3493|3492|3491|3489|3487|3483|3482|3476|3472|3471|3469|3468|3467|3466|3465|3464|3463|3462|3460|3458|3456|3455|3454|3447|3446|3445|3444|3442|3438|3437|3436|3435|3409|3408|3407|3406|3405|3404|3402|3401|3400|3388|3387|3385|3382|3329|3327|2983|2982|2972|2966|2964|2963|2962|2954|2953|2952|2948|2946|2945|2942|2940|2936|2935|2934|2933|2932|2931|2929|2928|2927|2926|2925|2924|2923|2922|2921|2920|2903|2902|2901|2658|2657|2656|2655|2652|2651|2648|2647|2646|2626|2625|2624|2622|2478|2477|2475|2474|2473|2396|2395|2394|2393|2392|2358|2357|2356|2355|2354|2353|2352|2346|2345|2344|2343|2342|2338|2337|2336|2335|2334|2333|2331|2326|2325|2324|2323|2320|2317|2316|2314|2302|2297|2296|2292|2291|2286|2285|2284|2283|2281|2274|2273|2272|2271|2268|2267|2266|2265|2264|2262|2261|2257|2255|2254|2252|2246|2245|2244|2243|2242|2241|2229|2227|2226|2225|2224|2223|2221|2202)(15)?([\d]{6})|(388|387|385|383|381|380|379|376|370|364|362|358|353|351|348|345|343|342|341|336|299|298|297|294|291|280|266|264|263|261|260|249|237|236|230|223|221|220)(15)?([\d]{7})|(11)(15)?([\d]{8})|(15)([\d]{6})|(15)([\d]{7})|(15)([\d]{8})|([\d]{6,8}))|(0800|0810|0822|0823|0610|0611|0612|0609|0600|0747|0939|0605|0603)([\d]{7,8}))?)|(000|19|100|101|102|103|105|106|107|108|110|112|113|114|115|121|125|126|130|131|132|133|134|135|136|137|138|139|144|145|147|911|000)))$/;

  /**
   * Limpia caracteres de uso común en la sintaxis empleada para
   * representar números de teléfono.
   *
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
    data['input']   = this.input;
    data['type']    = phone_type;
    data['format']  = numberFormat(data);
    data['htmlify'] = htmlify(data);


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
 * @return {array | false} Array con todos los caracteres inválidos, o
 * false si no tiene caracters inapropiados.
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
function setData(result) {

  /**
   * Retorna el valor si se encuentra en uno de los elementos de array.
   * @param  {array} list listado de la posición de los grupos de captura
   * @return {integer|boolean}
   */
  function validate_value(list){
    var value = false;
    result.forEach(function(v, k){
      if (list.includes(k) && result[k] !== undefined) {
        value = result[k];
        return;
      }
    });

    return value;
  }

  var data = {
    'filter_input'  : (result[0] !== undefined) ? result[0] : false,
    'international' : (result[1] !== undefined) ? result[1] : false,
    'country'       : (result[2] !== undefined) ? result[2] : false,
    'national_call' : (result[3] !== undefined) ? result[3] : false,
    'mobile'        : (result[4] !== undefined) ? result[4] : false,
    'special'       : (result[25] !== undefined) ? result[25] : false,
    'specific'      : (result[23] !== undefined) ? result[23] : false
  };

  // Obtengo numero
  var number_list = [9, 15, 12, 21, 17, 19, 22, 24];
  data['number'] = validate_value(number_list);

  // Obtengo el prefijo mobile
  var mobile_prefix_list = [8, 11, 14, 18, 20];
  data['mobile_prefix'] = validate_value(mobile_prefix_list);

  // Obtengo el area code
  var area_code_list = [13, 10, 7];
  data['area_code'] = validate_value(area_code_list);

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
  var subst = '';
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
  var number = `${data.number.slice(0, data.number.length - 4)}-${data.number.slice(-4)}`;


  // Defino el numero de pais con el signo +
  var country = data.country ? '+' + data.country : '';

  var d = [];
  for (key in data) {
    d[key] = data[key] ? data[key] : '';
  }

  // Defino los valores que voy a concatenar
  var formated_number = [
      d['international'],
      country,
      d['mobile'],
      d['national_call'] + d['area_code'],
      d['mobile_prefix'],
      d['specific'],number
  ].join(' ');

  return cleanupNumberFormat(formated_number);
}

/**
 * Retorna el numero de telefono con formato + etiquetas de wrapper por
 * atributo.
 * @param  {object} data
 * @return {string}
 */
function htmlify(data) {
  if (!data.number) {
    return data.filter_input;
  }

  // Defino el formato del numero
  var number = `${data.number.slice(0, data.number.length - 4)}-${data.number.slice(-4)}`;
  number     = `<span class="number">${number}</span>`;

  // Defino el numero de pais con el signo +
  var country = data.country ? `<span class="country">+${data.country}</span>` : '';

  var d = [];
  for (key in data) {
    d[key] = data[key] ? `<span class="${key}">${data[key]}</span>` : '';
  }

  // Defino los valores que voy a concatenar
  var formated_number = [
      d['international'],
      country,
      d['mobile'],
      d['national_call'] + d['area_code'],
      d['mobile_prefix'],
      d['specific'],number
  ].join(' ');

  return cleanupNumberFormat(formated_number);
}


/**
 * Obtiene la provincia y la ciudad a la que pertenece el codigo de area
 * @return {object | false}
 */
function getGeoPolitc(json_data) {
  var obj = this;
  var val = [];
  if (!obj.getData().area_code) {
    return false;
  }

  var values = region_by_code(obj.getData().area_code);

  if(values){
    var localities = values.localities.replaceAll(/,\s*/g, ',');
    var localities_to_list = localities.split(',');

    val = {
        'provincia'   : values.jurisdiction,
        'ciudad'      : localities_to_list[0],
        'localidades' : localities_to_list
    };
  }
  return val;
}
