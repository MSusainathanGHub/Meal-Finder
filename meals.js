// Get the variables from HTML

let mainDiv = document.querySelector(".mainDiv");
let search = document.querySelector(".search");
let blankerror = document.querySelector(".blank");
let fooderror = document.querySelector(".food");


  //Meals Function
async function findMeals() {
    
    let foodname = search.value;
    console.log(foodname);

// Check if the search is empty and display error and reset any errors
    if(foodname == "" && mainDiv.childNodes.length == 0){
       blankerror.classList.add("showerror");
       fooderror.classList.remove("showerror");
    }

// Check for existing meals display and throw error if the search is empty    
    else if(foodname == "" && mainDiv.childNodes.length > 0){
        mainDiv.innerHTML = "";
        blankerror.classList.add("showerror");
        fooderror.classList.remove("showerror");
    }
// Display the searched the meal    
    else{
        blankerror.classList.remove("showerror");
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodname}`);
        const data = await response.json();
        console.log(data);
        //Get the fooditems
        const meals = data.meals;

        let noMeal = Object.is(meals, null); // true

        // Check if the object is null and throw error
        if(noMeal && foodname != ""){
            fooderror.classList.add("showerror");
        }
        else{
            fooderror.classList.remove("showerror");
        }
    
        //Check if the response has atleast 1 meal
        
        if (mainDiv.childNodes.length > 0) 
        { 
            mainDiv.innerHTML = "";
            blankerror.classList.remove("showerror");
        }
     
       
            for (meal of meals) {
                const parent = document.createElement("div");
                const title = document.createElement("p");
                const mealImg = document.createElement("img");
                const videoURL = document.createElement("a");
                parent.classList.add("card");
                parent.classList.add("parent");
                mealImg.classList.add("card-img-top");
                videoURL.classList.add("btn");
                videoURL.classList.add("btn-info");
                videoURL.classList.add("watchVideo");
                title.classList.add("card-text");
                title.textContent = meal.strMeal;
                mealImg.src = meal.strMealThumb;
                videoURL.innerHTML = "Watch Video";
                videoURL.href = meal.strYoutube;
                parent.appendChild(mealImg);
                parent.appendChild(title);
                parent.appendChild(videoURL);
                mainDiv.appendChild(parent);
              }
    }
   
}
    
   


  

 
