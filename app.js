let cart = [];
const searchBox = document.getElementById("search-box");
const searchBtn = document.getElementById("search-btn");
const menuContainer = document.getElementById("menu-container");
const cartContainer = document.getElementById("cart-container");
const modalContent = document.getElementById("modalcontent");

const fetchItems = async(nam)=>{
    const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nam}`);
    const items = await res.json();
    // console.log(items.drinks)
    displayItems((items.drinks));
}


const displayItems = (items) =>{
    menuContainer.innerHTML=``;
    items.forEach(item => {
        // console.log(item)
        //card banaite hoibo then eidire card a dite hoibo
        const itemCard = document.createElement('div');
        itemCard.className = "col-md-4 mb-3";
        itemCard.innerHTML =`
        <div class="card shadow-sm">
            <img src="${item.strDrinkThumb}" class="card-img-top img-card" alt="item image">
            <div class="card-body">
                <h5 class="card-title text-center">Name : ${item.strDrink}</h5>
                <p class="text-center">Category : ${item.strCategory}</p>
                <p class="card-text text-center">Instructions : ${item.strInstructions.slice(0,15)}...</p>
                <div class="d-flex justify-content-around">
                    <button class="btn btn-cart btn-primary" type="button" data-id="${item.idDrink}">Add to Group</button>
                    <button class="btn btn-details btn-primary" type="button" data-id="${item.idDrink}">Details</button>
                </div>
            </div>
        </div>
        `;
        menuContainer.append(itemCard);
    });
    //modal dekhamu
    document.querySelectorAll(".btn-details").forEach(btn=>{
        const id = btn.dataset.id;
        btn.addEventListener('click',()=>{
            fetchDetails(id)
        })
    })
    //cart a add kormu
    document.querySelectorAll(".btn-cart").forEach(btn=>{
        const id = btn.dataset.id;
        btn.addEventListener('click',()=>{
            addToCart(id);
        })
    })
}
//cart a add kormu
const addToCart = (item)=>{
    cart.push(item);
    showCart();
}

const showCart= ()=>{
    
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
    menuContainer.innerHTML=`Lokking For Your Item ${searchValue}`;
    fetchItems(searchValue)
});

fetchItems('n');