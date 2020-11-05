(function (){



    window.addEventListener('load',function(){

        var     height_config   =       document.getElementsByClassName('config')[0],
                height          =       null,
                
                width_config    =       document.getElementsByClassName('config')[1],       
                width           =       null,       
                
                mines_config    =       document.getElementsByClassName('config')[2],
                mines_count     =       null,
                mines           =       'm',
                
                table           =       document.createElement('div'),
                body            =       document.getElementsByTagName('body')[0],
                play_button     =       document.getElementById('play'),
                manu            =       document.getElementsByClassName('menu')[0],
                rows            =       null,
                cells           =       null,
                table_arr       =       null,

                logic_arr       =       null

                
        
        
            
            table.classList.add('table');

            height_config.addEventListener('click', function(e){
                console.log('height >> ' +  e.target.value);      
            });
            width_config.addEventListener('click', function(e){
                console.log('width >> ' + e.target.value);       
            });
            mines_config.addEventListener('click', function(e){
                console.log('mines >> ' + e.target.value);       
            });
            
            play_button.addEventListener('click', function(e){

            body.removeChild(body.children[0]);
            
            if( Number(height_config.value) *  Number(width_config.value) <  Number(mines_config.value) ){
                mines_config.value = (Number(height_config.value) *  Number(width_config.value) ) / 2
            }
            height = Number(height_config.value);
            width  = Number(width_config.value);
            mines_count  = Number(mines_config.value);

            game_start();
       


        });

        function game_start(){

            console.log(height, width, mines_count);
            body.append(table);
            
            rows = new Array(height);
            cells = new Array(width);

            table_arr = new Array(height);
            logic_arr = new Array(height)
            

            for(let i = 0 ; i < height ; i++) {

                table_arr[i] = new Array(width);
                logic_arr[i] = new Array(width);
                
                rows[i] = document.createElement('div');
                rows[i].classList.add('d-tr');
                table.appendChild(rows[i])

                for(let y = 0 ; y < width ; y++){

                    table_arr[i][y] = document.createElement('div');
                    table_arr[i][y].classList.add('d-td');
                    table_arr[i][y].classList.add('not_pressed');
                    table_arr[i][y].innertHTML = 0;
                    console.log(table_arr[i][y].innertHTML);
                 
                    table_arr[i][y].addEventListener('click',function(e){ click(e) })
                   
                    rows[i].appendChild(table_arr[i][y]);

                }
            }


            spawn_mines();
            add_number();
            body.addEventListener('click',function(e){ show(e) })

            /*console.dir(table_arr);
            console.dir(cells);
            console.dir(rows);*/

        } 

        function spawn_mines(){
                let x , y ;
             for(let i = 0 ; i < mines_count ; i++){
                x = Math.floor(Math.random() * Math.floor(height));
                y = Math.floor(Math.random() * Math.floor(width));
                if(table_arr[x][y].innertHTML != mines) {   
                    if(check(x,y)){
                         table_arr[x][y].innertHTML = mines;
                         add_number(x, y);
                        
                    }

              }
          }
            console.dir(logic_arr);

        }
        
        function add_number(x, y){

            for(let i = -1 ; i < 2 ; i++){
                for(let j = -1 ; j < 2 ; j++){
                    if(x + i < 0 || x + i >= height || y + j < 0 || y + j >= width )continue
                    if(table_arr[x + i][y + j].innertHTML != mines && (i + x != x && j + y != y ) )
                        table_arr[x + i][y + j].innertHTML++; 
                    }
                }
        }

        

        function check(x, y){

           /* if ( (x > 0 && x < height - 1) && (y > 0 && y < width - 1) ) {     
               if (table_arr[x-1][y].innertHTML != mines || table_arr[x-1][y-1].innertHTML  != mines || table_arr[x-1][y+1].innertHTML  != mines || 
                 table_arr[x][y-1].innertHTML != mines ||  table_arr[x][y+1].innertHTML || 
                 table_arr[x+1][y+1].innertHTML  != mines || table_arr[x+1][y-1].innertHTML != mines  ||  table_arr[x+1][y].innertHTML != mines)  {
                   return true
               }  else return false

            }else return true
            
            else if( (x == 0 || x == height - 1) && (y == 0 || y == width - 1)  ){

                    
            }*/

                if ( (x > 0 && x < height - 1) && (y > 0 && y < width - 1) ) {
                        for(let i = -1 ; i < 2 ; i++){
                            for(let j = -1 ; j < 2 ; j++){
                                if((i != 0 && j != 0 ) && table_arr[x + i][y + j].innertHTML != mines  )
                                    return true;
                                }
                            }
                        }
                        else return true;
            }
        
    
        
        function click(e) {

            if(e.target.classList.contains('not_pressed')){

                e.target.classList.remove('not_pressed');
   

                if(e.target.innertHTML == mines){
                  e.target.classList.add('mines')
                }else {
                    e.target.classList.add('pressed');
                }
            }                      
        }



        function show(e){
            for(let i = 0 ; i < height ; i++) {

                for(let y = 0 ; y < width ; y++){
                   
                    if(table_arr[i][y].classList.contains('not_pressed')){

                        table_arr[i][y].classList.remove('not_pressed');
        
                        if(table_arr[i][y].innertHTML == mines){
                            table_arr[i][y].classList.add('mines')
                        }else {
                            table_arr[i][y].classList.add('pressed');
                        }
                    }       
                }
            }
        }



        function mouse_down(e){
            console.log('mouse_down');
            e.target.classList.remove('not_pressed');
            e.target.classList.add('pressed');
        }

        function mouse_up(e){

          console.log('mouse_up');
          e.target.classList.remove('pressed');
          e.target.classList.add('not_pressed');

        }

      






    });

})();