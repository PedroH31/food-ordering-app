import { menuArray } from './data.js'

const menu = document.getElementById("menu")
const orderDetails = document.getElementById("order-details")
const modal = document.getElementById("modal")
const thanksMessage = document.getElementById("thanks-message")
const cardDetailsForm = document.getElementById("card-details-form")
let totalPrice = 0

document.addEventListener("click", function(e){
        if (e.target.dataset.add){
            handleAddClick(e.target.dataset.add)
        }
        else if (e.target.dataset.remove){
            handleRemoveClick(e.target.dataset.remove)
        }
        else if (e.target.id === "complete-order-btn"){
            handleCompleteOrderClick()
        }
        
})

cardDetailsForm.addEventListener("submit", function(e){
    e.preventDefault()
    
    resetOrder()
    handlePayBtnClick()
    
    modal.style.display = "none"
    thanksMessage.style.display = "block"

})


function handleAddClick(itemId){
    const targetMenuItem = getTargetObj(itemId)
    totalPrice += targetMenuItem.price
    
    orderDetails.innerHTML += `
        <div class="order-description description" id="${targetMenuItem.id}">
        
            <h2 class="spacing item-title-font">${targetMenuItem.name}</h2>
            <button class="remove-btn" data-remove="${targetMenuItem.id}">REMOVE</button>
            <h3 class="price mid-font bold">$${targetMenuItem.price}</h3>  
            
        </div>
    `
       
    render()
 }
 
 
function handleRemoveClick(itemId){
    const targetMenuItem = getTargetObj(itemId)
    const item = document.getElementById(targetMenuItem.id)
    orderDetails.removeChild(item)
    totalPrice -= targetMenuItem.price
    render()
} 


function handleCompleteOrderClick(){
    modal.style.display = "flex"
}


function handlePayBtnClick(){
    const cardDetailsFormData = new FormData(cardDetailsForm)
    const fullName = cardDetailsFormData.get("fullName")
    
    thanksMessage.innerText = `
        Thanks, ${fullName}! Your order is on its way!
    `
    
    render()
}

function resetOrder(){
    orderDetails.innerHTML = `
        <h2 class="align-center order-spacing item-title-font">Your order</h2>
    `
    totalPrice = 0
}

function getMenuHtml(){
    let menuHtml = ``
    
     menuArray.forEach(function(item){
         menuHtml += `
            <div class="menu-item container-spacing">
                <img src="img/${item.name}.png" class="item-img">
                <div class="item">
                    <div class="item-description">
                        <h2 class="description spacing item-title-font">${item.name}</h2>
                        <p class="description spacing small-font">${item.ingredients}</p>
                        <p class="description spacing">$${item.price}</p>
                    </div>
                </div>
                <button class="add-btn" id="add-item" data-add="${item.id}">+</button>
            </div>
            `
     })
     document.getElementById("total-price-el").innerHTML = `$${totalPrice}`
     if (totalPrice > 0){
         document.getElementById("order-section").classList.remove("hidden")
         thanksMessage.style.display = "none"
     }
     else{
         document.getElementById("order-section").classList.add("hidden")

     }
    
    return menuHtml
}


function getTargetObj(itemId){
    const targetObj = menuArray.filter(function(item){
        return item.id === Number(itemId)
    })[0]
    
    return targetObj
}


function render(){
    document.getElementById("menu").innerHTML = getMenuHtml()

 }

render()