document.addEventListener('mousemove', function (e) {
    var trail = document.createElement('div');
    trail.className = 'trail';
    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';
    document.body.appendChild(trail);

    setTimeout(function () {
        document.body.removeChild(trail);
    }, 50);
});

document.addEventListener('DOMContentLoaded', function () {
    fetch('../projects.json')
        .then(response => response.json())
        .then(projects => {
            const projectsContainer = document.getElementById('projects-container');
            projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                projectCard.innerHTML = `
                    <h3>${project.title}</h3>    
                    <img src="${project.image}" alt="${project.title}">
                    <p>${project.description}</p>
                    <a href="${project.link}" target="_blank">View Project</a>
                `;
                projectsContainer.appendChild(projectCard);
            });
        })
        .catch(error => console.error('Error:', error));
});

document.addEventListener('DOMContentLoaded', function () {
    const cylinder = document.getElementById('meme-cylinder');
    const memeFolder = '../Media/Memes/';
    const numberOfMemes = 4;

    for (let i = 0; i < numberOfMemes; i++) {
        const meme = document.createElement('div');
        meme.className = 'meme-image';
        meme.style.backgroundImage = `url(${memeFolder}meme${i + 1}.gif)`;
        meme.style.transform = `rotateY(${i * (360 / numberOfMemes)}deg) translateZ(100px)`;
        cylinder.appendChild(meme);
    }
});

function playSound(soundFile) {
    var filename = `../Media/Sounds/${soundFile}.mp3`;
    var sound = new Audio(filename);
    sound.currentTime = 0;
    sound.play();
}