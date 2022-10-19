


// bars menu 
let barse = document.querySelector(".bars");
let sidebar = document.querySelector(".header ul");
barse.addEventListener("click",function(){
  sidebar.classList.toggle("active");
})


// header active bacground + scroll btn
let fixsed_nav = document.querySelector(".header");
let scroll_btn = document.querySelector(".scroll-btn");
window.addEventListener("scroll",function(){
   this.window.scrollY > 100 ? fixsed_nav.classList.add("active") : fixsed_nav.classList.remove("active");


   
// scrollBtn 
window.onscroll = function(){
    if(window.scrollY > 500){
        scroll_btn.style.display = "block";

    }else{
        scroll_btn.style.display = "none";

    }
   
}
});

scroll_btn.addEventListener("click", () =>{
    window.scrollTo({
        top : 0,
        behavior : "smooth",
    }); // x y 
})






// button ابدأ التصفح 
let button_start_explor = document.querySelector(".main button");
let hadith_section = document.querySelector(".hadith");
button_start_explor.addEventListener("click",function(){
    hadith_section.scrollIntoView({
        behavior :"smooth"
    });

})




// hadith change withe api 

let  hadith_content = document.querySelector(".hadith-content");
let  next = document.querySelector(".button .next");
let  prev = document.querySelector(".button .prev");
let  number = document.querySelector(".button .number");

let hadithIndex = 0;

function hadithChange(){

    fetch("https://api.hadith.gading.dev/books/bukhari?range=1-300")
    .then(response => response.json())
    .then(data => {
       
        let hadiths = data.data.hadiths;

        getHadith();
         // next button 
         next.addEventListener("click",function(){
           if(hadithIndex == 299){
            hadithIndex = 0;
           }else{
            hadithIndex ++;
           }
           getHadith();

         });
         prev.addEventListener("click", () => {
            if(hadithIndex == 0){
                hadithIndex = 299;
               }else{
                hadithIndex --;
               }
               getHadith();
         });

        function getHadith(){
            hadith_content.innerText = hadiths[hadithIndex].arab;
            number.innerText = `300 - ${hadithIndex +1}`;
        }
      
    })
}
hadithChange();



//links section 
let sections = document.querySelectorAll("section");
let links = document.querySelectorAll(".header ul li");
links.forEach(function(link){
  link.addEventListener("click", function(){
   document.querySelector(".header ul li.active").classList.remove('active');
   link.classList.add("active");
   let target = link.dataset.filter;
   sections.forEach(function(section){
    if(section.classList.contains(target)){
        section.scrollIntoView({
            behavior : "smooth"
        });
    };
   });
    
  });

});

// surah api //quran
let surah_content = document.querySelector(".sours-content");
getSurahs();

function getSurahs(){

    // fetch surahs 
    fetch("http://api.alquran.cloud/v1/meta")
    .then(response => response.json())
    .then(data =>{
        let surahs = data.data.surahs.references;
        let numberSuhras = data.data.surahs.count;
       for (let i = 0; i < numberSuhras; i++) {
        surah_content.innerHTML += `
        <div class="surah">
            <p>${surahs[i].name}</p>
            <p>${surahs[i].englishName}</p>
        </div>
        `
        
       }
        
    // pop up 
        let pop_up = document.querySelector(".surahs-popup");
        let ayat_container = document.querySelector(".ayat");
        let surahs_title = document.querySelectorAll(".surah");

        surahs_title.forEach((title,index) => {
            title.addEventListener("click",function(){
                fetch(`http://api.alquran.cloud/v1/surah/${index+1}`)
                .then(response => response.json())
                .then(data =>{
                    ayat_container.innerHTML = "";
                    let ayat = data.data.ayahs;
                    ayat.forEach(function(aya){
                      pop_up.style.display="block";
                      ayat_container.innerHTML += `
                      <p>(${aya.numberInSurah}) - ${aya.text}</p>
                      `

                    })
                })

                
            });

        });

        let close_popUp = document.querySelector(".close-popup");
        close_popUp.onclick = function(){
            pop_up.style.display = "none";
            pop_up.style.transition = ".5s all esse-in-out";

        };
        
        
    });
};



// awqat elsalah //time Api
let cards = document.querySelector(".cards");
get_time_pray();
function get_time_pray(){
    fetch("http://api.aladhan.com/v1/timingsByCity?city=cairo&country=egypt&method=8")
    .then(response => response.json())
    .then(data => {
        let times  = data.data.timings;
        cards.innerHTML = ""; 
        for(let time in times){ //loop in object 

            cards.innerHTML += `
            <div class="card">
                <div class="circle">
                    <svg>
                        <Circle cx="100" cy="100" r="100"></Circle>
                    </svg>
                    <div class="time">${times[time]}</div>

                </div>
                <p>${time}</p>
            </div>
            `
        };
     
    });
};


    