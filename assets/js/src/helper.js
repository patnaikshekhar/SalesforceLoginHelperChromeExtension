export default {
    openWindow: function(url, username, password, incognito = false) {
        
        var secret = "dsaklhkh231231jhlkaasd";
        var eUsername = CryptoJS.TripleDES.encrypt(username, secret);
        var ePassword = CryptoJS.TripleDES.encrypt(password, secret);
        
        chrome.windows.create({ 
            url: `login.html?a=${ url }&b=${ePassword}&c=${eUsername}`,
            incognito: incognito 
        });   
    }
}