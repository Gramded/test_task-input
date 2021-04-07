export default class Validator {
    constructor (id) {
        this.inpId = id
        this.status = true
    }

    goValidator = function noValid () {
        let input = document.getElementById(this.inpId);
        this.checkerFun(input.validity.valid, false);
    }

    voidHere = function VoidHere () {
        this.checkerFun(input.value,'')
    }

    fulNumber = function fulNumber () {
        let input = document.getElementById(this.inpId);
        let inp = input.value.split('');
        this.checkerFun(inp[inp.length-1], '_')
    }

    checkerFun = function name (val ,arg) {
        let status = this.status;
        let input = document.getElementById(this.inpId);
        let err = document.createElement('div');
        err.id = `${this.inpId}-child`
        err.classList.add('input-err');
        err.innerText = 'Обязательное поле';
        status = true;
        input.setAttribute('data-status', '1')
        input.classList.remove('input-invalid')
        if (val === arg) {
            console.log(input.value);
            input.classList.add('input-invalid')
            console.log(input.parentElement.lastChild.id)
            input.parentElement.lastChild.id !== `${this.inpId}-child` ? input.parentElement.append(err) :  false;
            input.setAttribute('data-status', '0')
            status = false;
        } else if (document.getElementById(`${this.inpId}-child`) !== null) {
            let a = document.getElementById(`${this.inpId}-child`)
            input.parentElement.removeChild(a);
            status = true;
        }
        return status;
    }
}