class TelefonoArgentino{REGEX=/^(?:(?:(00)?(?:(\+?54)|(0)?)?(?:(9)?(((3894|3892|3891|3888|3887|3886|3885|3878|3877|3876|3873|3869|3868|3867|3865|3863|3862|3861|3858|3857|3856|3855|3854|3846|3845|3844|3843|3841|3838|3837|3835|3832|3827|3826|3825|3821|3786|3782|3781|3777|3775|3774|3773|3772|3758|3757|3756|3755|3754|3751|3743|3741|3735|3734|3731|3725|3721|3718|3716|3715|3711|3585|3584|3583|3582|3576|3575|3574|3573|3572|3571|3564|3563|3562|3549|3548|3547|3546|3544|3543|3542|3541|3537|3533|3532|3525|3524|3522|3521|3498|3497|3496|3493|3492|3491|3489|3487|3483|3482|3476|3472|3471|3469|3468|3467|3466|3465|3464|3463|3462|3460|3458|3456|3455|3454|3447|3446|3445|3444|3442|3438|3437|3436|3435|3409|3408|3407|3406|3405|3404|3402|3401|3400|3388|3387|3385|3382|3329|3327|2983|2982|2972|2966|2964|2963|2962|2954|2953|2952|2948|2946|2945|2942|2940|2936|2935|2934|2933|2932|2931|2929|2928|2927|2926|2925|2924|2923|2922|2921|2920|2903|2902|2901|2658|2657|2656|2655|2652|2651|2648|2647|2646|2626|2625|2624|2622|2478|2477|2475|2474|2473|2396|2395|2394|2393|2392|2358|2357|2356|2355|2354|2353|2352|2346|2345|2344|2343|2342|2338|2337|2336|2335|2334|2333|2331|2326|2325|2324|2323|2320|2317|2316|2314|2302|2297|2296|2292|2291|2286|2285|2284|2283|2281|2274|2273|2272|2271|2268|2267|2266|2265|2264|2262|2261|2257|2255|2254|2252|2246|2245|2244|2243|2242|2241|2229|2227|2226|2225|2224|2223|2221|2202)(15)?([\d]{6})|(388|387|385|383|381|380|379|376|370|364|362|358|353|351|348|345|343|342|341|336|299|298|297|294|291|280|266|264|263|261|260|249|237|236|230|223|221|220)(15)?([\d]{7})|(11)(15)?([\d]{8})|(15)([\d]{6})|(15)([\d]{7})|(15)([\d]{8})|([\d]{6,8}))|(0800|0810|0822|0823|0610|0611|0612|0609|0600|0747|0939|0605|0603)([\d]{7,8}))?)|(19|100|101|102|103|105|106|107|108|110|112|113|114|115|121|125|126|130|131|132|133|134|135|136|137|138|139|144|145|147|911|000)))$/;constructor(e){if(!e)throw new Error("Debe ingresar un número de teléfono.");this.validCharacters=["-","(",")","[","]","+","."],this.input=e,this.data=this._phone(e)}getType=()=>this.data.type;getData=()=>this.data;isValid=()=>!!this.getData();_cleanup=e=>{return(e=e.toString()).replace(/([\-\.\(\)\[\]\s\+]+)/g,"")};_type=e=>{let t;var{number:e,mobile_prefix:a,mobile:n,area_code:r,specific:i,special:l}=e;return(!a||!n)&&(t=l?"special":i&&7===e.length?"specific":(r&&r.length+e.length===10||!r&&6<=e.length&&e.length<=8)&&(a||n?"mobile":"landline"))};_phone=e=>{var t=!1,e=this._cleanup(e).match(this.REGEX);if(null!==e){t=this._setData(e),e=this._type(t);if(!e)return!1;t.type=e,t.format=this._phoneNumberFormat(t),t.htmlify=this._htmlify(t)}return t};invalidChars=()=>{for(var e,t=this.validCharacters.join("\\"),a=new RegExp(`([^0-9\\s\\${t}])`,"g"),n=new Array;null!==(e=a.exec(this.input));)e.index===a.lastIndex&&a.lastIndex++,n.indexOf(e[0])<0&&n.push(e[0]);return 0<n.length&&n};_validateValue=(a,e)=>{return e.find((e,t)=>{if(a.includes(t)&&void 0!==e)return e})||!1};_setData=e=>{return{filter_input:e[0]||!1,international:e[1]||!1,country:e[2]||!1,national_call:e[3]||!1,mobile:e[4]||!1,special:e[25]||!1,specific:e[23]||!1,number:this._validateValue([9,15,12,21,17,19,22,24],e),mobile_prefix:this._validateValue([8,11,14,18,20],e),area_code:this._validateValue([13,10,7],e),input:this.input}};_cleanupNumberFormat=e=>{return e.filter(e=>e).join(" ")||null};_numberFormat=e=>{return e.slice(0,e.length-4)+"-"+e.slice(-4)};_nationalCodePlusAreaCode=(e,t)=>[e,t].every(e=>e)?e+t:[e,t].filter(e=>e).join("");_countryFormat=e=>e?"+"+e:"";_phoneNumberFormat=e=>{var{number:e,filter_input:t,country:a,mobile_prefix:n,international:r,mobile:i,national_call:l,area_code:o,specific:s}=e;return e?(r=[r,this._countryFormat(a),i,this._nationalCodePlusAreaCode(l,o),n,s,this._numberFormat(e)],this._cleanupNumberFormat(r)):t};_htmlify=e=>{var{number:t,filter_input:a,country:n}=e;if(!t)return a;var r,t=document.createElement("span"),a=(t.className="number",t.textContent=this._numberFormat(e.number),document.createElement("span")),i=(a.className="country",a.dataset.country="1",a.textContent=this._countryFormat(n),[]);for(const l in e)e[l]?((r=document.createElement("span")).className=l.replace("_","-"),r.dataset[l.replace(/[^a-zA-Z]/g,"")]=1,r.textContent=e[l],i[l]=r.outerHTML):i[l]="";n=[i.international,a.outerHTML,i.mobile,this._nationalCodePlusAreaCode(i.national_call,i.area_code),i.mobile_prefix,i.specific,t.outerHTML];return this._cleanupNumberFormat(n)}}