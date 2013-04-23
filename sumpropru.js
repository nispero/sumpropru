exports.convert = function (sum) {
    var cifir_ru, sotN_ru, milion_ru, anDan_ru,
        scet, cifR, cfR, oboR;

    cifir_ru = ["од", "дв", "три", "четыр", "пят", "шест", "сем", "восем", "девят"];
    sotN_ru = ["сто", "двести", "триста", "четыреста", "пятьсот", "шестьсот", "семьмот", "восемьсот", "девятьсот"];
    milion_ru = ["триллион", "миллиард", "миллион", "тысяч"];
    anDan_ru = ["", "", "", "сорок", "", "", "", "", "девяносто"];
    scet = 4;
    cifR = '';
    cfR = '';
    oboR = [];
    if (sum > 999999999999999) {
        cfR = "Слишком большое число";
        return cfR;
    }
    while (sum / 1000 > 0) {
        yy = Math.floor(sum / 1000);
        delen = Math.round((sum / 1000 - yy) * 1000);
        sot = Math.floor(delen / 100) * 100;
        des = (Math.floor(delen - sot) > 9 ? Math.floor((delen - sot) / 10) * 10 : 0);
        ed = Math.floor(delen - sot) - Math.floor((delen - sot) / 10) * 10;
        forDes = (des / 10 == 2 ? 'а' : '')
        forEd = (ed == 1 ? 'ин' : (ed == 2 ? 'е' : ''));
        ffD = (ed > 4 ? 'ь' : (ed == 1 || scet < 3 ? (scet < 3 && ed < 2 ? 'ин' : (scet == 3 ? 'на' : (scet < 4 ? (ed == 2 ? 'а' : (ed == 4 ? 'е' : '')) : 'на'))) : (ed == 2 || ed == 4 ? 'е' : '')));
        forTys = (des / 10 == 1 ? (scet < 3 ? 'ов' : '') : (scet < 3 ? (ed == 1 ? '' : (ed > 1 && ed < 5 ? 'а' : 'ов')) : (ed == 1 ? 'а' : (ed > 1 && ed < 5 ? 'и' : ''))));
        oprSot = (sotN_ru[sot / 100 - 1] != null ? sotN_ru[sot / 100 - 1] : '');
        oprDes = ' ' + (cifir_ru[des / 10 - 1] != null ? (des / 10 == 1 ? '' : (des / 10 == 4 || des / 10 == 9 ? anDan_ru[des / 10 - 1] : (des / 10 == 2 || des / 10 == 3 ? cifir_ru[des / 10 - 1] + forDes + 'дцать' : cifir_ru[des / 10 - 1] + 'ьдесят'))) : '');
        oprEd = ' ' + (cifir_ru[ed - 1] != null ? cifir_ru[ed - 1] + (des / 10 == 1 ? forEd + 'надцать' : ffD) : (des == 10 ? 'десять' : ''));
        oprTys = ' ' + (milion_ru[scet] != null && delen > 0 ? milion_ru[scet] + forTys : '');
        cifR = (oprSot.length > 1 ? oprSot : '') +
            (oprDes.length > 1 ? oprDes : '') +
            (oprEd.length > 1 ? oprEd : '') +
            (oprTys.length > 1 ? oprTys : '');
        oboR[oboR.length] = cifR;
        sum = Math.floor(sum / 1000);
        scet -= 1;
        if (Math.floor(sum) < 1) {
            break;
        }
    }
    oboR.reverse();
    for (i = 0; i < oboR.length; i++) {
        cfR += oboR[i] + ' ';
    }
    (cfR.length < 3 ? cfR = 'ноль ' : cfR);

    return cfR.replace('  ', ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}