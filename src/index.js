import Inputmask from "inputmask";
import Validator from "./scripts/validator";

Inputmask({'mask': '+375 (99) 999-99-99'}).mask(document.querySelectorAll('[data-tel="true"]'))

window.openPopUp = function openPopUp () {
    let parrentButton = event.target.getAttribute("data-parrent");
    let childBlock = document.getElementById(parrentButton);
    console.log(document.getElementsByClassName('active-pop-up')[0])
    if ((document.getElementsByClassName('active-pop-up')[0] !== undefined)) {
        if ((parrentButton !== document.getElementsByClassName('active-pop-up')[0].id)) {
            document.getElementsByClassName('active-pop-up')[0].classList.remove('active-pop-up');
        }
    }
    childBlock.classList.toggle("active-pop-up")
}

window.isValid = function isValid () {
    let input = new Validator(event.target.id);
    input.goValidator();
}

window.saveInfo = function saveInfo () {
    let status = true;
    let inputs = document.querySelectorAll('[data-name="save"]');
    inputs.forEach((el) => {
        if (el.getAttribute('data-status') !== '1') {
            el.classList.add('input-invalid');
            console.log('err'+ ' ' + el.id)
            status = false
        }
    })
    if (status === true) {
        inputs.forEach(el => {
            el.value = '';
        })
        openPopUp();
        serverGetData('suc')
    } else {
        openPopUp();
        serverGetData('nosuc')
    }

}

window.phoneFun = function phoneNum () {
    let input = new Validator(event.target.id);
    console.log(input);
    input.fulNumber();
}

window.serverGetData = function serverGetData(param) {
    if (param === 'suc') {
        let resp2 = new Promise (
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(fetch('http://localhost:60788/untitled2/src/json-test/ansver-1.json').then((result) => {
                        return result.json()
                    }));
                }, 100);
            }
        );
        Promise.all([
            resp2
        ]).then((data) => {addInfoOnPage(data[0].status)});
    } else if (param === 'nosuc') {
        let resp1 = new Promise (
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(fetch('http://localhost:60788/untitled2/src/json-test/answer-2.json').then((result) => {
                        return result.json()
                    }));
                }, 100);
            }
        );
        Promise.all([
            resp1
        ]).then((data) => {addInfoOnPage(data[0].status)});
    } 

}

window.addInfoOnPage = function (arg) {
    if (arg === "success") {
        document.getElementById(arg).classList.add('active-pop-up')
        setTimeout(() => {document.getElementById(arg).classList.remove('active-pop-up')}, 5000)
    } else if (arg === 'error') {
        console.log(document.getElementById(arg));
        document.getElementById(arg).classList.add('active-pop-up')
        setTimeout(() => {document.getElementById(arg).classList.remove('active-pop-up')}, 5000)
    }
}
