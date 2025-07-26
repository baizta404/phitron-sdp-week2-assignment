let cart = [];
const searchBox = document.getElementById("search-box");
const searchBtn = document.getElementById("search-btn");
const menuContainer = document.getElementById("menu-container");
const cartContainer = document.getElementById("cart-container");
const modalContent = document.getElementById("modalcontent");
const tableBody = document.getElementById("table-body");
const cartCount = document.getElementById("cart-count");

const fetchItems = async(nam)=>{
    const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nam}`);
    const items = await res.json();
    // console.log(items.drinks)
    if(!items.drinks){
        menuContainer.innerHTML = `
        <div class="col-12 mt-5">
            <h1 class="text-center"><i class="bi bi-database-x"></i></h1>
            <h1 class="text-center">Your Searched Drink Is Not Found</h1>
        </div>
        `;
        return;
    }
    displayItems((items.drinks));
}


const displayItems = (items) =>{
    menuContainer.innerHTML=``;
    items.forEach(item => {
        // console.log(item)
        const isInCart = cart.find(e=>e.idDrink === item.idDrink) 
        //card banaite hoibo then eidire card a dite hoibo
        const itemCard = document.createElement('div');
        itemCard.className = "col-md-4 mb-3";
        itemCard.innerHTML =`
        <div class="card shadow-sm">
            <img src="${item.strDrinkThumb}" class="card-img-top img-card" alt="item image">
            <div class="card-body">
                <h5 class="card-title"><span class="fw-bold">Name :</span> ${item.strDrink}</h5>
                <p class=""><span class="fw-bold">Category :</span> ${item.strCategory}</p>
                <p class="card-text"><span class="fw-bold">Instructions :</span> ${item.strInstructions.slice(0,15)}...</p>
                <div class="d-flex justify-content-around">
                    <button class="btn btn-cart ${isInCart?'btn-secondary disabled':'btn-outline-secondary'}" type="button" data-id="${item.idDrink}">${isInCart ? 'Added to Group' : 'Add to Group'}</button>
                    <button class="btn btn-details btn-outline-secondary" type="button" data-id="${item.idDrink}">Details</button>
                </div>
            </div>
        </div>
        `;
        menuContainer.append(itemCard);

        //details er btn er kam
        itemCard.querySelector(".btn-details").addEventListener('click',()=> fetchDetails(item.idDrink));

        if (!isInCart) {
            //cart a add kroar button
            itemCard.querySelector('.btn-cart').addEventListener('click', () => {
                addToCart(item);
                displayItems(items);
            });
        }
        
    });
    
}
//cart a add kormu
const addToCart = (item)=>{
    cart.push(item);
    showCart();
}

const showCart= ()=>{
    const n = cart.length;
    if(n === 0){
        return;
    }
    if(n>7){
        alert("Sorry!!! 7 tar beshi hoile pinik beshi hoi jaibo.");
        return;
    }
    
    cartCount.innerText= `You have ${n} ${n>1?'items':'item'} in cart`
    
    const item = cart[n-1];
        console.log(item);
        const tRow = document.createElement("tr");
        tRow.innerHTML = `
        <td>${cart.length}</td>
        <td><img class="cart-img" src="${item.strDrinkThumb}"/></td>
        <td>${item.strDrink}</td>
        `;
        tableBody.appendChild(tRow);

    
}


//fetch details by id
const fetchDetails = async(id)=>{
    const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data =await res.json();
    const item = data.drinks[0];
    modalContent.innerHTML = `

            <div class="modal-header">
                <h1 class="modal-title fs-5" id="detailModal">${item.strDrink}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row d-flex justify-content-center">
                    <img src="${item.strDrinkThumb}" class="img-fluid mb-3 img-detail" alt="item image">
                </div>
                <p class="small fw-bold">Details</p>
                <p>Category: ${item.strCategory}</p>
                <p>Type: ${item.strAlcoholic}</p>
                <p>Instructions: ${item.strInstructions}</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
    
    `;

    const modal = new bootstrap.Modal(document.getElementById('detailModal'));
    modal.show();

}


searchBtn.addEventListener('click', () => {
    const searchValue = searchBox.value.trim();
    menuContainer.innerHTML = `
        <div class="col-12 mt-5">
            <h1 class="text-center"><i class="bi bi-search"></i></h1>
            <br>
            <h3 class="text-center">Searching.........</h3>
        </div>
        `;
    fetchItems(searchValue)
});

fetchItems('n');