terminate.addEventListener("click", event => {
    var name1 = document.getElementById('name-1').innerText;
    var name2 = document.getElementById('name-2').innerText;
    var lang_data1 = document.getElementById('lang-1').innerText;
    var lang_data2 = document.getElementById('lang-2').innerText;

    var log_data = {
        user1: {
            name: name1,
            lang: lang_data1,
            data: user1_message_data
        },
        user2: {
            name: name2,
            lang: lang_data2,
            data: user2_message_data
        }
    }

    function download(filename, data){
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();
        document.body.removeChild(element);
    }

    var date = new Date();
    download(date.toString()+'.txt', JSON.stringify(log_data));

    console.log(log_data);

    event.preventDefault();
    window.open('https://ufl.qualtrics.com/jfe/form/SV_9nxf0mvrLHnfagC');
    location.reload();
});