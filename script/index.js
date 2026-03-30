// console.log("Hello World");

const createElements = (arr) => {
    const htmlElements = arr.map(el => `<span class="btn">${el}</span>`);
    return htmlElements.join(" ");

};

function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-EN"; // English
    window.speechSynthesis.speak(utterance);
};

const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }
    else {
        document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}

const loadLessons = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";
    // promise of response
    fetch(url)
        // promise of json data
        .then(response => response.json())
        .then(json => {
            displayLesson(json.data);
        })
}

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn")
    // console.log(lessonButtons);
    lessonButtons.forEach(btn => {
        btn.classList.remove("active");

    });
}

const loadLevelWord = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(json => {
            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`)
            // console.log(clickBtn);
            clickBtn.classList.add("active")
            displayLevelWord(json.data);
        })
}

// {
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার",
//     "level": 1,
//     "sentence": "The kids were eager to open their gifts.",
//     "points": 1,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "enthusiastic",
//         "excited",
//         "keen"
//     ],
//     "id": 5
// }

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    // console.log(url);
    const response = await fetch(url);
    const details = await response.json();
    displayWordDetails(details.data);

}

const displayWordDetails = (word) => {
    console.log(word);
    const detailsContainer = document.getElementById("details_container");
    detailsContainer.innerHTML = `
        <div class=" space-y-3">
                    <h2 class="text-2xl mb-5 font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation})</h2>
                    <h3 class="text-xl font-semibold">Meaning</h3>
                    <p class="font-bangla text-xl mb-5">${word.meaning}</p>
                    <h3 class="font-semibold text-[20px]">Example</h3>
                    <p class="text-lg mb-5">${word.sentence}</p>
                    <p class="font-bangla font-semibold text-xl">সমার্থক শব্দ গুলো</p>
                    <div class=" space-x-3">
                        <div class="">${createElements(word.synonyms)}</div>
                    </div>
                </div>
    
    `;
    document.getElementById("word_modal").showModal();
}

const displayLevelWord = (words) => {
    // console.log(words);

    // 1. get the container & empty

    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if (words.length == 0) {
        wordContainer.innerHTML = `
            <div class="text-center col-span-full py-10 space-y-2 font-bangla">
            <img class="mx-auto mb-3" src="./assets/alert-error.png" alt="">
            <p class="font-normal text-lg text-gray-500">দু:খিত!!</p>
            <p class="font-medium text-xl text-gray-600">এই Lesson এ এখনো কোনো Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-semibold text-4xl text-gray-800">নেক্সট Lesson এ যান</h2>
        </div>
        
        `;
        manageSpinner(false);
        return;
    }



    // {
    //     "id": 72,
    //         "level": 1,
    //             "word": "Big",
    //                 "meaning": "বড়",
    //                     "pronunciation": "বিগ"
    // }



    // 2. get into every words

    for (let word of words) {
        console.log(word);

        // 3. create elements
        const card = document.createElement("div")
        card.innerHTML = `
            <div class="bg-white rounded-[8px] shadow-sm text-center py-15 px-4">
            <h2 class="font-bold text-[32px] mb-2">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="text-[15px] mb-3">Meaning / Pronunciation</p>

            <div>
                <p class="font-bangla font-semibold text-[28px]">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"}"</p>
            </div>
            <div class="flex justify-between items-center mt-[40px]">
                <button onclick="loadWordDetail(${word.id})" class="btn btn-soft bg-[#1A91FF10] hover:bg-[#1A91FF70]"><i class="fa-solid fa-circle-info"></i></button>
                <button 
                onclick="pronounceWord('${word.word}')" 
                class="btn btn-soft bg-[#1A91FF10] hover:bg-[#1A91FF70]"><i class="fa-solid fa-volume-high"></i>
                </button>
                

            </div>

        </div>
        
        `



        // 4. append child

        wordContainer.appendChild(card);
    }

    manageSpinner(false);

}

const displayLesson = (lessons) => {
    // console.log(lessons);

    // 1. get the container & empty the container

    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    // 2. get into every lesson

    for (let lesson of lessons) {
        console.log(lesson);

        // 3. create elements

        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
                <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
                <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
                </button>
            
            `

        // 4. append child

        levelContainer.appendChild(btnDiv);
    }

}



loadLessons();

document.getElementById("btn-search").addEventListener("click", function () {
    removeActive();

    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue);

    const url = "https://openapi.programming-hero.com/api/words/all";

    fetch(url)
        .then(response => response.json())
        .then(search => {
            // console.log(search);

            const allWords = search.data;
            console.log(allWords);

            const filterWords = allWords.filter(word =>
                word.word.toLowerCase().includes(searchValue));


            displayLevelWord(filterWords);
        })
})
