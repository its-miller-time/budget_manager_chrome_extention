function main(){
    console.log('is this thing on?')
    const saveLimitBtn = document.querySelector('#saveLimit');
    const resetTotalBtn = document.querySelector('#restTotal');
    chrome.storage.sync.get('limit',(budget)=>{
        document.querySelector('#limit').value = budget.limit
        console.log('budget')
    })

    resetTotalBtn.addEventListener('click', ()=>{
        chrome.storage.sync.set({'total':0}, ()=>{
            const notifOptions = {
                type: 'basic',
                iconUrl: 'piggy32.png',
                title: 'Total reset',
                message: "Total has been reset to 0"
            }
            chrome.notifications.create('limitNotif',notifOptions);
            console.log('reset button clicked')
        })
    })

    saveLimitBtn.addEventListener('click',()=>{
        let limit = document.querySelector('#limit').value
        chrome.storage.sync.set({'limit' : limit}, ()=>{
            close();
        })
    })
}

main()