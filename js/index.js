const loadPetCategories = async () => {
    try {
        const url = "https://openapi.programming-hero.com/api/peddy/categories";
        const res = await fetch(url);
        const data = await res.json();
        // console.log(data.categories);
        displayPetCategories(data.categories);
    }

    catch {
        console.error("Error Fetching Data: ", error);
    }
}

const displayPetCategories = (categories) => {
    const petCategoryContainer = document.getElementById('category-container');

    categories.forEach((item) => {
        // console.log(item.category);
        const div = document.createElement('div');
        div.innerHTML = `
        <div onclick = "petCategoryButton('${item.category}')" class="w-[250px] h-full btn bg-white flex gap-2 px-6 py-4 rounded-2xl border border-[#0e7a81]/20 items-center">
            <img src="${item.category_icon}" alt="" class="">
            <h3 class="text-[#131313] text-2xl font-bold">${item.category}</h3>
        </div>
        `
        petCategoryContainer.appendChild(div);
    })
}


const displayPetCards = (petCards) => {
    const petContainer = document.getElementById('pet-container');
    petContainer.innerHTML = "";

    if (petCards.length == 0) {
        document.getElementById('pet-container').classList.remove('grid');
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="py-[100px] bg-[#131313]/5 rounded-3xl flex flex-col justify-center items-center gap-6">
                        
                <img src="./images/error.webp" alt="" class="">
                <h3 class="text-center text-[#131313] text-[32px] font-bold">No Information Available</h3>
                <p class="text-center text-[#131313]/70 text-base font-normal px-0 lg:px-[140px]">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
                        its layout. The point of using Lorem Ipsum is that it has a.</p>
                        
            </div>`
        petContainer.appendChild(div);
        document.getElementById('spinner-loader').classList.add('hidden');
        return;
    }
    document.getElementById('pet-container').classList.add('grid');

    for (const petCard of petCards) {
        // console.log(petCard);

        const div = document.createElement('div');
        div.innerHTML = `
        <div class="w-[312px] md:w-full h-full mx-auto md:mx-0 p-5 rounded-xl border border-[#131313]/10 flex flex-col gap-6">

                <img src="${petCard.image}" alt="" class="rounded-lg">

                <div class="flex flex-col gap-3">

                    <h3 class="text-[#131313] text-xl font-bold">${petCard.pet_name}</h3>

                    <div class="flex gap-1 items-center">
                        <img src="./images/bread-icon.png" alt="" class="">
                        <p class="text-[#131313]/70 text-base font-normal">Breed: 
                        ${(petCard.breed === "" || petCard.breed === undefined || petCard.breed === null) ? 'Unknown' : `${petCard.breed}`}</p>
                    </div>

                    <div class="flex gap-1 items-center">
                        <img src="./images/birth-icon.png" alt="" class="">
                        <p class="text-[#131313]/70 text-base font-normal">Birth: 
                        ${(petCard.date_of_birth === "" || petCard.date_of_birth === undefined || petCard.date_of_birth === null) ? 'Unknown' : `${petCard.date_of_birth}`}</p>
                    </div>

                    <div class="flex gap-1 items-center">
                        <img src="./images/gender-icon.png" alt="" class="">
                        <p class="text-[#131313]/70 text-base font-normal">Gender: 
                        ${(petCard.gender === "" || petCard.gender === undefined || petCard.gender === null) ? 'Unknown' : `${petCard.gender}`}</p>
                    </div>

                    <div class="flex gap-1 items-center">
                        <img src="./images/price-icon.png" alt="" class="">
                        <p class="text-[#131313]/70 text-base font-normal">Price: 
                        ${(petCard.price === "" || petCard.price === undefined || petCard.price === null) ? 'Unknown' : `${petCard.price}$`}</p>
                    </div>

                    <div class = "border border-[#131313]/10"></div>

                    <div class="flex justify-between">

                        <button onclick = "likeButton('${petCard.image}')" class="btn bg-white px-4 py-2"> <i class=" fa-regular fa-thumbs-up"></i> </button>
                        <button id = "adopt-${petCard.petId}" onclick = "countDownModal('${petCard.petId}','${petCard.price}')" class = "btn bg-white text-[#0e7a81] text-lg font-bold">Adopt</button>
                        <button onclick = "loadPetDetails('${petCard.petId}')" class="btn bg-white text-[#0e7a81] text-lg font-bold">Details</button>

                    </div>

                </div>

            </div>
        `
        petContainer.appendChild(div);
        document.getElementById('spinner-loader').classList.add('hidden');

    }
}

const petCategoryButton = async (petName = "") => {
    try {
        const url = `https://openapi.programming-hero.com/api/peddy/category/${petName}`;
        const res = await fetch(url);
        const data = await res.json();

        document.getElementById('spinner-loader').classList.remove('hidden');
        const petContainer = document.getElementById('pet-container');
        petContainer.innerHTML = "";

        setTimeout(function () {
            displayPetCards(data.data);
        }, 3000);
    }

    catch (error) {
        console.error("Error Fetching Data: ", error);
    }
}

const loadAllPetCards = async () => {
    try {
        const url = "https://openapi.programming-hero.com/api/peddy/pets";
        const res = await fetch(url);
        const data = await res.json();
        displayPetCards(data.pets);
    }

    catch (error) {
        console.error('Error Fetching Data: ', error);
    }
}

document.getElementById('search-input').addEventListener('keyup', (event) => {
    petCategoryButton(event.target.value);
})

const likeButton = (image) => {
    const likeContainer = document.getElementById('like-container');
    const img = document.createElement('img');
    img.src = image;
    img.classList.add('rounded-lg');
    likeContainer.appendChild(img);
}

const displayPetDetails = (details) => {

    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = "";
    const div = document.createElement('div');

    div.innerHTML = `
                <img src="${details.image}" alt="" class="w-full rounded-lg mb-6">
                <h3 class="text-[#131313] text-xl font-bold">${details.pet_name}</h3>

                <div class="grid grid-cols-2 gap-x-5 gap-y-3 my-4">
                    <div class="flex gap-1 items-center">
                        <img src="./images/bread-icon.png" alt="" class="">
                        <p class="text-[#131313]/70 text-base font-normal">Breed: 
                        ${(details.breed === "" || details.breed === undefined || details.breed === null) ? 'Unknown' : `${details.breed}`}</p>
                    </div>

                    <div class="flex gap-1 items-center">
                        <img src="./images/birth-icon.png" alt="" class="">
                        <p class="text-[#131313]/70 text-base font-normal">Birth: 
                        ${(details.date_of_birth === "" || details.date_of_birth === undefined || details.date_of_birth === null) ? 'Unknown' : `${details.date_of_birth}`}</p>
                    </div>

                    <div class="flex gap-1 items-center">
                        <img src="./images/gender-icon.png" alt="" class="">
                        <p class="text-[#131313]/70 text-base font-normal">Gender: 
                        ${(details.gender === "" || details.gender === undefined || details.gender === null) ? 'Unknown' : `${details.gender}`}</p>
                    </div>

                    <div class="flex gap-1 items-center">
                        <img src="./images/price-icon.png" alt="" class="">
                        <p class="text-[#131313]/70 text-base font-normal">Price:
                        ${(details.price === "" || details.price === undefined || details.price === null) ? 'Unknown' : `${details.price}$`}</p>
                    </div>

                    <div class="flex gap-1 items-center">
                        <img src="./images/price-icon.png" alt="" class="">
                        <p class="text-[#131313]/70 text-base font-normal">Vaccinated status:
                        ${(details.vaccinated_status === "" || details.vaccinated_status === undefined || details.vaccinated_status === null) ? 'Unknown' : `${details.vaccinated_status}`}</p>
                    </div>
                </div>

                <div class="border border-[#131313]/10 mb-4"> </div>

                <h4 class="text-[#131313] text-base font-bold">Details Information</h4>
                <p class="py-4 text-[#131313]/70 text-base font-normal">${details.pet_details}</p>

                <form method="dialog" class="modal-action">
                    <button class="btn text-[#0e7a81] text-lg font-bold w-full bg-[#0e7a81]/10 rounded-lg border border-[#0e7a81]/20 justify-center items-cente">Cancel</button>
                </form>
    `
    detailsContainer.appendChild(div);
    my_modal_1.showModal();
}

const loadPetDetails = async (detailsId) => {

    try {
        const url = `https://openapi.programming-hero.com/api/peddy/pet/${detailsId}`;
        const res = await fetch(url);
        const data = await res.json();
        displayPetDetails(data.petData);
    }

    catch (error) {
        console.error('Error Fetching Data: ', error);
    }
}

const decresingWalletAmount = (id, price) => {
    let currentBalance = parseFloat(document.getElementById('current-balance').innerText);

    if (currentBalance - price < 0) {
        alert("Sorry! You Have Insufficient Balance! Please try Again later.");
        return;
    }
    currentBalance -= price;
    document.getElementById('current-balance').innerText = (currentBalance);
    document.getElementById(`adopt-${id}`).disabled = true;
}

const countDownModal = (petId, petPrice) => {
    my_modal_2.showModal();

    let countdown = 3;
    document.getElementById('count-down').innerText = countdown;

    const timer = setInterval(() => {
        countdown--;
        document.getElementById('count-down').innerText = countdown;

        if (countdown <= 0) {
            clearInterval(timer);
            my_modal_2.close();
            decresingWalletAmount(petId, petPrice);
        }
    }, 1000);
}


loadAllPetCards();
loadPetCategories();


// {
//     "petId": 1,
//     "breed": "Golden Retriever",
//     "category": "Dog",
//     "date_of_birth": "2023-01-15",
//     "price": 1200,
//     "image": "https://i.ibb.co.com/p0w744T/pet-1.jpg",
//     "gender": "Male",
//     "pet_details": "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog.",
//     "vaccinated_status": "Fully",
//     "pet_name": "Sunny"
// }