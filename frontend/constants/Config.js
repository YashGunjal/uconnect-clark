import Config from './../web/config.web.json';

export default function getConfig() {
    if(window.GLOBAL_WEB_CONFIG) {
        return window.GLOBAL_WEB_CONFIG;
    }
    else {
        return Config;
    }
}