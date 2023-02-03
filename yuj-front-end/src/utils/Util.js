
function snakeToCamel(str){
    console.log(str);
    return str.replace(/[^a-zA-z0-9]+(.)/g, (m, chr)=> chr.toUpperCase());
}