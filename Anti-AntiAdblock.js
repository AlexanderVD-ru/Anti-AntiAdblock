// ==UserScript==
// @name         Anti Anti-Adblock
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  This script returns normal text If site show rotated text to adblock users 
// @author       AlexanderDV
// @match        http://*/*
// @grant        none
// ==/UserScript==
(function() 
{
    'use strict';

    //Script start working after this time in millis
    var timeoutOfScriptStart=1000;
    //If byClass==true, script finds first element with rotated transform, find elements with this class and change class to empty; Else script finds all elements with rotated tranform and change class to empty
    var byClass=false;
    //If clearStyle==true, script clear style of element
    var clearStyle=true;
    
    var equalWhitelist=['qaru.site'];
    var equalBlacklist=null;

    var containWhitelist=null;
    var containBlacklist=null;

    function scriptWorkInThisSite()
    {
        var v;
        if(equalWhitelist!=null)
        {
            for(v=0;v<equalWhitelist.length;v++)
            {   
                if(equalWhitelist[v]===document.location.hostname)
                {   
                    return true;
                }
            }
            return false;
        }

        if(equalBlacklist!=null)
        {
            for(v=0;v<equalBlacklist.length;v++)
            {   
                if(equalBlacklist[v]===document.location.hostname)
                {     
                    return false;
                }
            }
            return true;
        }

        if(containWhitelist!=null)
        {
            for(v=0;v<containWhitelist.length;v++)
            {   
                if(document.location.hostname.indexOf(containWhitelist[v])!==-1)
                {      
                    return true;
                }
            }
            return false;
        }

        if(containBlacklist!=null)
        {
            for(v=0;v<containBlacklist.length;v++)
            {    
                if(document.location.hostname.indexOf(containBlacklist[v])!==-1)
                {  
                    return false;
                }
            }
            return true;
        }

        return false;
    }

    //If site is anti-adblock, this script working
    if(scriptWorkInThisSite())
    {
        setTimeout(function()
        {
            //Find elements
            var vv=document.getElementsByTagName('*');
            for(var v=0;v<vv.length;v++)
            {
                //Test element transform to rotation
                if(window.getComputedStyle(vv[v]).transform.indexOf('-')!=-1)
                {
                    if(byClass)
                    {
                        //Gets elements by class
                        var cc=document.getElementsByClassName(vv[v].getAttribute('class'));
                        for(var c=0;c<cc.length;c++)
                        {
                            if(clearStyle)
                            {
                                cc[c].style.cssText='';
                            }
                            cc[c].setAttribute('class','');
                        }
                        break;
                    }
                    else
                    {
                        if(clearStyle)
                        {
                            vv[v].style.cssText='';
                        }
                        vv[v].setAttribute('class','');
                    }
                }
            }
        },timeoutOfScriptStart);
    }
})();




