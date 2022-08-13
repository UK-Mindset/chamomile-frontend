function init(){
    // progress bars
    $(".pbarCP01").progressbar({ "value": 63 });

    // set colors for progressbar .pbarCP01
    $(".pbarCP01").css({ 'background': ' orange' });
    $(".pbarCP01 > div").css({ 'background': 'black', 'position': 'absolute', 'top':'1px'});
}