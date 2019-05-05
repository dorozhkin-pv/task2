window.addEventListener('load', function(){
   
    let inp = document.querySelector('.inp');
    let form = document.querySelector('#form');
    let btn = document.querySelector('.go');
    let resBox = document.querySelector('.res');
    let letters = ['A','B','C','D','E','F','G','H'];
    let first;
    let second;


    function getCurrentPos() {
        let text = this.value;
        first = text.slice(0,1).replace(/[i-z I-Z 0-9]/gi, '').toUpperCase();   //Пока плохо дружу с регулярками
        second = text.slice(1,2).replace(/[^0-9.]/g, '');

        this.value = first + second;
    }

    inp.addEventListener('input', getCurrentPos);   //Правильный ввод
    
    form.addEventListener('submit', function(e){
        e.preventDefault();

        function getX() {
            for (let i = 0; i < letters.length; i++) {
                if (first == letters[i]) return ++i;
            }
        }
        let x = getX();
        let y = parseInt(second);

        function getPos(x, y) {
            let Pos = [[x-1, y-2],[x+1, y-2],[x+2, y-1],[x+2, y+1],[x+1, y+2],[x-1, y+2],[x-2, y+1],[x-2, y-1]]; //На этом строится все решение(смещения начальной точки)
            let positions = [];

            top:
            for (let i = 0; i < Pos.length; i++) {
                let mass = [];

                for (let j = 0; j < Pos[i].length; j++) {
 
                    if (Pos[i][j] <= 0 || Pos[i][j] > 8) continue top;
                    mass.push(Pos[i][j]);

                }

                if (mass.length == 2) {

                    for (let i = 0; i < letters.length; i++) {
                        if (mass[0] == i+1) mass[0] = letters[i];
                    }
                    positions.push(mass.join(''));
                }
            }

            //console.log(positions);
            return positions.join(' ');
        
        }

    	resBox.innerHTML = getPos(x,y);
    });



});

