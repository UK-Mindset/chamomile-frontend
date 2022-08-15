function clearSearch() {
    var obj = document.getElementsByClassName('inputSearch');

    for (var i = 0; i < obj.length; i++) {
        obj[i].value = '';
    }
}