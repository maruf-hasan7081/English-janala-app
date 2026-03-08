

// fatch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
const dataload=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res=>res.json())
    .then((json)=>showlesson(json.data))
}
dataload()


const removeActive=()=>{
    const allActive=document.querySelectorAll(".active-button")
    for(let active of allActive){
        active.classList.remove("active")
    }
}

const showlesson=(lessons)=>{
    // console.log(lesson)

    const lessonContainer=document.getElementById("leason-container")
    // console.log(lessonContainer)
    lessonContainer.innerHTML="";

    for(let lesson of lessons){
        const divmake= document.createElement("div")
        divmake.innerHTML=`<button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn text-primary active-button" >
                        <img src="./assets/fa-book-open.png" alt=""> Lesson ${lesson.level_no}
                    </button>`
        lessonContainer.appendChild(divmake)
    


    }

    

}

const loadLevelWord=(id)=>{

    const url=`https://openapi.programming-hero.com/api/level/${id}`
    // console.log(url)
    fetch(url)
    .then(res=>res.json())
    .then((data)=>{
        removeActive()
        const butn =document.getElementById(`lesson-btn-${id}`)
        butn.classList.add("active")
        showLabelword(data.data)
    })
}

const showLabelword=(words)=>{

    const WordContainer= document.getElementById("word-container")
     WordContainer.innerHTML = ""

if(words.length==0){
    WordContainer.innerHTML=`
    
            <div class="text-center col-span-full">
            <img class="mx-auto" src="../assets/alert-error.png" alt="">
                <p class="">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <p class=" font-bold text-4xl">নেক্সট Lesson এ যান</p>
            </div>

    
    `
}





    for(let word of words){



//         "id": 4,
// "level": 5,
// "word": "Diligent",
// "meaning": "পরিশ্রমী",
// "pronunciation": "ডিলিজেন্ট"

        const card =document.createElement("div")
        card.innerHTML=`
        
            <div class=" bg-white rounded-xl shadow-sm text-center px-5 py-10 space-y-4">
                <p class="font-bold">${word.word ? word.word : "No Data Found"}</p>
                <p class="font-semibold">Meaning /Pronounciation</p>
                <div class="font-semibold">${word.meaning ? word.meaning : "No Data Found"} / ${word.pronunciation ? word.pronunciation : "No Data Found"}</div>
                <div class="flex justify-between items-center ">
                    <button onclick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>

                </div>
            </div>
        `
        WordContainer.appendChild(card)

        
    }
    
}

const loadWordDetails = async(id) => {

    const url =`https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayWordDetails(data.data)

    
}
const displayWordDetails = (word) => {
    const wordDetails = document.getElementById("word-details")
    wordDetails.innerHTML = ` <div class="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 border">


,

    
    <h2 class="text-3xl font-bold mb-4">
        ${word.word} <i class="fa-solid fa-microphone"></i>: <span class="text-gray-600">( ${word.meaning} )</span>
    </h2>

    
    <div class="mb-4">
        <h3 class="text-lg font-semibold mb-1">Meaning</h3>
        <p class="text-gray-700">${word.meaning}</p>
    </div>

   
    <div class="mb-4">
        <h3 class="text-lg font-semibold mb-1">Example</h3>
        <p class="text-gray-600">${word.sentence}</p>
    </div>

    
    <div class="mb-6">
        <h3 class="text-lg font-semibold mb-2">সমার্থক শব্দ গুলো</h3>

         <div > ${createElements(word.synonyms)} </div>
    </div>

    
    <button class="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700">
        Complete Learning
    </button>

</div>
    `
    document.getElementById("my_modal_5").showModal()

    
}

//     "word": "Eager",
// "meaning": "আগ্রহী",
// "pronunciation": "ইগার",
// "level": 1,
// "sentence": "The kids were eager to open their gifts.",
// "points": 1,
// "partsOfSpeech": "adjective"

const createElements = (arr) => {
    const htmlelement = arr.map((el) => `<span class="btn">${el}</span>`)
    return htmlelement.join("")
}