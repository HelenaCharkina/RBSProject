webix.ui({
    view: "window",
    id: "loginPopup",
    modal: true,
    fullscreen: true,
    position:"center",
    width:400,
    height:300,
    head:"Вход",
    body: {
        rows: [
            {},
            {
                borderless: true,
                view: "form",
                align: "center",
                id: "loginForm",
                elements: [

                    {
                        view: "text",
                        label:"Логин",
                        placeholder:"Логин",
                        id: "loginLog",
                        width: 300,
                        align: "center"
                    },
                    {
                        view: "text",
                        label:"Пароль",
                        placeholder:"Пароль",
                        id: "loginPass",
                        width: 300,
                        align: "center"
                    },
                    {
                        view: "button",
                        value: "Войти",
                        id: "loginButton",
                        width: 150,
                        align: "center"
                    }
                ]
            },
            {}
        ]
    }
}).show();

$$('loginButton').attachEvent('onItemClick', () => {
    let user = {
        Login: $$('loginLog').getValue(),
        Pass: $$('loginPass').getValue()
    }

    fetch('/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)})
        .then(res => res.json())
        .then(res => {
            if(res !== 0) {
                $$('loginPopup').hide()
                webix.message("Вход произведен")
            }else{
                webix.message("Неправильные данные")
            }
        })
})