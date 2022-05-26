let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")
var oldA = -1;
if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    renderLeads()
}
tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        renderLeads(myLeads)
     })
})
deleteBtn.addEventListener("click",function(){
    localStorage.clear()
    myLeads = []
    renderLeads()
})
inputBtn.addEventListener("click",function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    renderLeads();
})
function renderLeads(){
    let listItems =  ""
    for(let i = 1; i <myLeads.length; i++){
        listItems += `
        <li id="all">
            <a target='_blank' href='${myLeads[i]}'>
                ${myLeads[i]}
            </a>
            <button onclick=deleteOne() id="delete-one${[i]}">del</button>
        </li>`
    }
    ulEl.innerHTML = listItems
}
console.log(tabs)