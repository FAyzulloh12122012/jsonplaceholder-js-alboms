const elUserList = document.querySelector(".user__list")
const elAlbomList = document.querySelector(".albom__list")
const elPhotoList = document.querySelector(".photo__list")
const loadingUser  = document.querySelector(".user__loading")
const loadingAlbom = document.querySelector(".albom__loading")
const loadingPhoto = document.querySelector(".photo__loading")

async function fetchUser(users){
    try{
        loadingUser.classList.remove("hidden") 
        
        let res = await fetch("https://jsonplaceholder.typicode.com/users")
        let data = await res.json()
        userRender(data)
        
        if (!res.ok) throw new Error("Server xatosi");
    }catch (error){
        console.log("Hatolik:" + error)
    }finally{
        loadingUser.classList.add("hidden")
    }
}
function userRender(item){
    elUserList.innerHTML = "";
    
    for(let i = 0; i < item.length; i++){
        elUserList.innerHTML += `<li data-user-id = ${item[i].id} class="user__item">
                        <div class="user__content">
                            <span class="user_id">${item[i].id}</span>
                            <h2 class="user_title">${item[i].name}</h2>
                        </div>
                        <h3 class="user_subtitlle">${item[i].username}</h3>
                        <a href="mailto:${item[i].email}" class="user_email">${item[i].email}</a>
                    </li>`
    }
}
fetchUser(elUserList)


elUserList.addEventListener("click", (evt) => {
    let card = evt.target.closest(".user__item")
    
    if(card){
        let elUserId = evt.target.dataset.userId
        
        async function fetchAlbom(alboms){
            try{
                loadingAlbom.classList.remove("hidden")
                
                let res = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${elUserId}`)
                let data = await res.json()
                albomRender(data)
                
                if (!res.ok) throw new Error("Server xatosi");
            }catch (error){
                console.log("Hatolik:" + error)
            }finally{
                loadingAlbom.classList.add("hidden")
            }
        }
        fetchAlbom(elAlbomList)
    }
});
function albomRender(item){
    elAlbomList.innerHTML = "";
    
    for(let i = 0; i < item.length; i++){
        elAlbomList.innerHTML += `<li data-albom-id = ${item[i].id} class="albom__item">
                        <span class="albom_id">${item[i].id}</span>
                        <h2 class="albom_title">${item[i].title}</h2>
                    </li>`
    }
}


elAlbomList.addEventListener("click", (evt) => {
    let card = evt.target.closest(".albom__item")

    if(card){
        let elAlbomId = evt.target.dataset.albomId

        async function fetchPhoto(photos){
            try{
                loadingPhoto.classList.remove("hidden")
                
                let res = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${elAlbomId}`)
                let data = await res.json()
                photoRender(data)
                
                if (!res.ok) throw new Error("Server xatosi");
            }catch(error){
                console.log("Hatolik:" + error)
            }finally{
                loadingPhoto.classList.add("hidden")
            }
        }
        fetchPhoto(elPhotoList)
    }
});
function photoRender(item){
    elPhotoList.innerHTML = "";
    
    for(let i = 0; i < item.length; i++){
        elPhotoList.innerHTML += `<li class="photo__item">
                        <div class="photo__content">
                            <span class="photo_id">${item[i].id}</span>
                            <h2 class="photo_title">${item[i].title}</h2>
                        </div>
                        <img src="" alt="${item[i].url}" class="photo_img">
                    </li>`
    }
}