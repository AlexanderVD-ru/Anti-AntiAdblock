// ==UserScript==
// @name         DuolingoPuntoSwitcher
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  changes letters to russian if it needs. Note: please and sentence by space before press enter and don't use upper case if you don't want to have small errors
// @author       AlexanderDV-ru
// @match        https://www.duolingo.com/*
// @icon         https://www.duolingo.com/
// @grant        none
// ==/UserScript==

setInterval(function() {

    var map = {
        ru: [ "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю" ],
        en: [ "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "z", "x", "c", "v", "b", "n", "m", ",", "." ]
    };

    var ru,en
    let areas=document.getElementsByTagName("textarea"),area
    for(let i=0;i<areas.length;i++)
        if(areas[i].getAttribute("data-test")=="challenge-translate-input")
            area=areas[i]
    let spans=document.getElementsByTagName("span"),span
    for(let i=0;i<spans.length;i++)
        if(spans[i].getAttribute("data-test")=="hint-token")
            span=spans[i]
    if(!area||!span)
        return
    let hasRu
    for(let l of map.ru)
        if(span.innerText.indexOf(l)!=-1)
            hasRu=true
    if(hasRu)
        en=area
    else ru=area

    if(ru){
        ru.__lang = [ 'ru', 'en' ];
        ru.onkeydown=setInputText;
    }
    if(en){
        en.__lang = [ 'en', 'ru' ];
        en.onkeydown=setInputText;
    }

    function setInputText ( e ) {
        var k = e.key;
        let curMap=map[this.__lang[1]]
        let i=curMap.indexOf(k),lc
        if(i==-1&&curMap.indexOf(k.toLowerCase())!=-1)
        {
            i=curMap.indexOf(k.toLowerCase())
            lc=true
        }
        let start = this.selectionStart, end = this.selectionEnd
        console.log(i,lc,k,e,start,end)
        if(k=="Enter")
        {
            console.log("yes")
            this.setRangeText("gbdtn vbh",0,10);
        }
        if (i !== -1 ) {
            //e.preventDefault();
            let th=this
            //th.setRangeText(lc?map[th.__lang[0]][i].toUpperCase():map[th.__lang[0]][i], start, end);
            setTimeout(()=>{
                //th.setRangeText("", end, end+1 );
                th.setRangeText(lc?map[th.__lang[0]][i].toUpperCase():map[th.__lang[0]][i], start, end+1);
                th.setSelectionRange( start + 1, start + 1 );
            },10)

        }
    }
    // Your code here...
},500);
