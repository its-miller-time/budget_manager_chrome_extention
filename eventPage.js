const contextMenuItem = {
    "id" : "contextMenuBtn",
    "title" : "SpendMoney",
    "contexts" : ["selection"]
};
chrome.contextMenus.create(contextMenuItem)

function isInt(value){
    return !isNaN(value)&&
            parseInt(Number(value)) == value &&
            !isNaN(parseInt(value,10));
}

chrome.contextMenus.onClicked.addListener((data)=>{
    if(data.menuItemId = 'contextMenuBtn' && data.selectionText){
        if(isInt(data.selectionText)){
            chrome.storage.sync.get(['total','limit'],(budget)=>{
                let newTotal = 0;
                if(budget.total){
                    newTotal += parseInt(budget.total)
                }
            newTotal += parseInt(data.selectionText)
        })
            chrome.storage.sync.set({'total':newTotal}, ()=>{
                if(newTotal >= budget.limit){
                    const notifOptions = {
                        type: 'basic',
                        iconUrl: 'piggy32.png',
                        title: 'Limit Reached',
                        message: "Budget limit reached"
                    };
                    chrome.notifications.create('limitNotif',notifOptions);
                }
            
            })
        }
    }

    chrome.storage.onChanged.addListener((changes,storageName)=>{
        chrome.browserACtion.setBadgeText({'text': changes.total.newValue.toString()})
    })

})