// you have to use the keycodetoLetter mapping so the code
//u get maps to a letter, this is not ASCII on linux mint I had to
//use the xmodmap -pke and parse the content to get the map "keycodeToLetter"
const xmkl = require('xinput-mouse-key-logger');
const addToBuffer = require('./processKey');


// generated with the python script xmodmapParser.py if u use the xmkl on linux mint you have to use this map
const keycodeToLetters = { '22': 'BackSpace', '36': 'Return', '24': 'q', '25': 'w', '26': 'e', '27': 'r', '28': 't', '29': 'y', '30': 'u', '31': 'i', '32': 'o', '33': 'p', '38': 'a', '39': 's', '40': 'd', '41': 'f', '42': 'g', '43': 'h', '44': 'j', '45': 'k', '46': 'l', '52': 'z', '53': 'x', '54': 'c', '55': 'v', '56': 'b', '57': 'n', '58': 'm', '10': '1', '11': 'Up', '12': 'Prior', '13': 'Left', '14': 'Right', '15': 'End', '16': 'Down', '17': 'Next', '18': 'Insert', '19': 'Delete', '65': 'space', '66': 'Caps_Lock', '94': 'less', '79': 'KP_Home', '80': 'KP_Up', '81': 'KP_Prior', '82': 'KP_Subtract', '83': 'KP_Left', '84': 'KP_Begin', '85': 'KP_Right', '86': 'KP_Add', '87': 'KP_End', '88': 'KP_Down', '89': 'KP_Next', '90': 'KP_Insert', '91': 'KP_Delete' }

xmkl.xinput_get_all_devices_id(function (devices_id_list) {
    console.log('all', devices_id_list);
    var listener = new xmkl.xinput_listener(devices_id_list, function (xinput_events_list) {
        // console.log('events!', xinput_events_list);
        let keycode = xinput_events_list.keys_code[0];
        keycode = keycodeToLetters[keycode];
        if(keycode != undefined){addToBuffer(keycode);}
        else{console.log("Error: event not defined")}
        
    }, 0); // <- 0 is set, live mode is active!
});

