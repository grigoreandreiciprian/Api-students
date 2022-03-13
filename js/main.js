
let nume=document.querySelector(".name");

let email=document.querySelector(".email");

let loc=document.querySelector(".location")

let cards=document.querySelector(".cards")

let buttons=document.querySelector(".paginatie")

let pages=1;

let paginii=5
butoane(paginii)


    




async function getStudents(){

    // let spiner=document.querySelector(".spiner")
    // spiner.style.display="block"


        try{
          
            let spiner=document.querySelector(".spiner")
              spiner.style.display="block"

         
           

                let d= await fetch(`https://randomuser.me/api/?page=${pages}&results=6&seed=${pages}`);
                let m= await d.json();
                let data= await m.results;
        
                spiner.style.display="none"
               
                
                 sort(data);
                atasare(data)
        
        
                return data
        
            
        }catch(e){
            console.log("Nu merge")
        }

    }




getStudents().then(data => {

    let searchInput= document.querySelector(".searchBar");

    // console.log(data[0].name.first)

    searchInput.addEventListener("input", ()=>{

        let searchValue= searchInput.value;

        searchValue=searchValue.toLowerCase();

        let cards=[]

        if(searchValue){

            for(e of data){

                let name= e.name.first.toLowerCase();

                if(name.includes(searchValue)){
                    
                     cards.push(e)

                    //  console.log(cards)
                  
                }
            }
            let CardsContainer=document.querySelector(".cards")

            CardsContainer.innerHTML=``
            atasare(cards);

        }else{

            atasare(data)
        }
    })

    return data
    
})



buttons.addEventListener('click', (e) =>{

    let obj=e.target;

    if(obj.tagName=="BUTTON"){

        pages=obj.textContent;

        cards.innerHTML=""

        getStudents()
    }   
})

getStudents().then(data =>{

     let cards=document.querySelector(".cards")

     cards.innerHTML=``

     atasare(data)



     cards.addEventListener("click", (e) =>{

        let obj=e.target;

        // console.log(obj)

        
        let parinte= obj.parentNode;
        let copil= parinte.children[0].textContent

        let poz= data.filter(e => e.name.first == copil)

        console.log(poz[0].picture.large)

        createModal(poz[0])

       let modal=document.querySelector(".modal")

       modal.addEventListener("click", (e) =>{

        let obj= e.target

        let parent= obj.parentNode
           
        if(parent.classList.contains("right")){
            

            let numele = parent.parentNode.children[1].children[1].children[0].textContent;

           for(let i= 0; i<data.length;i++){

            if(data[i].name.first == numele){
               
                createModal(data[i+1])
            }
           }

            
        }else if(parent.classList.contains("left")){


            let numele = parent.parentNode.children[1].children[1].children[0].textContent;

            for(let i= 0; i<data.length;i++){
 
             if(data[i].name.first == numele){
                
                 createModal(data[i-1])
        }
    }
} 
       })

     })
     
    
})






function pagini(pagina,elemente,arr){
   
    let vector=[];

    for(let i=(pagina-1)*elemente; i< arr.length && i<pagina*elemente;i++){
        vector.push(arr[i])
    }

    return arr;
}


function butoane(nr){

    let buttons=document.querySelector(".paginatie")

    buttons.innerHTML=""

    for(let i=1; i<=nr;i++){

        let button=document.createElement("button")
        button.classList.add("btn");

        button.innerHTML=i;

        buttons.appendChild(button)
    }

    return buttons
}


function atasare(arr){

    arr.forEach(e => {

           
         
        let card=document.createElement("div")
        card.classList.add("card")

        // console.log(e.email)

        card.innerHTML=`

        <img class="img" src="${e.picture.thumbnail}">
        <div class="text">
            <h1 class="name">${e.name.first}</h1>
            <p class="email">${e.email}</p>
            <p class="location">${e.location.city}</p>
        </div>
        
        `

        cards.append(card);

    });
    
}


function afisare(pagina,arr){
    let total=1;

    cards=pagini(pagina,6,arr);

    total=Math.floor(arr.length/4)+1;

    atasare(cards)
    butoane(total)

}

function checkName(names,data){
    return data.filter(e=>e.name.first==names)
  
  }




let v=[
    {
        name:{
            first: "Bogdan",
            last: "Costa",
            title: "Mr",
        }
    },


    {
        name:{
            first: "Andrei",
            last: "Kristensen",
            title: "Miss",
        }
    },


    {
        name:{
            first: "Sayene",
            last: "Leendertse",
            title: "Mrs",
        }
    },


    {
        name:{
            first: "Khaled",
            last: "Costa",
            title: "Mr",
        }
    },
]

// console.log(v[0].name.first)


function sort(v){

    for( let i= 0; i<v.length-1;i++){
        for(let j= i+1; j<(v.length);j++){
            if(v[i].name.first > v[j].name.first){
                let temp= v[i];
                v[i]=v[j];
                v[j]= temp;
               
            }
        
        }
      
      
    }

   
}


function createModal(poz){

    let modal=document.querySelector(".modal")

    modal.innerHTML=`
       
    <p class="closeBtn">&times</p>

    <div class="modalBox">

    <div class="left">
       <i class="fa-solid fa-arrow-left"></i>
    </div>

    <div class="modalContent">
       <img class="img" src="${poz.picture.large}">
       <div class="text">
           <h1 class="name">${poz.name.first}</h1>
           <p class="email">${poz.email}</p>
           <p class="location">${poz.location.city}</p>
           <div class="line"></div>
           <p>${poz.phone}</p>
           <p>${poz.location.street.name} ${poz.location.street.number}</p>
           <p>${poz.registered.date}</p>
       </div>

       
   </div>

   <div class="right">
       <i class="fa-solid fa-arrow-right"></i>
   </div>


   </div>
    `

    modal.style.display="block"

    let closeBtn= document.querySelector(".closeBtn")

    closeBtn.addEventListener("click", ()=>{

        modal.style.display="none"
    })
}




