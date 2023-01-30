let convertBtn = document.querySelector(".buttonConv");
const apikey = 'aDkI4hIBlTljjBTvKq0ot0Rkq62UHaOI';

fillSelect();

convertBtn.onclick = (e)=>{
    let from = inputFrom.value;
    let to = inputTo.value;
    let amount = inputVal.value;
    convert(from,to,amount)
        .then(response => response.json())
        .then(data => {
            let res = document.querySelector(".result");
            let text = document.createTextNode(`result: ${data.result}${to}`);
            res.replaceChildren(text);
        })
    
}

async function convert(from,to, amount){
    let myHeaders = new Headers();
    myHeaders.append("apikey", "aDkI4hIBlTljjBTvKq0ot0Rkq62UHaOI");

    let requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };
    return fetch(`https://api.apilayer.com/fixer/convert?from=${from}&to=${to}&amount=${amount}`, requestOptions);
}
async function getSymbols(){
    let myHeaders = new Headers();
    myHeaders.append("apikey", "aDkI4hIBlTljjBTvKq0ot0Rkq62UHaOI");

    let requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };
    let symbols = await fetch(`https://api.apilayer.com/fixer/symbols`, requestOptions)
        .then(response => response.json());
    symbols = Object.keys(symbols.symbols);
    return symbols;
}
function fillSelect(){
    let arr = getSymbols();
    let selectFrom = document.querySelector("#fromSelect");
    for (let i = 0; i < arr.length; i++) {
        let option = document.createElement("option");
        let txt = document.createTextNode(arr[i]);
        option.append(txt);
        selectFrom.insertBefore(option,selectFrom.lastChild)
    }
}