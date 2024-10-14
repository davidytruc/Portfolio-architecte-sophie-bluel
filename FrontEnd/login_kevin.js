async function login(login_data) {
    
    try {
        let datas = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json"
            },
            body: login_data
        })
        return datas.json()
    } catch(error) {
        console.log("error : ", error)
    }
}

function getLoginDatas() {
    return JSON.stringify({
        email: document.getElementById("email").value,       // sophie.bluel@test.tld
        password: document.getElementById("password").value  // S0phie
    })
}

function checkErrors(datas) {
    if(datas === null || datas === undefined) {
        throw new Error("attention, datas est vide")
    }
    if(datas.userId === null || datas.userId === undefined) {
        throw new Error("attention, datas.userId est vide")
    }
    if(datas.token === null || datas.token === undefined) {
        throw new Error("attention, datas.token est vide")
    }
}

function setStorage(datas) {
    checkErrors(datas)
    localStorage.setItem("monId:", datas.userId)
    localStorage.setItem("monToken:", datas.token)
}

async function setEventListener() {
    const formulaireLogin = document.querySelector("#login form")
    formulaireLogin.addEventListener("submit", async function (event) {
        event.preventDefault()
    
        let login_data = getLoginDatas()
        let datas = await login(login_data)
        setStorage(datas)
    })
}

setEventListener()







