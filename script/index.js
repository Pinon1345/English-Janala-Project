// console.log("Hello World");

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

const loadLevelWord = (id) => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(json => {
            displayLevelWord(json.data);
        })
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
                <button class="btn btn-soft bg-[#1A91FF10] hover:bg-[#1A91FF70]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn btn-soft bg-[#1A91FF10] hover:bg-[#1A91FF70]"><i class="fa-solid fa-volume-high"></i></button>
                

            </div>

        </div>
        
        `



        // 4. append child

        wordContainer.appendChild(card);
    }

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
                <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
                <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
                </button>
            
            `

        // 4. append child

        levelContainer.appendChild(btnDiv);
    }

}



loadLessons();
