const send_btn1 = document.getElementById('send-1');
const send_btn2 = document.getElementById('send-2');
const okay_btn = document.getElementById('okay');
const terminate = document.getElementById('terminate');

var user1_message_data = []
var user2_message_data = []

okay_btn.addEventListener('click', event => {
    var lang1_code = document.getElementById("lang-1").className;
    var lang2_code = document.getElementById("lang-2").className;

    fetch("/translate?user_in=Send"+"&lang_from=en"+"&lang_to="+lang1_code).then(response => {
        response.json().then(function(data){
            document.getElementById('send-1').innerText = data[0]['translations'][0].text;
        });
    });
    fetch("/translate?user_in=Enter your message..."+"&lang_from=en"+"&lang_to="+lang1_code).then(response => {
        response.json().then(function(data){
            document.getElementById('message-1').placeholder = data[0]['translations'][0].text;
        });
    });
    fetch("/translate?user_in=Send"+"&lang_from=en"+"&lang_to="+lang2_code).then(response => {
        response.json().then(function(data){
            document.getElementById('send-2').innerText = data[0]['translations'][0].text;
        });
    });
    fetch("/translate?user_in=Enter your message..."+"&lang_from=en"+"&lang_to="+lang2_code).then(response => {
        response.json().then(function(data){
            document.getElementById('message-2').placeholder = data[0]['translations'][0].text;
        });
    });
});

send_btn1.addEventListener('click', event => {
    var lang1_code = document.getElementById("lang-1").className;
    var lang2_code = document.getElementById("lang-2").className;
    var user1_in = document.getElementById('message-1').value;
    addToChat_m1(user1_in, 1, "original", "right");
    document.getElementById('message-1').value = '';

    fetch("/translate?user_in="+user1_in+"&lang_from="+lang1_code+"&lang_to="+lang2_code).then(response => {
        response.json().then(function(data){
            addToChat_m2(data[0]['translations'][0].text, 1, "translated", "left");
        });
    });
});

send_btn2.addEventListener('click', event => {
    var lang1_code = document.getElementById("lang-1").className;
    var lang2_code = document.getElementById("lang-2").className;
    var user2_in = document.getElementById('message-2').value;
    addToChat_m2(user2_in, 2, "original", "right");
    document.getElementById('message-2').value = '';

    fetch("/translate?user_in="+user2_in+"&lang_from="+lang2_code+"&lang_to="+lang1_code).then(response => {
        response.json().then(function(data){
            addToChat_m1(data[0]['translations'][0].text, 2, "translated", "left");
        });
    })
});

function addToChat_m1(mess, user, type, side){
    var $messages_1, message;

    $messages_1 = $('#messages-1');
    message = new Message({
        mess: mess,
        user: user,
        type: type,
        side: side,
        mid: '#messages-1'
    });
    console.log(message);
    message.draw();
    $messages_1.animate({scrollTop: $messages_1.prop('scrollHeight')}, 300)
}

function addToChat_m2(mess, user, type, side){
    var $messages_2, message;

    $messages_2 = $('#messages-2');
    message = new Message({
        mess: mess,
        user: user,
        type: type,
        side: side,
        mid: '#messages-2'
    });
    console.log(message);
    message.draw();
    $messages_2.animate({scrollTop: $messages_2.prop('scrollHeight')}, 300)
}

function Message(arg){
    this.mess = arg.mess, this.user = arg.user, this.type = arg.type, this.side = arg.side;
    this.mid = arg.mid;

    if(this.user == 1){
        user1_message_data.push({
            text: this.mess,
            textType: this.type
        });
    }
    if(this.user == 2){
        user2_message_data.push({
            text: this.mess,
            textType: this.type
        });
    }

    this.draw = function(_this){
        return function(){
            var $message;
            $message = $($('.message-template').clone().html());
            $message.addClass(_this.side).find('.message-text').html(_this.mess);
            $(_this.mid).append($message);
            return setTimeout(function(){
                return $message.addClass('appeared');
            }, 0);
        };
    }(this);
    return this;
}