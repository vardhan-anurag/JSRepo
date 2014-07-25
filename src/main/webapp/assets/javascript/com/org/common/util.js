var dicData = new HashTable();

//Position can be "head" or "body"
function includeJavaScriptFile(position,filePath,callback)
{
    if(filePath)
    {
        if(!position)
        {
            position = "head";
        }
        var domPosition = document.getElementsByTagName(position)[0];
        var script = document.createElement("script");
        script.setAttribute("type","text/javascript");
        script.setAttribute("src",filePath);
        // Then bind the event to the callback function.
        // There are several events for cross browser compatibility.
        if(callback)
        {
            script.onreadystatechange= function ()
            {
                if (this.readyState == "complete")
                {
                    callback();
                }
            };
            script.onload = callback;
        }
        domPosition.appendChild(script);
    }
}

function includeCssFile(filePath,callback)
{
    if(filePath)
    {
        var domPosition = document.getElementsByTagName("head")[0];
        var cssFile = document.createElement("link");
        cssFile.setAttribute("rel", "stylesheet");
        cssFile.setAttribute("type", "text/css");
        cssFile.setAttribute("href", filePath);
        // Then bind the event to the callback function.
        // There are several events for cross browser compatibility.
        if(callback)
        {
            cssFile.onreadystatechange= function ()
            {
                if (this.readyState == "complete")
                {
                    callback();
                }
            };
            cssFile.onload = callback;
        }
        domPosition.appendChild(cssFile);
    }
}

function $(elementId)
{
	if(elementId && elementId.length > 0)
	{
		return document.getElementById(elementId);
	}
	return null;
}

function createDiv(id,styleName)
{
    var div = document.createElement("div");  
    div.id = id;  
    if(styleName)
    {
        div.className = styleName;   
    }
    return div;
}

function setDivVisibility(id,isVisible)
{
    var div = document.getElementById(id);
    if(div)
    {
        if(isVisible)
        {
            div.style.display = "block";
        }
        else
        {
            div.style.display = "none";
        }
    }
}

function removeDiv(id)
{
    var div = document.getElementById(id);
    if (div)
    {
        var parent = div.parentNode;
        if(parent)
        {
            parent.removeChild(div);
        }
    }
}

function setData(elementId,propertyName,propertyValue)
{
    var element = $(elementId);
    //elementId.nodeType = 1 when parameter is html Element else its a property
    if(isElement(element) && propertyName && propertyName.length > 0)
    {
        /*if(element.hasAttribute(propertyName))
        {
            element.removeAttribute(propertyName);
        }
        element.setAttribute(propertyName,propertyValue);*/
        var key = elementId + "-" + propertyName;
        if(dicData.containsKey(key))
        {
            dicData.remove(key);
        }
        dicData.put(key,propertyValue);
    }
}

function getData(elementId,propertyName)
{
    var element = $(elementId);
    //elementId.nodeType = 1 when parameter is html Element else its a property
    if(element && element.nodeType === 1 && propertyName && propertyName.length > 0)
    {
        var key = elementId + "-" + propertyName;
        var value = null;
        if(dicData.containsKey(key))
        {
            value= dicData.get(key);
            if(isString(value))
            {
                try
                {                
                    value = value === "true" ? true :                    
                            value === "false" ? false :                    
                            value === "null" ? null :                                        
                            value;
                }
                catch(exception)
                {
                }
            }
        }
        return value;
    }
    return null;
}

function removeData(elementId,propertyName)
{
    var element = $(elementId);
    //elementId.nodeType = 1 when parameter is html Element else its a property
    if(element && element.nodeType === 1 && propertyName && propertyName.length > 0)
    {
        var key = elementId + "-" + propertyName;
        if(dicData.containsKey(key))
        {
            return dicData.remove(key);
        }
    }
    return undefined;
}

/*Utility Methods */
function getKeys(object) 
{
    var keys = [];
    for (var property in object)
    {
    	keys.push(property);
    }
    return keys;
}

function getValues(object)
{
	var values = [];
	for (var property in object)
	{
		values.push(object[property]);
	}
	return values;
}
   
function clone(object) 
{
    return Object.extend({ }, object);
}

function isElement(refElement)
{
    return !!(refElement && refElement.nodeType == 1);
}

function isArray(refArr) 
{
    return refArr != null && typeof refArr == "object" &&
      "splice" in refArr && "join" in refArr;
}

function isVariable(variableName) 
{
	return !isUndefined(window[variableName]); 
}

function callFunction(functionName) 
{
	if (typeof window[functionName] === "function") 
	{
	    window[functionName](); 
	}
}

function isFunction(refFunction) 
{
    if(refFunction && typeof refFunction == "function")
    {
    	return true;
    }
    return false;
}

function isString(object) 
{
    return typeof object == "string";
}

function isNumber(object) 
{
    return typeof object == "number";
}
  
function isUndefined(object) 
{
    return typeof object == "undefined";
}

/*
 * 1001 - function validation failure
 */
function throwException(exceptionCode,exceptionName,exceptionDetails)
{
    //alert("Error Occured with details code: " + exceptionCode + ",name: " + exceptionName + ",details: " + exceptionDetails);
    throw{code: exceptionCode,name: exceptionName,details: exceptionDetails};
}

//other values of navigator.appName is "Netscape","Opera"
//From IE 11 navigator.appName returns "Netscape" instead of "Microsoft Internet Explorer"
//and From IE 11 it follows standard API.
function isBrowserIE()
{
    if(navigator && navigator.appName && navigator.appName == "Microsoft Internet Explorer")
    {
        return true;
    }
    return false;
}

//returns the top y coordinate of the given div used while listening to scrolling events(vertical scrolling)
function scrollTop(div)
{
	 if(div)
	 {
	    return (div.scrollHeight - div.clientHeight);
	 }
}

//returns the top x coordinate of the given div used while listening to scrolling events(horizontal scrolling)
function scrollLeft(div)
{
	 if(div)
	 {
		 return (div.scrollWidth - div.clientWidth);
	 }
}

//adds Style class to an element's styles list 
function addStyleClass(divAlert,styleClass)
{
    if(divAlert && styleClass && styleClass.length > 0)
    {
        if(document.body.classList == undefined)
        {
            if(!hasStyleClass(divAlert,styleClass))
            {
                divAlert.className += " " + styleClass;
            }
        }
        else
        {
            if(!hasStyleClass(divAlert,styleClass))
            {
                divAlert.classList.add(styleClass);
            }
        }
    }
}

//returns true if a Style class is present in element's styles list
function hasStyleClass(divAlert,styleClass)
{
    if(divAlert && styleClass && styleClass.length > 0)
    {
        if(document.body.classList == undefined)
        {
            return (divAlert.className.indexOf(" " + styleClass) > -1);
        }
        else
        {
            return divAlert.classList.contains(styleClass);
        }
    }
    return false;
}

//removes Style class from an element's styles list
function removeStyleClass(divAlert,styleClass)
{
    if(divAlert && styleClass && styleClass.length > 0)
    {
        if(document.body.classList == undefined)
        {
            if(divAlert.className)
            {
                divAlert.className = divAlert.className.replace(" " + styleClass,"");
            }
        }
        else
        {
            divAlert.classList.remove(styleClass);
        }
    }
}

//returns event for all kind of browser
function getEvent(event)
{
	// IE is evil and doesn't pass the event object
	if (!event)
	{
		event = window.event;
	}
	return event;
}

//returns target for all kind of browser
function getTarget(event)
{
	// we assume we have a standards compliant browser, but check if we have IE
	event = getEvent(event);
	var target = event.target ? event.target : event.srcElement;
	return target;
}


//copied from http://www.broofa.com/Tools/Math.uuid.js
function getUniqueId() 
{
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    var uuid = new Array(36);
    var rnd=0;
    var r;
    
    for (var count = 0; count < 36; count++) 
    {
      if (count==8 || count==13 ||  count==18 || count==23) 
      {
        uuid[count] = '-';
      } 
      else if (count==14) 
      {
        uuid[count] = '4';
      } 
      else 
      {
        if (rnd <= 0x02) 
        {
        	rnd = 0x2000000 + (Math.random()*0x1000000) | 0;
        }
        r = rnd & 0xf;
        rnd = rnd >> 4;
        uuid[count] = chars[(count == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
    return uuid.join('');
 }






