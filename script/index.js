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
                <button class="btn btn-outline btn-primary">
                <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
                </button>
            
            `

        // 4. append child

        levelContainer.appendChild(btnDiv);
    }

}



loadLessons();
