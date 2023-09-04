 const close=document.getElementById('close')
 const openClose=document.getElementsByClassName(".open-close-icon")
   let rowData=document.getElementById("rowData")
   let foodBox= document.querySelectorAll(".meal")

$(document).ready( ()=>{
    $("#spinner").fadeOut(1000)
   
    $('#open').click(()=>{
$(".side-navbar").animate({left:"0px"},500,function(){
$('#open').css("display","none");
$('#close').css("display","block")
})
    
function  closeNav(){
    let boxWidth=$(".side-navbar").width()

    $(".side-navbar").animate({left:`-${boxWidth}`},500,function(){
        $('#open').css("display","block");
        $('#close').css("display","none")
})

   

}
$("#close").click(()=>{
    closeNav()
})
    



    
                
  async function getCategories(){
    $("#spinner").fadeIn(500)
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let data = await response.json();
    console.log(data)
    displayCategories(data.categories)
    $("#spinner").fadeOut(500)
}

 function displayCategories(arr){
let catInner=``
for(let i=0;i<arr.length;i++){
catInner +=`
<div  class='col-md-3 cursor-pointer  meal position-relative overflow-hidden '>
<img   src="${arr[i].strCategoryThumb}" class="w-100">
<div class="meal-layer position-absolute text-center text-black p-2">
<h3 class="fw-bold">${arr[i].strCategory}</h3>
<p>${arr[i].strCategoryDescription.split('').slice(0,100).join('')}</p>
</div>


</div>

`

}rowData.innerHTML=catInner;
rowData.addEventListener("click",function(event){
  const target=  event.target;
if(target.classList.contains("meal-layer")){
  const categoryElement=target.querySelector(".fw-bold")//h3

if(categoryElement){
    const category=categoryElement.textContent;//content in h3 like beef 
    getCategoriesMeal(category)

}


}


})


 }

async function getCategoriesMeal(category){
    $("#spinner").fadeIn(500)
let response= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
let data=  await  response.json();
console.log(data)
displayMeals(data.meals)
$("#spinner").fadeOut(500)
rowData.addEventListener("click",function(event){
  const target=  event.target
  if(target.classList.contains("meal-layer")){
       let idMeal=   target.querySelector(".id")
     if(idMeal){
let id  =idMeal.textContent;
console.log(id)
getMealsDetails(id )

     }

  }

})

 }

 function  displayMeals(arr){
let cartoona=``
for(let i=0;i<arr.length;i++){
cartoona+=`
<div class="col-md-3">
<div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
        <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
          <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
              <h3>${arr[i].strMeal}</h3>
              <p class="id d-none">${arr[i].idMeal}</p>
        </div>
                </div>

</div>

`
}rowData.innerHTML=cartoona;

 }

 async   function getCountries(){
    $("#spinner").fadeIn(500)
    let resp=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let data = await resp.json();
displayCountries(data.meals)
$("#spinner").fadeOut(500)
}


  function    displayCountries (arr) {
let cartona =``
for(let i=0;i<arr.length;i++){
cartona+=`
<div class="col-md-3">
<div class="rounded-2 text-center meal ">
<i class="fa-solid fa-house-laptop fa-4x"></i>
<h3 class="fw-bold">${arr[i].strArea}</h3>
</div>
</div>

`


}rowData.innerHTML=cartona;
rowData.addEventListener("click",function(event){
    const target=  event.target;

   if(target.classList.contains("meal")){
    const areaElement=target.querySelector(".fw-bold")//h3

   if(areaElement){
      const area =areaElement.textContent;//content in h3 like america
      console.log(area)
       getAreaMeal(area)
  
   
 }
  
   }

})


  }
  async   function  getAreaMeal(area){
    $("#spinner").fadeIn(500)
const  resp=  await  fetch(`https:www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
const data =await resp.json()
console.log(data)
displayMeals(data.meals);
$("#spinner").fadeOut(500)
 rowData.addEventListener("click",function(event){
    let target=  event.target
if(target.classList.contains("meal-layer")){
const  idMeal = target.querySelector(".id")
if(idMeal){
let id=idMeal.textContent;
getMealsDetails(id)
}


}


 })



}


    async function  getMealsDetails(idMeal){
        $("#spinner").fadeIn(500)
let resp=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
let data=await  resp.json();

console.log(data.meals)
displayMealsDetails(data.meals[0])//object
$("#spinner").fadeOut(500)

  }
  function   displayMealsDetails(meal){

    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
     let tags = meal.strTags?.split(",")
     if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }


    let cartoona = `
    <div class="col-md-4 text-white">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8 text-white">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    rowData.innerHTML = cartoona;






  }
    async function  getIngredients() {
        $("#spinner").fadeIn(500)
        let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
   let data  = await resp.json()
   displayIngredients(data.meals);
   $("#spinner").fadeOut(500)
    
    }
function displayIngredients(arr){
let cartoona=``
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3 text-white">
                <div  class="rounded-2 text-center meal cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3 class="fw-bold">${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription?.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona;
 rowData.addEventListener("click",function(event){
   let  target=event.target 

   if(target.classList.contains("meal")){
 let strIngElement=target.querySelector(".fw-bold")
 console.log(strIngElement)
 if(strIngElement){
    let ingredients=strIngElement.textContent;
    getIngredientsMeal(ingredients)
 }
 



 }

 })

   
}

  async   function getIngredientsMeal(ingredients){
    $("#spinner").fadeIn(500)
let resp=await fetch(`http://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
let data=await resp.json();
displayMeals(data.meals)
$("#spinner").fadeOut(500)
  console.log (data.meals.idMeal)

 rowData.addEventListener("click",function(event){
     let target=  event.target
 if(target.classList.contains("meal-layer")){
 const  idMeal = target.querySelector(".id")
 if(idMeal){
 let id=idMeal.textContent;
 getMealsDetails(id)
 }


 }


  })
     }


$("#ingred").click(()=>{

    getIngredients()

closeNav()


})
function showSearch(){
    
    searchContainer.innerHTML = `
    <div class="row py-4  text-white   ">
        <div  id="searchName"  class="col-md-6 ">
            <input id="nameInput"  class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div  id="searchByLetter" class="col-md-6">
            <input  id="letterInput"  maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`
    rowData.innerHTML=" "

}
let  name =document.getElementById("nameInput")
let  letterInput =document.getElementById("letterInput")
$("#searchName").keyup(()=>{
    getSearchByName(name.value)

})
$("#searchByLetter").keyup(()=>{
    getSearchBYFirstName(letterInput.value)
})

 async   function getSearchByName(term){
let resp =await fetch(`http://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
let data =await resp.json()
data.meals ? displayMeals(response.meals) : displayMeals([])

}
  async   function getSearchBYFirstName(term){
    let resp=await fetch (`http://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    let data=await resp.json();
    data.meals ? displayMeals(data.meals) : displayMeals([])


}

$("#search").click(()=>{
    showSearch()
closeNav()

})





  const nameInput=document.getElementById("nameInput")
  const emailInput=document.getElementById("emailInput")
  const phoneInput=document.getElementById("phoneInput")
  const repasswordInput=document.getElementById("repasswordInput")
  const passwordInput=document.getElementById("passwordInput")
  const ageInput=document.getElementById("ageInput")
  function showContact(){
    
    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container  w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6 validation">
                <input id="nameInput"   type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6 validation">
                <input id="emailInput" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6 validation">
                <input id="phoneInput"  type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6 validation">
                <input id="ageInput"  type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6 validation">
                <input  id="passwordInput" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6  validation">
                <input  id="repasswordInput"  type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `

}




$(".validation").keyup(()=>{
    inputsValidation()
    closeNav()
})
let submitBtn=document.getElementById("submitBtn")
function inputsValidation(){

    if (nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()) {
    submitBtn.removeAttribute("disabled")
} else {
    submitBtn.setAttribute("disabled", true)
}

}
function nameValidation(){
const nameAlert=document.getElementById("nameAlert")
var regex=/ ^[a-zA-Z ]+$ /;
if( regex.test(nameInput.value) == true && nameInput.value != "")
    {
       nameInput.classList.add("is-valid");
       nameInput.classList.remove("is-invalid");
        nameAlert.classList.replace("d-block", "d-none");

        return true
    }
    else
    {
        
       nameInput.classList.add("is-invalid");
       nameInput.classList.remove("is-valid");
       nameAlert.classList.replace("d-none", "d-block");

        return false
    }


}
function emailValidation(){
    const emailAlert=document.getElementById("emailAlert")
    var regex=(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    
    if( regex.test(emailInput.value) == true && emailInput.value != "")
        {
           emailInput.classList.add("is-valid");
           emailInput.classList.remove("is-invalid");
            emailAlert.classList.replace("d-block", "d-none");
    
            return true
        }
        else
        {
            
           emailInput.classList.add("is-invalid");
           emailInput.classList.remove("is-valid");
           emailAlert.classList.replace("d-none", "d-block");
    
            return false
        }

}
   function   phoneValidation(){
    const phoneAlert=document.getElementById("phoneInput")
    var regex=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if( regex.test(phoneInput.value) == true && phoneInput.value != "")
    {
       phoneInput.classList.add("is-valid");
       phoneInput.classList.remove("is-invalid");
        phoneAlert.classList.replace("d-block", "d-none");

        return true
    }
    else
    {
        
       phoneInput.classList.add("is-invalid");
       phoneInput.classList.remove("is-valid");
       phoneAlert.classList.replace("d-none", "d-block");

        return false
    }

   }
   function ageValidation(){
const ageAlert=document.getElementById("ageAlert")
var regex=/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/; 
    if( regex.test(ageInput.value) == true && ageInput.value != "")
    {
       ageInput.classList.add("is-valid");
       ageInput.classList.remove("is-invalid");
        ageAlert.classList.replace("d-block", "d-none");

        return true
    }
    else
    {
        
       ageInput.classList.add("is-invalid");
       ageInput.classList.remove("is-valid");
       ageAlert.classList.replace("d-none", "d-block");

        return false
    }



   }
function passwordValidation(){
  const   passwordAlert=document.getElementById("passwordAlert")
var regex=/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
    if( regex.test(passwordInput.value) == true && passwordInput.value != "")
    {
       passwordInput.classList.add("is-valid");
       passwordInput.classList.remove("is-invalid");
       passwordAlert.classList.replace("d-block", "d-none");

        return true
    }
    else
    {
        
       passwordInput.classList.add("is-invalid");
       passwordInput.classList.remove("is-valid");
       passwordAlert.classList.replace("d-none", "d-block");

        return false
    }

}
function repasswordValidation(){
if(repasswordInput.value==passwordInput.value){
    return true;

}else{
    return false ;
}


}









$("#contact").click(()=>{
showContact()
closeNav()

})








































$("#cat").click(()=>{

    getCategories()
    closeNav()
 
   
})
$("#area").click(()=>{
    getCountries()

    closeNav()


})

getCategories()

})












































})


     
    

          