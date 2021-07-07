var modal = document.getElementById("choices");

window.onload = (event) => {
    modal.style.display = "block";
}

function fillDetails(){
    var name1 = document.getElementById('name-m-1').value;
    var name2 = document.getElementById('name-m-2').value;
    var lang1 = document.getElementById('lang-select-1');
    var lang2 = document.getElementById('lang-select-2');
    var lang1_code = lang1.options[lang1.selectedIndex].id;
    var lang2_code = lang2.options[lang2.selectedIndex].id;

    if(name1 != '' && name2 != '' && lang1_code != '0' && lang2_code != '0'){
        document.getElementById('name-1').innerText = name1;
        document.getElementById('name-2').innerText = name2;
        document.getElementById('lang-1').innerText = lang1.options[lang1.selectedIndex].text;
        document.getElementById('lang-2').innerText = lang2.options[lang2.selectedIndex].text;
        document.getElementById('lang-1').classList.add(lang1_code);
        document.getElementById('lang-2').classList.add(lang2_code);
        modal.style.display = "none";
    }else{
        alert("PLEASE FILL ALL THE DETAILS!!!");
    }
}