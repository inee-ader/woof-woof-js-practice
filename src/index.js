const dogBar = document.querySelector('#dog-bar')
const dogInfo = document.querySelector('#dog-info')
const dogFilter = document.querySelector('#good-dog-filter')
dogFilter.addEventListener('click', () => {
    dogBar.innerHTML = ''
    if(dogFilter.innerText == 'Filter good dogs: OFF'){
        dogFilter.innerText = 'Filter good dogs: ON'
    }else{
        dogFilter.innerText = 'Filter good dogs: OFF'
    }
    fetchDogs()
})

// fetch
function fetchDogs(){
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(dogs => {
        if(dogFilter.innerText == 'Filter good dogs: ON'){
            let goodDogs = dogs.filter(dog => dog.isGoodDog)
            goodDogs.forEach(dog => buildDogBar(dog))
        }else{
            dogs.forEach(dog => buildDogBar(dog))
        }
    })
}
fetchDogs()

// DOM building
function buildDogBar(dog){
    let span = document.createElement('span')
    span.innerText = dog.name
    span.style='text-align: center'
    dogBar.append(span)
    span.addEventListener('click', () => showDog(dog))
}

function showDog(dog){
    dogInfo.innerHTML = ''
    let img = document.createElement('img')
    let h2 = document.createElement('h2')
    let btn = document.createElement('button')
    img.src = dog.image
    h2.innerText = dog.name
    if(dog.isGoodDog){
        btn.innerText = "Good Dog!"
    }else{
        btn.innerText = "Bad Dog!"
    }
    btn.addEventListener('click', () => changeDogStatus(dog))
    dogInfo.append(img, h2, btn)
}

function changeDogStatus(dog){
    if(dog.isGoodDog){
        dog.isGoodDog = false
    }else{
        dog.isGoodDog = true
    }
    showDog(dog)
    patchDog(dog)
}

function patchDog(dog){
    fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }, 
        body: JSON.stringify(dog)
    })
    .then(res => res.json())
    .then(console.log)
}




