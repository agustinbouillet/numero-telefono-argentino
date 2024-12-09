/**
 * VALIDADOR DE NÚMEROS DE TELÉFONO ARGENTINOS
 * 
 * @summary Validador de números telefónicos argentinos.
 * @autor Agustín Bouillet <agustin.bouillet@gmail.com>
 * @contact https://linktr.ee/bouillet
 * @see https://github.com/agustinbouillet/numero-telefono-argentino
 * 
 * @param  {string}  str Número de teléfono en formato string
 * @return {Boolean | object}
 * 
 * 
 * MIT License
 *
 * Copyright (c) 2023 Agustín Bouillet
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rightsto use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
 * BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
class TelefonoArgentino {

    REGEX = /^(?:(?:(00)?(?:(\+?54)|(0)?)?(?:(9)?(((3894|3892|3891|3888|3887|3886|3885|3878|3877|3876|3873|3869|3868|3867|3865|3863|3862|3861|3858|3857|3856|3855|3854|3846|3845|3844|3843|3841|3838|3837|3835|3832|3827|3826|3825|3821|3786|3782|3781|3777|3775|3774|3773|3772|3758|3757|3756|3755|3754|3751|3743|3741|3735|3734|3731|3725|3721|3718|3716|3715|3711|3585|3584|3583|3582|3576|3575|3574|3573|3572|3571|3564|3563|3562|3549|3548|3547|3546|3544|3543|3542|3541|3537|3533|3532|3525|3524|3522|3521|3498|3497|3496|3493|3492|3491|3489|3487|3483|3482|3476|3472|3471|3469|3468|3467|3466|3465|3464|3463|3462|3460|3458|3456|3455|3454|3447|3446|3445|3444|3442|3438|3437|3436|3435|3409|3408|3407|3406|3405|3404|3402|3401|3400|3388|3387|3385|3382|3329|3327|2983|2982|2972|2966|2964|2963|2962|2954|2953|2952|2948|2946|2945|2942|2940|2936|2935|2934|2933|2932|2931|2929|2928|2927|2926|2925|2924|2923|2922|2921|2920|2903|2902|2901|2658|2657|2656|2655|2652|2651|2648|2647|2646|2626|2625|2624|2622|2478|2477|2475|2474|2473|2396|2395|2394|2393|2392|2358|2357|2356|2355|2354|2353|2352|2346|2345|2344|2343|2342|2338|2337|2336|2335|2334|2333|2331|2326|2325|2324|2323|2320|2317|2316|2314|2302|2297|2296|2292|2291|2286|2285|2284|2283|2281|2274|2273|2272|2271|2268|2267|2266|2265|2264|2262|2261|2257|2255|2254|2252|2246|2245|2244|2243|2242|2241|2229|2227|2226|2225|2224|2223|2221|2202)(15)?([\d]{6})|(388|387|385|383|381|380|379|376|370|364|362|358|353|351|348|345|343|342|341|336|299|298|297|294|291|280|266|264|263|261|260|249|237|236|230|223|221|220)(15)?([\d]{7})|(11)(15)?([\d]{8})|(15)([\d]{6})|(15)([\d]{7})|(15)([\d]{8})|([\d]{6,8}))|(0800|0810|0822|0823|0610|0611|0612|0609|0600|0747|0939|0605|0603)([\d]{7,8}))?)|(19|100|101|102|103|105|106|107|108|110|112|113|114|115|121|125|126|130|131|132|133|134|135|136|137|138|139|144|145|147|911|000)))$/;

    constructor(str, options){
        if(!str){
            throw new Error("Debe ingresar un número de teléfono.");
        }
        
        const defaults = {
            validCharacters: ["-", "–", "—", "(", ")", "[", "]", "+", "."],
            format: '{{specific}}{{special}}{{international|add_after:" "}}'
                    + '{{country|add_after:" "}}{{mobile|add_after:" "}}'
                    + '{{national_call}}{{area_code|add_after:" "}}'
                    + '{{mobile_prefix|add_after:" "}} {{number}}',
            numberFormat: "#-####",
            numberFormatSeparator: "-",
            countryPrefix: "+"
        };
        let opts = Object.assign({}, defaults, options);
        this.validCharacters = opts.validCharacters;
        this.numberFormat = opts.numberFormat;
        this.numberFormatSeparator = opts.numberFormatSeparator;
        this.format = opts.format;
        this.input = str;
        this.data = this._phone(str);
    };


    /**
     * Etiqueta html para el fragmento de número de teléfono.
     * 
     * @param {string} key Nombre del parámetro, ej. _area_code_.
     * @param {string} value Valor o fragmento del formato de número de teléfono.
     * @returns {string} Etiqueta span con el valor y el dataset con el key
     */
    _spanTag = (key, value) => {
        const element = document.createElement("span");
        element.className = key.replace("_", "-");
        element.dataset[key] = 1;
        element.textContent = value;
        return element.outerHTML;
    }; 


    /**
     * Evalúa un fragmento del formato de teléfono
     * 
     * @summary Verifica que uno de los elementos evaluados con la 
     * expresión regular que valida el teléfono esté presente y, a su vez
     * obtiene el parámetro de agregado de string, antes o después del
     * valor.
     * @example
     * // {
     * //    key: "area_code",
     * //    param: "add_after",
     * //    element: "-"
     * // }
     * _fragment('{{area_code|add_after: "-"}}')
     * @param {object} data Objeto `this.data`
     * @param {string} str Cadena de texto a evaluar.
     * @returns {object}
     */
    _fragment = (data, str) => {
        const regex = (str, re) => {
            let result = [];
            let m;
            if ((m = re.exec(str)) !== null) {
                m.forEach(match => result.push(match));
            }
            return result;
        }

        const re1 = /\{\{\s?([^\{\}]+)\s?\}\}/;
        const re2 = new RegExp(
            `^(${Object.keys(data).join("\|")})\\s?`
            + `(\\|\\s?(add_after|add_before):\\s?(\\"|\\')([^\\4\\|]+)\\4)?$`);
        const res = regex(str, re1);

        const result = res[1].split(",").map(m => {
            const re = regex(m.trim(), re2);
            if(re.length < 1){
                return
            }
            const [,key,,param=false,,element=false] = re;
            return {key, param, element};
        }).filter(f => f);

        return result;
    }


    /**
     * Limpia el resultado del parseo de template.
     * 
     * @summary
     * 1. Si hay inicio o finales de llave, corchetes o paréntesis con
     *    espacios, los remueve.
     * 2. Si encuentra llaves, corchetes o paréntesis vacíos; los borra.
     * 3. Si hay más de un espacio consecutivo, lo reduce a uno.
     * @param {string} str Cadena de texto a limpiar 
     * @returns {string}
     */
    _sanitizeFormatResult = (str) => {
        const result = str
            .replace(/(?:(\[|\{|\()\s)|(?:\s(\]|\}|\)))/g, "$1$2")
            .replace(/(\{\}|\[\]|\(\))/g, "")
            .replace(/\s{2,}/g, " ")
            .trim();
        return result;
    };


    /**
     * Parsea el template de formato de número de teléfono
     * 
     * @param {object} data Objeto `this.data`
     * @param {boolean} htmlify True retorna todolos valors separados 
     * por un tag span
     * @returns {string}
     */
    _format = (data, htmlify=false) => {
        let str = this.format;

        const regex = /(\{\{(?:[^\{\}]+)\}\})/g;
        const match = str.match(regex);
        match.forEach(ele => {
            const fragments = this._fragment(data, ele);
            if(fragments.length < 1){
                return;
            }

            const compile = fragments.reduce((collect, e) => {
                const {key, param, element} = e;
                const value = data[key];
                let item = "";

                if(key === "number" && value){
                    item = this._numberFormat(
                        value, this.numberFormat, this.numberFormatSeparator);
                } else if (key === "country" && value) {
                    item = this._countryFormat(value);
                } else if (value) {
                    item = value;
                }

                const addBefore = (param === "add_before" ? element : "");
                const addAfter = (param === "add_after" ? element : "");
                const la = (htmlify ? this._spanTag(key, item) : item);
                
                collect += (value ? `${addBefore}${la}${addAfter}` : "");
                return collect;
            }, "");

            str = str.replace(ele, compile);
        });

        return this._sanitizeFormatResult(str) || false;
    }


    /**
     * Limpia caracteres y algunos erroes en el patron para el formato
     * del número.
     * 
     * @summary
     * 1. Remueve cualquier caracter que **no** sea guión (-) o numeral (#).
     * 2. Si hay más de un guión pegado, los reduce a uno.
     * 3. Si hay un guión solo en el final del patrón, lo quita.
     * @param {string} pattern Patrón
     * @returns {string}
     */
    _sanitizeNumberFormatPattern = pattern => pattern
        .replace(/[^\-\#]*/g, "") 
        .replace(/-{2,}/g, "-")
        .replace(/-$/g, "");


    /**
     * Dá formato al número
     * 
     * @param {string} number Número a formatear
     * @param {string} format Formato siguiendo un patrón `#-####`.
     * @param {string} separator Separador numérico. Guión (-), por defecto.
     * @example
     * // 1234.5678
     * _numberFormat("12345678", "#-####", ".")
     * 
     * // 123-45-678
     * _numberFormat("12345678", "#-##-###")
     * @returns {string}
     */
    _numberFormat = (number, format, separator="-") => {
        format = this._sanitizeNumberFormatPattern(format);
        const chunks = format.split("-").map(e => e.length);

        let collect = [];
        let reducer = number.length;
        let total = 0;
        chunks.reverse().forEach((i, k) => {
            if (total > number.length) {
                return;
            }

            if (k === 0) {
                collect.push(number.slice(-i));
            } else if (chunks.length - 1 === k) {
                collect.push(number.slice(0, reducer));
            } else {
                collect.push(number.slice(reducer - i, reducer));
            }

            total += i;
            reducer -= i;
        });
        const result = collect
            .reverse()
            .filter(f => f)
            .join(separator);
        return result;
    };
    

    /**
     * Retorna el número en formato HTML.
     * 
     * @returns {string}
     */
    htmlify = () => this._format(this.data, true);


    /**
     * Tipo de número de teléfono
     * 
     * @returns {string | false}
     */
    getType = () => this.data.type;


    /**
     * 
     * @returns 
     */
    getData = () => this.data;


    /**
     * Teléfono válido o inválido.
     * 
     * @example
     * // false
     * new TelefonoArgentino("OLIVIA").isValid();
     * 
     * // true
     * new TelefonoArgentino(911).isValid();
     * @return {Boolean}
     */
    isValid = () => (this.getData() ? true : false);


    /**
     * Limpia caracteres de uso común en la sintaxis empleada para
     * representar números de teléfono.
     *
     * @param {string} str
     * @example
     * // "*ABC1234"
     * this._cleanup("-[]()*ABC1234");
     * @returns {string}
     */
    _cleanup = str => {
        str = str.toString();
        const validCharacters = this.validCharacters.join("\\");
        const re = new RegExp(`([\\s\\${validCharacters}]*)`, "g");
        var subst = "";
        var result = str.replace(re, subst);
        return result;
    };


    /**
     * Retorna el tipo de teléfono
     * 
     * @param  {object} data
     * @return {string} Tipo de teléfono
     */
    _type = data => {
        let type;
        const {
                number, mobile_prefix, mobile, 
                area_code, specific, special} = data;

        if (mobile_prefix && mobile) {
            return false;
        }

        if (special) {
            type = "special";
        } else if (specific && number.length === 7) {
            type = "specific";

        // El número tiene código de área.
        } else if (area_code && ((area_code.length + number.length) === 10)){
            type = (mobile_prefix || mobile ? "mobile" : "landline");
    
        // El número no tiene código de área y debe tener un rango
        // de números de 6 a 8.
        } else if (!area_code && (number.length >= 6 && number.length <= 8)) {
            type = (mobile_prefix || mobile ? "mobile" : "landline");
        } else {
            type = false;
        }

        return type;
    };


    /**
     * 
     * @returns {object}
     */
    _phone = number => {
        var data = false;
        const filteredStr = this._cleanup(number);
        var result = filteredStr.match(this.REGEX);

        if (result !== null) {
            data = this._setData(result);
            const phoneType = this._type(data);
            if (!phoneType) {
                return false;
            }

            data.type = phoneType;
            data.format = this._format(data);
        }
        return data;
    };


    /**
     * Verifica si el string pasado tiene caracteres válidos.
     * 
     * @example
     * // ['¡', '!']
     * new TelefonoArgentino("¡911!").invalidChars();
     * 
     * // false
     * new TelefonoArgentino("911").invalidChars();
     * @return {array | false} Array con todos los caracteres inválidos, 
     * o false si no tiene caracters inapropiados.
     */
    invalidChars = () => {
        const validCharacters = this.validCharacters.join("\\");
        const re = new RegExp(`([^0-9\\s\\${validCharacters}])`, "g");
        let m;
        let chars = new Array();
        
        while ((m = re.exec(this.input)) !== null) {
            if (m.index === re.lastIndex) {
                re.lastIndex++;
            }

            if (chars.indexOf(m[0]) < 0) {
                chars.push(m[0]);
            }
        }
        return (chars.length > 0 ? chars : false);
    };


    /**
     * Retorna el valor si se encuentra en uno de los elementos de array.
     * @param  {array} list listado de la posición de los grupos de captura
     * @return {integer|boolean}
     */
    _validateValue = (list, result) => {
        const value = result.find((item, key) => {
            if(list.includes(key) && item !== undefined){
                return item;
            }
        });
        return value || false;
    };


    /**
     * Prepara los datos de entrada
     * @param {array} result Resultado de la expresion regular
     */
    _setData = result => {
        const numberList = [9, 15, 12, 21, 17, 19, 22, 24];
        const mobilePrefixList = [8, 11, 14, 18, 20];
        const areaCodeList = [13, 10, 7];

        const data = {
            filter_input: (result[0] ?? false),
            international: (result[1] ?? false),
            country: (result[2] ?? false),
            national_call: (result[3] ?? false),
            mobile: (result[4] ?? false),
            specific: (result[23] ?? false),
            special: (result[25] ?? false),

            number: this._validateValue(numberList, result),
            mobile_prefix: this._validateValue(mobilePrefixList, result),
            area_code: this._validateValue(areaCodeList, result),
            
            input: this.input
        };
        return data;
    };


    /**
     * Formato para codigo nacional con código de área.
     * 
     * @param {string} national_call Número de llamada nacional
     * @param {string} area_code Número de código de área
     * @returns {string}
     */
    _nationalCodePlusAreaCode = (national_call, area_code) => {
        if (![national_call, area_code].every(e => e)){ 
            return [national_call, area_code].filter(f => f).join("");
        }
        return national_call + area_code;
    };


    /**
     * Formato para país.
     * 
     * @param {string} country Número de país
     * @returns 
     */
    _countryFormat = country => (country ? `+${country}` : "");

}

if (typeof exports !== "undefined") {
    module.exports = TelefonoArgentino;
} 