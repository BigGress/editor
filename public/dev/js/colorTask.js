

(function(root){
    /**
     * Created by Administrator on 2016/1/11.
     */
    var element = {
        byId : function(tagId){
            return document.getElementById(tagId.replace("#",""));
        },
        byClass : function(tagClass,par){
            var result = [] , d = par || document;
            if(d.querySelectorAll){
                result = d.querySelectorAll(tagClass);
                return result;
            }
            else{
                var allEle = this.byTag("*",d);
                for(var i=0 ; i<allEle.length ; i++){
                    if(this.hasClass(allEle[i],tagClass.replace(".",""))){
                        result.push(allEle[i]);
                    }
                }
                return result;
            }
        },
        byTag : function(tagName,par){
            return (par || document).getElementsByTagName(tagName);
        },
        byName : function(attrName,par){
            return (par || document).getElementsByName(attrName);
        }
    }
    var eventUnit = {
        addEvent : function(ele,type,handler){
            if(ele.addEventListener){
                ele.addEventListener(type,handler,false);
            }
            else if(ele.attachEvent){
                ele.attachEvent("on"+type,function(){
                    handler.call(ele,arguments);
                });
            }
            else{
                ele["on"+type]=handler;
            }
        }
    }
    var addStyle = function(str){
        var styleEle = element.byId("color-panle-styleSheet");
        if(styleEle) return ;
        styleEle = document.createElement("style");
        styleEle.type = "text/css";
        styleEle.id = "color-panle-styleSheet";
        if(!+[1,]){
            styleEle.styleSheet.cssText = str;
        }
        else{
            styleEle.innerHTML = str;
        }
        element.byTag("head")[0].appendChild(styleEle);
    }

    var colorTake = function(){
        return function() {
            this.showColorPanle.apply(this, arguments);
        }
    }();

    colorTake.prototype = {
        colorBaseArr : ["0","3","6","9","c","f"],
        htmlStr : '',
        // 容器拼接
        joinStr : function(){
            var t = this;
            t.htmlStr = '';
            t.htmlStr += "<div class='color-read'>";
            t.htmlStr += "<span class='color-val'></span>";
            t.htmlStr += "<span class='color-show'></span>";
            t.htmlStr += "</div>";
            t.htmlStr += "<div class='color-list'>";

            var createColor = function(baseColor){
                var colorLiStr = '';
                for(var j=0 ; j<6 ; j++){
                    for(var k=0 ; k<6 ; k++){
                        var tempColor = baseColor + baseColor + t.colorBaseArr[k] + t.colorBaseArr[k] + t.colorBaseArr[j] + t.colorBaseArr[j] ;
                        colorLiStr += "<li unselectable='on' data-bg='"+tempColor+"' style='background:#" + tempColor + ";' ></li>";
                    }
                }
                t.htmlStr +="<ul data-base='"+baseColor+"'>" + colorLiStr + "</ul>";
            }

            for(var i=0 , len=t.colorBaseArr.length; i<len ; i++){
                createColor(t.colorBaseArr[i]);
            }

            t.htmlStr += "</div>";
        },
        showColorPanle : function(showColorPanleEle,getColorPanleColor,callback){

            this.joinStr();

            var colorPanle = document.createElement("div"),
                tempColorPanleStyle = "";

            colorPanle.className = "color-panle";
            colorPanle.innerHTML = this.htmlStr;

            tempColorPanleStyle += ".color-panle{display:none;width:199px;background:#fff;}.color-list{border-top:1px solid #000;border-left:1px solid #000;}";
            tempColorPanleStyle += ".color-list ul{float:left;width:66px;height:66px;margin:0;padding:0;}.color-list li{list-style:none;float:left;width:10px;height:10px;border-bottom:1px solid #000;border-right:1px solid #000;overflow:hidden;cursor:pointer;}";
            tempColorPanleStyle += ".color-read{padding-bottom:5px;height:15px;}.color-read .color-val{float:right;}";
            tempColorPanleStyle += ".color-read .color-show{float:left;width:50px;height:15px;border:1px solid #000;}";
            addStyle(tempColorPanleStyle);

            eventUnit.addEvent(showColorPanleEle,"click",function(){
                document.body.appendChild(colorPanle);

                var colorPanleTempStyle = "position:absolute;left:" + showColorPanleEle.offsetLeft + "px;top:" +
                        (50 + showColorPanleEle.offsetTop) + "px;display:block",
                    colorList = element.byClass(".color-list",colorPanle)[0],
                    colorVal = element.byClass(".color-val",colorPanle)[0],
                    colorShow = element.byClass(".color-show",colorPanle)[0];

                colorPanle.style.cssText = colorPanleTempStyle;

                var colorRead = function(eventType,e){
                    return function (e){
                        var e=window.event || e,
                            target= e.target || e.srcElement;
                        if(target.nodeName.toLowerCase()==="li"){
                            switch (eventType){
                                case  "mouseover" :
                                    colorShow.style.background = colorVal.innerHTML = "#" + target.getAttribute("data-bg");
                                    break;
                                case "click" :
                                    if(!getColorPanleColor){
                                        showColorPanleEle.value = "#" + target.getAttribute("data-bg");
                                    }
                                    else{
                                        getColorPanleColor.value = "#" + target.getAttribute("data-bg");
                                    }
                                    colorPanle.style.display = "none";
                                    callback && callback();
                                    break;
                                default:
                                    return;
                            }
                        }
                    }
                }

                eventUnit.addEvent(colorList,"mouseover",colorRead("mouseover"));
                eventUnit.addEvent(colorList,"click",colorRead("click"));
                colorRead = null;
            })
        }
    }

    root.colorTake = colorTake;

})(window)