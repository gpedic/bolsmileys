/*
    License: MIT
    Copyright (c) 2012
    http://opensource.org/licenses/MIT
*/

// ==UserScript==
// @name           BOL Return Of The Old Smileys
// @version        0.4.1
// @description    Dodatak vraca stare emotikone na BOL forum.
// @namespace      https://github.com/gpedic
// @match          http://www.bug.hr/forum/newpost/?topicid=*
// @match          http://www.bug.hr/forum/newpost/?editid=*
// @match          http://www.bug.hr/forum/newpost/?replyto=*
// @match          http://www.bug.hr/forum/newpost/?multiquote=*
// @author         drnde (http://www.bug.hr/forum/user/drnde/6251.aspx)
// ==/UserScript==

var EMO_PATH = '/d.tiny_mce/plugins/emotions/img/'
var EMOTICONS = [
    ['smiley-cool.gif', 'Cool', 'cool'],
    ['smiley-cry.gif', 'Plač', 'cry'],
    ['smiley-embarassed.gif', 'Sramim se', 'embarassed'],
    ['smiley-foot-in-mouth.gif', 'Izlanuo se', 'foot_in_mouth'],
    ['smiley-frown.gif', 'Mršti se', 'frown'],
    ['smiley-innocent.gif', 'Nevinašce', 'innocent'],
    ['smiley-kiss.gif', 'Poljubac', 'kiss'],
    ['smiley-laughing.gif', 'Smijeh', 'laughing'],
    ['smiley-money-mouth.gif', 'Bogataš', 'money_mouth'],
    ['smiley-sealed.gif', 'Šutim', 'sealed'],
    ['smiley-smile.gif', 'Osmijeh', 'smile'],
    ['smiley-surprised.gif', 'Iznenađen', 'surprised'],
    ['smiley-tongue-out.gif', 'Belji se', 'tongue_out'],
    ['smiley-undecided.gif', 'Neodlučan', 'undecided'],
    ['smiley-wink.gif', 'Namigiva', 'wink'],
    ['smiley-yell.gif', 'Viče', 'yell'],
    ['smiley-cool.png', 'Cool', 'cool'],
    ['smiley-cry.png', 'Plač', 'cry'],
    ['smiley-embarassed.png', 'Sramim se', 'embarassed'],
    ['smiley-foot-in-mouth.png', 'Izlanuo se', 'foot_in_mouth'],
    ['smiley-frown.png', 'Mršti se', 'frown'],
    ['smiley-innocent.png', 'Nevinašce', 'innocent'],
    ['smiley-kiss.png', 'Poljubac', 'kiss'],
    ['smiley-laughing.png', 'Smijeh', 'laughing'],
    ['smiley-money-mouth.png', 'Bogataš', 'money_mouth'],
    ['smiley-sealed.png', 'Šutim', 'sealed'],
    ['smiley-smile.png', 'Osmijeh', 'smile'],
    ['smiley-surprised.png', 'Iznenađen', 'surprised'],
    ['smiley-tongue-out.png', 'Belji se', 'tongue_out'],
    ['smiley-undecided.png', 'Neodlučan', 'undecided'],
    ['smiley-wink.png', 'Namigiva', 'wink'],
    ['smiley-yell.png', 'Viče', 'yell'],
    ['tp3.gif','Spava',''],
    ['tr1.gif','Prdi',''],
    ['tr7.gif','Belji se','tongue_out'],
    ['tr8.gif','Nevinašce','innocent'],
    ['ts1.gif','Ponosan',''],
    ['ts9.gif','Iznenađen','surprised'],
    ['tt1.gif','Smijeh','laughing'],
    ['tt3.gif','Osmijeh','smile'],
    ['tp7.gif','Prase',''],
    ['z_signs-and-flags006.gif','Ban?','']
];


var imgCacheArray = [];
for(var idx = 0; idx < EMOTICONS.length; idx++) {
    imgCacheArray[idx] = new Image();
    imgCacheArray[idx].src = EMO_PATH + EMOTICONS[idx][0];
}


function tdTemplate(smileyName) {
    return '<td><a style="text-align: center;" href="#" ' +
        'data-mce-url="/d.tiny_mce/plugins/emotions/img/'+smileyName+'" tabindex="-1" title="">' +
        '<img style="padding: 3px 0;" src="/d.tiny_mce/plugins/emotions/img/'+smileyName+'" "="">' +
    '</a></td>';
}

function trTemplate(columns) {
    return '<tr>' + columns + '</tr>';
}

function buildSmileys() {
    var rows = "";
    var columnsTemp = "";
    for (var idx = 1;  idx <= EMOTICONS.length; idx++) {
        columnsTemp += tdTemplate(EMOTICONS[idx-1][0]);
        if ((idx % 8 === 0) || (idx === EMOTICONS.length)) {
            rows += trTemplate(columnsTemp);
            columnsTemp = "";
        }
    }
    return rows;
}
var smileysHTML = buildSmileys();

function loadSmileys() {

    var smileyDivNode = document.evaluate(
        '//*[@id="mceu_32"]/table/tbody', 
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    var smileyDivEl = smileyDivNode.singleNodeValue;

    if (!!smileyDivEl) {
        smileyDivEl.innerHTML = smileyDivEl.innerHTML + smileysHTML;
    }

    var paragraphCount = document.evaluate(
        'count(//*[@id="mceu_32"]/table/tbody/tr)', 
        document, null, XPathResult.ANY_TYPE, null);

    if (paragraphCount.numberValue < 7) {
        window.setTimeout(loadSmileys, 250);
    }
}
loadSmileys();

