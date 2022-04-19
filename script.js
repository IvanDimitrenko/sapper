(function (){



    window.addEventListener('load',function(){

        var     height_config   =       document.getElementsByClassName('config')[0],
                height          =       null,
                
                width_config    =       document.getElementsByClassName('config')[1],       
                width           =       null,       
                
                mines_config    =       document.getElementsByClassName('config')[2],
                mines_count     =       null,
                mines           =       10,
                
                table           =       document.createElement('div'),
                body            =       document.getElementsByTagName('body')[0],
                play_button     =       document.getElementById('play'),
                manu            =       document.getElementsByClassName('menu')[0],
                table_arr       =       null
                
        table.classList.add('table');

        height_config.addEventListener('click', function (e) {
            console.log('height >> ' + e.target.value);
        });
        width_config.addEventListener('click', function (e) {
            console.log('width >> ' + e.target.value);
        });
        mines_config.addEventListener('click', function (e) {
            console.log('mines >> ' + e.target.value);
        });

        play_button.addEventListener('click', function (e) {

            body.removeChild(body.children[0]);

            if (Number(height_config.value) * Number(width_config.value) < Number(mines_config.value)) {
                mines_config.value = (Number(height_config.value) * Number(width_config.value)) / 2
            }
            height = Number(height_config.value);
            width = Number(width_config.value);
            mines_count = Number(mines_config.value);

            console.log(height, width, mines_count);
            body.append(table);

            rows = new Array(height);



            ////////////////////////////////CREATE FILD
            for (let i = 0; i < height; i++) {


                table[i] = document.createElement('div');
                table[i].classList.add('d-tr');
                table.appendChild(table[i]);
                for (let y = 0; y < width; y++) {

                    table[i][y] = document.createElement('div');
                    table[i][y].classList.add('d-td');
                    table[i][y].classList.add('not_pressed', 'cells');
                    table[i][y].innertHTML = 0;
                    table[i][y].tiltX = y;
                    table[i][y].tiltY = i;
                    table[i][y].addEventListener('click',  function(e){ click(e.target)})
                    table[i].append(table[i][y]);
                }

                console.dir(table);
            }
            ///////////////////////////////////////////////////////////////////////////


            // body.addEventListener('click',function(e){ show(e) })
            /////////////////////Spawn Mines///////////////////////////////////////////
            let x, y;
            for (let k = 0; k < mines_count; k++) {
                x = Math.floor(Math.random() * Math.floor(height));
                y = Math.floor(Math.random() * Math.floor(width));

                if ((x >= 0 && x <= height - 1) && (y >= 0 && y <= width - 1) && (table[x][y].innertHTML != mines)) {
                    table[x][y].innertHTML = mines;
                    ////////////////INCREMENT CELLS////////////////////////

                    for (let i = -1; i < 2; i++) {
                        for (let j = -1; j < 2; j++) {
                            if (x + i < 0 || x + i >= height || y + j < 0 || y + j >= width) continue;
                            if (table[x + i][y + j].innertHTML != mines) {
                                table[x + i][y + j].innertHTML++;
                            }
                        }
                    }
                    ////////////////////////////////////////////////////////
                }
            }
            ///////////////////////////////////////////////////////////////////////////////



        });


        function check(x, y) {
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (x + i > 0 && x + i < height && y + j > 0 && y + j < width) continue;
                    else return false;
                }
                return true;

            }
        }



            function click(e) {
                if (e.classList.contains('not_pressed')) {
                    e.classList.remove('not_pressed');
                    if (e.innertHTML == mines) {
                        e.classList.add('mines')
                    }

                    else if (e.innertHTML != 0 && e.innertHTML != 10) {
                        switch (e.innertHTML) {
                            case 1: {
                                e.classList.add('m1');
                                break
                            }
                            case 2: {
                                e.classList.add('m2');
                                break;
                            }
                            case 3: {
                                e.classList.add('m3');
                                break;
                            }
                            case 4: {
                                e.classList.add('m4');
                                break;
                            }
                            case 5: {
                                e.classList.add('m5');
                                break;
                            }
                            case 6: {
                                e.classList.add('m6');
                                break;
                            }
                            case 7: {
                                e.classList.add('m7');
                                break;
                            }
                            case 8: {
                                e.classList.add('m8');
                                break;
                            }
                        }

                    }
                    else{
                        let xx, yy;
                        for(let y = -1; y < 2 ; y++){
                            for(let x = -1; x < 2 ;x++){
                                xx = e.tiltX + x, yy = e.tiltY + y;
                                if(!(xx + x >= -1 && xx + x <= width && yy + y >= -1 && yy + y <= height) || !table[yy][xx].classList.contains('not_pressed'))continue;
                                     click(table[yy][xx]);    
                            }
                    }
                }
            }
        }

            
        


           


            function show(e) {
                add_number();
                for (let i = 0; i < height; i++) {

                    for (let y = 0; y < width; y++) {

                        if (table[i][y].classList.contains('not_pressed')) {

                            table[i][y].classList.remove('not_pressed');

                            if (table[i][y].innertHTML == mines) {
                                table[i][y].classList.add('mines')
                            } else {
                                table[i][y].classList.add('pressed');
                            }
                        }
                    }
                }
            }
            function add_number() {
                for (let i = 0; i < height; i++) {
                    for (let y = 0; y < width; y++) {
                        if (table[i][y].innertHTML != 0 && table[i][y].innertHTML != 10) {
                            switch (table[i][y].innertHTML) {
                                case 1: {
                                    table[i][y].classList.add('m1');
                                    break
                                }
                                case 2: {
                                    table[i][y].classList.add('m2');
                                    break;
                                }
                                case 3: {
                                    table[i][y].classList.add('m3');
                                    break;
                                }
                                case 4: {
                                    table[i][y].classList.add('m4');
                                    break;
                                }
                                case 5: {
                                    table[i][y].classList.add('m5');
                                    break;
                                }
                                case 6: {
                                    table[i][y].classList.add('m6');
                                    break;
                                }
                                case 7: {
                                    table[i][y].classList.add('m7');
                                    break;
                                }
                                case 8: {
                                    table[i][y].classList.add('m8');
                                    break;
                                }
                            }
                        }
                    }

                }
            }
            function mouse_down(e) {
                console.log('mouse_down');
                e.target.classList.remove('not_pressed');
                e.target.classList.add('pressed');
            }
            function mouse_up(e) {

                console.log('mouse_up');
                e.target.classList.remove('pressed');
                e.target.classList.add('not_pressed');

            }
        
    });

})(); 

/* if ( (x > 0 && x < height - 1) && (y > 0 && y < width - 1) ) {     
    if (table_arr[x-1][y].innertHTML != mines || table_arr[x-1][y-1].innertHTML  != mines || table_arr[x-1][y+1].innertHTML  != mines || 
      table_arr[x][y-1].innertHTML != mines ||  table_arr[x][y+1].innertHTML || 
      table_arr[x+1][y+1].innertHTML  != mines || table_arr[x+1][y-1].innertHTML != mines  ||  table_arr[x+1][y].innertHTML != mines)  {
        return true
    }  else return false
 }else return true        
 else if( (x == 0 || x == height - 1) && (y == 0 || y == width - 1)  ){      
 }*/