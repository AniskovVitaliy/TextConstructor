let elements = document.querySelectorAll('.text-editor__left-block-block.type-tag .text-editor__button');
let elements2 = document.querySelectorAll('.text-editor__left-block-block.style-color .text-editor__button');
let elements3 = document.querySelectorAll('.text-editor__left-block-block.style-text .text-editor__button');
let elements4 = document.querySelectorAll('.text-editor__left-block-block.style-text-decoration .text-editor__button');
let active_filed = null;

elements.forEach((el) => {
    el.addEventListener('click', function (){
        createElement(this)
    })
})

elements2.forEach((el) => {
    el.addEventListener('click', function (){
        createParams2(this)
    })
})

function createParams2(el){
    if(active_filed){
        if(!active_filed.getAttribute('data-param').match(/\*color:[\d\w]+/gi)){
            active_filed.setAttribute('data-param', active_filed.getAttribute('data-param') + '*' + el.getAttribute('data-param'))
        }else{
            active_filed.setAttribute('data-param',active_filed.getAttribute('data-param').replace(/\*(color:[\d\w]+)/, '*' + el.getAttribute('data-param')))
        }
    }
}

elements3.forEach((el) => {
    el.addEventListener('click', function (){
        createParams3(this)
    })
})

function createParams3(el){
    if(active_filed){
        if(!active_filed.getAttribute('data-param').match(/\*font-style:[\d\w]+/gi)){
            active_filed.setAttribute('data-param', active_filed.getAttribute('data-param') + '*' + el.getAttribute('data-param'))
        }else{
            active_filed.setAttribute('data-param',active_filed.getAttribute('data-param').replace(/\*(font-style:[\d\w]+)/, '*' + el.getAttribute('data-param')))
        }
    }
}

elements4.forEach((el) => {
    el.addEventListener('click', function (){
        createParams4(this)
    })
})

function createParams4(el){
    if(active_filed){
        if(!active_filed.getAttribute('data-param').match(/\*text-decoration:[\d\w\-]+/gi)){
            active_filed.setAttribute('data-param', active_filed.getAttribute('data-param') + '*' + el.getAttribute('data-param'))
        }else{
            active_filed.setAttribute('data-param',active_filed.getAttribute('data-param').replace(/\*(text-decoration:[\d\w\-]+)/, '*' + el.getAttribute('data-param')))
        }
    }
}

function createElement(el){

    if(active_filed !== null){
        active_filed.classList.remove('active')
    }

    let newElement = document.createElement('div');
    newElement.setAttribute('data-param', el.getAttribute('data-param'))
    newElement.className = 'text-editor__el active';
    newElement.innerHTML = `<div class="text-editor__el-blocks">
                                <div class="text-editor__block-active">
                                    <div class="text-editor__el-name">${el.innerHTML}</div>
                                    <div class="text-editor__el-value" contenteditable="true"></div>
                                </div>
                            </div>`;

    if(active_filed !== null){
        active_filed.after(newElement)
    }else{
        document.querySelector('.text-editor__center-block .text-editor__center-content').append(newElement)
    }

    active_filed = newElement;
    active_filed.querySelector('.text-editor__el-value').focus()

    newElement.addEventListener('click', selectField)
}

function selectField(){
    if(event.ctrlKey && event.altKey){
        if(active_filed !== null) active_filed.classList.remove('active');
        active_filed = null;
        this.remove();
    }else{
        if(active_filed !== null) active_filed.classList.remove('active');
        this.classList.add('active')
        active_filed = this;
        this.querySelector('.text-editor__el-value').focus();
    }
}

document.querySelector('.text-editor__center-button').addEventListener('click',function () {

    document.querySelector('.text-editor__result').innerHTML = '';

    let results = document.querySelectorAll('.text-editor__el');

    results.forEach((result) => {

        let params = result.getAttribute('data-param'),
            arrParams = params.split('*'),
            value = result.querySelector('.text-editor__el-value').innerHTML

        let el = document.createElement(`${arrParams[0]}`);
            el.innerHTML = value;

        arrParams.shift()
        if(arrParams.length !== 0){
            el.setAttribute('style', arrParams.join(';'))
        }

        document.querySelector('.text-editor__result').append(el)

    })

})