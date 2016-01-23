function _openWindow(url, username, password, incognito, tab) {
    
    var secret = "dsaklhkh231231jhlkaasd";
    var eUsername = CryptoJS.TripleDES.encrypt(username, secret);
    var ePassword = CryptoJS.TripleDES.encrypt(password, secret);
    
    if (!tab) {
        chrome.windows.create({ 
            url: `${chrome.runtime.getURL('login.html')}?a=${ url }&b=${ePassword}&c=${eUsername}`,
            incognito: incognito 
        });    
    } else {
        chrome.tabs.create({ 
            url: `${chrome.runtime.getURL('login.html')}?a=${ url }&b=${ePassword}&c=${eUsername}`, 
        });
    }
}

export default {
    openWindow: function(callback, url, username, password, incognito = false, tab = false) {

        if (incognito) {
            chrome.extension.isAllowedIncognitoAccess(function(isAllowedAccess) {
                if (!isAllowedAccess) {                  
                    callback(false);
                } else {
                    _openWindow(url, username, password, incognito, tab);
                    callback(true);
                }
            });
        } else {
            _openWindow(url, username, password, incognito, tab);
            callback(true);
        }
    },
    
    gotoExtensionUrl: function() {
        chrome.tabs.create({
            url: 'chrome://extensions/?id=' + chrome.runtime.id
        });
    }
}