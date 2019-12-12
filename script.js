
var score = document.getElementById('score');
var position = document.getElementsByClassName('carte');

//score.appendChild(CreateImg).src = carteImg[6];
var trouve = [];
var found = [];
var carteImg = ['carte1.png','carte1.png','carte2.png','carte2.png','carte3.png','carte3.png','carte4.png','carte4.png','carte5.png','carte5.png','carte6.png','carte6.png'];
var click = 0;

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

shuffle(carteImg);

for (let i = 0; i < position.length; i++) {

    position[i].addEventListener('click', function () {
        click += 1;
        this.src = carteImg[i];
        trouve.push(carteImg[i]);
        comparaison(i);
    });

}


function comparaison(i) {
    if (trouve[0] === trouve[1]) {
        alert('trouvé');
        found.push(trouve[0], trouve[1]);
        trouve = [];
        console.log(found)
    }


    for (let i = 0; i < trouve.length; i++)
    {
        if (carteImg != found)
        {
            position[i].src = 'doscarte.png';
            console.log(found)
        }

    }


    /*
    if (click === 2 ) {
        trouve = [];
        click = 0;
        alert('OO');
    }


}