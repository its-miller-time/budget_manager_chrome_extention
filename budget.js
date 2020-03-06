// $(function(){
//     $('#spendAmount').click(function(){
//         chrome.storage.sync.get('total',function(budget){
//             let newTotal = 0;
//             if(budget.total){
//                 newTotal += parseInt(budget.total);
//             }
//             let amount = $('#amount').val();
//             if(amount){
//                 newTotal += parseInt(amount)
//             }
//             chrome.storage.sync.set({'total':newTotal});
//             $('#total').text(newTotal);
//             $('#amount').val('');
//         })
//     })
// })


// so much jquery

// i see you saq
// sup sin city
// Turkeynator

// Nickle for every time I see a curly bracket
//This is the extra comment

/*
const el = document.createElement('div')
el.onClick = () => doSomething(); // ?? been forever
*/
function main(){
    chrome.storage.sync.get(['limit','total'], (budget)=>{
        document.querySelector('#total').innerText = budget.total
        document.querySelector('#limit').innerText = budget.limit
    })

    const submitBtn = document.querySelector('#spendAmount')
    submitBtn.addEventListener('click', ()=> {
        console.log('submit butn clicked')
        chrome.storage.sync.get(['limit','total'], (budget)=>{
            let newTotal = 0;
            if(budget.total){
                newTotal += parseInt(budget.total);
            }
            let amount = document.querySelector('#amount').value
            if(amount){
                newTotal += parseInt(amount)
            }
            chrome.storage.sync.set({'total': newTotal},()=>{
                if(amount && newTotal >= budget.total){
                    console.log("limit exceeded")
                    const notifOptions = {
                        type: 'basic',
                        iconUrl: 'piggy32.png',
                        title: 'Limit Reached',
                        message: "Budget limit reached"
                    };
                    chrome.notifications.create('limitNotif',notifOptions);
                }
            });
            document.querySelector('#total').innerText = newTotal;
            document.querySelector('#amount').value = '';
        })
    })
}

main()