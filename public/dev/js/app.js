var $ = (el)=>{
    return document.querySelector(el)
};
var btnsEvent = {
    //加粗
    addBold(event){
        btnsEvent.addClassName.apply(this);
        return document.execCommand('bold',false,null)
    },
    //斜体
    addItalic(){
        btnsEvent.addClassName.apply(this);
        return document.execCommand('italic',false,null)
    },
    //添加下滑线
    addUnderline(){
        btnsEvent.addClassName.apply(this);
        return document.execCommand('underline',false,null)
    },
    //添加删除线
    addStrikethrought(){
        btnsEvent.addClassName.apply(this);
        return document.execCommand('strikethrough',false,null)
    },
    //改变字体大小
    changeFontsize(){
        var allLis = document.querySelectorAll('.fontSize li');

        if(this.childNodes[1].className.match(/show/)){
            this.childNodes[1].className = this.childNodes[1].className.split(' show')[0]
        }else{
            this.childNodes[1].className +=' show'
            for(let i=0;i<allLis.length;i++){
                allLis[i].onclick = function(){
                    document.execCommand('fontsize',false,this.innerText);
                }
            }
        }
        btnsEvent.addClassName.apply(this);
    },
    //居左
    Justifyleft(){
        btnsEvent.addClassName.apply(this);
        return document.execCommand('justifyleft',false,null)
    },
    //居中
    Justifycenter(){
        btnsEvent.addClassName.apply(this);
        return document.execCommand('justifycenter',false,null)
    },
    //居右
    Justifyright(){
        btnsEvent.addClassName.apply(this);
        return document.execCommand('justifyright',false,null)
    },
    //左缩进
    Indent(){
        btnsEvent.addClassName.apply(this);
        return document.execCommand('indent',false,null)
    },
    //右缩进
    Outdent(){
        btnsEvent.addClassName.apply(this);
        return document.execCommand('outdent',false,null)
    },
    //插入有序列表
    Insertorderedlist(){
        btnsEvent.addClassName.apply(this);
        return document.execCommand('insertorderedlist',false,null)
    },
    //插入无序列表
    Insertunorderedlist(){
        btnsEvent.addClassName.apply(this);
        return document.execCommand('insertunorderedlist',false,null)
    },
    //撤销
    Undo(){
        btnsEvent.addClassName.apply(this);
        return document.execCommand('undo',false,null)
    },
    //重复
    Redo(){
        btnsEvent.addClassName.apply(this);
        return document.execCommand('redo',false,null)
    },
    //清楚文件格式
    removeFormat(){
        btnsEvent.addClassName.apply(this);
        return document.execCommand('removeformat',false,null)
    },
    //改变字体颜色
    changeColor(event){
        btnsEvent.addClassName.apply(this);
        $('.colorBox').className +=' show';

        $('.configColor').addEventListener('click',function(){
            if(this.previousSibling.previousSibling.value.match(/#/)){
                this.parentNode.addEventListener('animationend', function() {
                    if(this.className.match(/hide/)){
                        this.className = this.className.split(' ')[0];
                    }
                });
                this.parentNode.addEventListener('webkitAnimationEnd', function() {
                    if(this.className.match(/hide/)){
                        this.className = this.className.split(' ')[0];
                    }
                });
                this.parentNode.className+=' hide';
                console.log(this.previousSibling.previousSibling.value)
                return document.execCommand('forecolor',false,(this.previousSibling.previousSibling.value).toString());
            }
        })
    },
    //插入图片
    addPicture(){
        var test = '1123';
    },
    //增加点击事件
    addClassName:function(){
        if(this.className.match(/on/)){
            this.className = this.className.split(' on')[0]
            //this.className.replace(/on$/,'')
        }else{
            this.className+=' on';
        }
    }
}
var addBtn = function(option){
    var arrBtn = {
        addBold:`<button>B</button>`,
        addItalic:`<button>/</button>`,
        addUnderline:`<button class="underline">U</button>`,
        addStrikethrought:`<button class="strikethrough">ABC</button>`,
        changeFontsize:`<button>字体大小 <ul class="fontSize"><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li></ul></button>`,
        Justifyleft:`<button>居左</button>`,
        Justifycenter:`<button>居中</button>`,
        Justifyright:`<button>居右</button>`,
        Indent:`<button>左缩进</button>`,
        Outdent:`<button>右缩进</button>`,
        Insertorderedlist:`<button>有序</button>`,
        Insertunorderedlist:`<button>无序</button>`,
        Undo:`<button>撤销</button>`,
        Redo:`<button>重复</button>`,
        removeFormat:`<button>清除格式</button>`,
        changeColor:`<button class="colorBtn">改变颜色
            <div class="colorBox">
                <span>请输入颜色</span>
                <input type="text" class="colorInput"/>
                <div class="configColor">确认</div>
            </div>
        </button>`,
        addPicture:`<button><label for="picture">添加图片 <input type="file" style="display: none;" onchange="onchangeImage(this)" id="picture"/></label></button>`
    }

    if(option==='all'){
        for(var i in arrBtn){
            $('header').innerHTML+=arrBtn[i];
        }
        var x=0;
        var btns = document.querySelectorAll('button');
        for(var a in btnsEvent){
            if(arrBtn.hasOwnProperty(a)){
                try{
                    btns[x].addEventListener('click',btnsEvent[a]);
                }catch(e){
                    console.log(a)
                    console.error(btns[x])
                }
                if((btns[x]).toString().match(/Button/)){
                    btns[x].addEventListener('click',btnsEvent[a]);
                }
                x++;
            }
        }
    }
}
window.onload = function(){
   var editor = startEditor('.editor');
    editor.style.height = window.innerHeight*0.2+'px';
    addBtn('all');
}

function startEditor(el){
    $(el).style.display = 'none';

    var htmls = `
        <div class="editorDiv">
            <header>

            </header>
            <div class="editorBody" contenteditable="true"></div>
        </div>
    `

    //var newEditor = document.createElement('div');
    //newEditor.className = 'editor';
    //var Header = document.createElement('header');
    //newEditor.appendChild(Header);
    //var editorBody = document.createElement('div');
    //editorBody.className = 'editorBody';
    //editorBody.setAttribute('contenteditable','true');
    //newEditor.appendChild(editorBody);
    $(el).parentNode.innerHTML += htmls;

    return $('.editorDiv')
}
var imgtest= null;

function onchangeImage(url){
    var file = url.files[0];
    var reader = new FileReader();

    reader.onloadend = function(){
        var img = new Image();
        img.src = reader.result;
        $('.editorBody').appendChild(img);
    };
    reader.readAsDataURL(file);


    //用拖拽来放大缩小图片...但是有bug...插入图片后接着输入文字会导致
    //var file = url.files[0];
    //console.log(file)
    //var divBox = document.createElement('div'),
    //    divRightBottom = document.createElement('div'),
    //    br1 = document.createElement('br'),
    //    br2 = document.createElement('br');
    //$('.editorBody').appendChild(br1);
    //divBox.className = 'imgBox';
    //divRightBottom.className = 'imgBoxRB';
    //divRightBottom.setAttribute('onmousedown','dragFn(this)');
    //var img = document.createElement('img');
    //var reader = new FileReader();
    //divBox.appendChild(img);
    //divBox.appendChild(divRightBottom);
    //$('.editorBody').appendChild(divBox);
    //$('.editorBody').appendChild(br2);
    //reader.onloadend = function(){
    //    img.src = reader.result;
    //};
    //reader.readAsDataURL(file);
}

function dragFn(el){
    console.dir(el)
    document.onmousemove = function(event){
        var width = event.x;
        var height = event.y;
        el.parentNode.style.width = width+'px';
    }
    document.onmouseup = function(event){
        console.log(this)
        document.onmousemove = null;
        document.onmouseup = null;
    }
}