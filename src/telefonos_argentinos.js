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
        this.input = str;
        this.data = this._telephone(str);
    };


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
     * Teléfono váliodo o inválido
     * 
     * @return {Boolean}
     */
    isValid = () => (this.getData() ? true : false);


    /**
     * Limpia caracteres de uso común en la sintaxis empleada para
     * representar números de teléfono.
     *
     * @param {string} str
     */
    _cleanup = str => {
        str = str.toString();
        var re = /([\-\.\(\)\[\]\s\+]+)/g;
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
    _type = (data) => {
        let type;

        if (data.mobile_prefix && data.mobile) {
            return false;
        }

        if (data.special) {
            type = 'special';
        } else if (data.specific && data.number.length === 7) {
            type = 'specific';

        // El número tiene código de área.
        } else if (data.area_code &&
            ((data.area_code.length + data.number.length) === 10)) {
            type = (data.mobile_prefix || data.mobile ? 'mobile' : 'landline');
    
        // El número no tiene código de área y debe tener un rango
        // de números de 6 a 8.
        } else if (!data.area_code &&
            (data.number.length >= 6 && data.number.length <= 8)) {
            type = (data.mobile_prefix || data.mobile ? 'mobile' : 'landline');
        } else {
            type = false;
        }

        return type;
    }


    /**
     * 
     * @returns {object}
     */
    _telephone = number => {
        var data = false;
        const filteredStr = this._cleanup(number);
        // const filteredStr = this.filterInt(number);
        var result = filteredStr.match(this.REGEX);

        if (result !== null) {
            data = this._setData(result);
            const phoneType = this._type(data);
            if (!phoneType) {
                return false;
            }

            data.input = this.input;
            data.type = phoneType;
            data.format = this._phoneNumberFormat(data);
            data.htmlify = this._htmlify(data);
        }

        return data;
    };


    /**
     * Verifica si el string pasado tiene caracteres válidos.
     * @return {array | false} Array con todos los caracteres inválidos, 
     * o false si no tiene caracters inapropiados.
     */
    invalidChars = () => {
        const re = /([^\d\-\(\)\[\]\s\+\.])/g;
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
    }


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
            filter_input: (result[0] ? result[0] : false),
            international: (result[1] ? result[1] : false),
            country: (result[2] ? result[2] : false),
            national_call: (result[3] ? result[3] : false),
            mobile: (result[4] ? result[4] : false),
            special: (result[25] ? result[25] : false),
            specific: (result[23] ? result[23] : false),
            number: this._validateValue(numberList, result),
            mobile_prefix: this._validateValue(mobilePrefixList, result),
            area_code: this._validateValue(areaCodeList, result)
        };
        return data;
    };


    /**
     * hace un string trim e impide que haya mas de un 
     * espacio entre palabras.
     * 
     * @param  {string} str
     * @return {string}
     */
    _cleanupNumberFormat = data => {
        const result = data.filter(f => f).join(" ");
        return result || null;
    }


    /**
     * Formato para el número
     * @param {string} number Número de telefono 
     * @returns {string}
     */
    _numberFormat = number => {
        const result = `${number.slice(0, number.length - 4)}`
                + `-${number.slice(-4)}`;
        return result;
    }


    /**
     * Formato para codigo nacional con código de área.
     * 
     * @param {string} national_call Número de llamada nacional
     * @param {string} area_code Número de código de área
     * @returns {string}
     */
    _nationalCodePlusAreaCode = (national_call, area_code) => {
        if (![national_call, area_code].every(e => e)){ 
            return [national_call, area_code].filter(f => f);
        }
        return national_call + area_code;
    }


    /**
     * Formato para país.
     * 
     * @param {string} country Número de país
     * @returns 
     */
    _countryFormat = country => {
        return (country ? `+${country}` : '');
    }


    /**
     * Retorna el número de teléfono con un formato estandard.
     * @param  {object} data
     * @return {string}
     */
    _phoneNumberFormat = data => {
        const {
            number, filter_input, country, mobile_prefix, international, 
            mobile, national_call, area_code, specific} = data;

        if (!number) {
            return filter_input;
        }

        const numberData = [
            international,
            this._countryFormat(country),
            mobile,
            this._nationalCodePlusAreaCode(national_call, area_code),
            mobile_prefix,
            specific,
            this._numberFormat(number)
        ];
        return this._cleanupNumberFormat(numberData);
    };


    /**
     * Retorna el numero de telefono con formato + etiquetas de wrapper por
     * atributo.
     * @param  {object} data
     * @return {string}
     */
    _htmlify = data => {
        const {number, filter_input, country} = data;

        if (!number) {
            return filter_input;
        }

        const span_number = document.createElement('span');
        span_number.className = 'number';
        span_number.textContent = this._numberFormat(data.number);

        const span_country = document.createElement('span');
        span_country.className = "country";
        span_country.dataset.country = '1';
        span_country.textContent = this._countryFormat(country);

        let d = [];
        for (const key in data) {
            if(data[key]){
                const span = document.createElement('span');
                span.className = key.replace('_', '-');
                span.dataset[key.replace(/[^a-zA-Z]/g, '')] = 1;
                span.textContent = data[key];
                d[key] = span.outerHTML;
            } else {
                d[key] = '';
            }
        }

        const numberData = [
            d.international,
            span_country.outerHTML,
            d.mobile,
            d.national_call + d.area_code,
            d.mobile_prefix,
            d.specific,
            span_number.outerHTML
        ];
        return this._cleanupNumberFormat(numberData);
    };
}