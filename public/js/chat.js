



$(function(){
    var socket = io.connect('https://khoachat.herokuapp.com/')
    var message=$("#message")
    var send_message=$("#send_message")
    var user_name=$("#user_name")
    var sent_name=$("#sent_name")
    var text_box=$("#text_box")
        // emit
       
        if(localStorage.getItem('name')){
            user_name.attr('disabled','disabled');
            user_name.val(localStorage.getItem('name'))
            socket.emit("change_username",{user_name: user_name.val()})
        }else{
            sent_name.click(function(){
                console.log(user_name.val());
                socket.emit("change_username",{user_name: user_name.val()})
                localStorage.setItem("name",user_name.val())
                user_name.attr('disabled','disabled');
            })
        }



        // mes
        send_message.click(function(){
            console.log(message.val());
            
            socket.emit('new_message',{message: message.val()})
            message.val("")
            var d = message.get(0);
                d.scrollTop = d.scrollHeight;
        })

        message.keypress(function(e){
            if(e.which==13){
                console.log(message.val());
                socket.emit('new_message',{message: message.val()})
                message.val("")
                var d = message.get(0);
                d.scrollTop = d.scrollHeight;
            }
        })



        socket.on('new_message',(data)=>{
            console.log(data);
            text_box.append(`
                <p class="ms">${data.user_name}: ${data.message}</p>
            `)
        })
        
})