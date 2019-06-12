var dugme = document.getElementsByTagName("button");
var vreme = document.getElementById("timeLabel");
var tabla = document.getElementById('tabla');
var fname = document.getElementById('fname');
var points =document.getElementById('pts');
var score = 0;
var polje, front, back;
var initArray= [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
var arrayValue = [];
var arrayDraw = [];
var testClicks=0;
var move_allowed = 0;
var game_on=0;
var time_remaining = 0;
points.innerHTML = score;


function kreirajPolje(a){
	polje = document.createElement("div");
	polje.setAttribute('class', 'box');
  polje.setAttribute("data-selected", 0)
	front = document.createElement("div");
	front.setAttribute('class', 'front');
	front.innerHTML ="?";
	polje.appendChild(front);
	back = document.createElement("div");
	back.setAttribute('class', 'back');
	back.innerHTML= a;
	polje.appendChild(back);
  tabla.appendChild(polje);
  return polje;
}

function pokreniTajmer()
{
  if(game_on == 0)
    return;

   
  vreme.innerHTML = time_remaining;

  // Ako vreme nije isteklo...
  if(time_remaining != 0)
  {
    time_remaining--; // Smanjuje se broj sekundi do kraja

    setTimeout(pokreniTajmer, 1000); 
  }
  else // ako vreme jeste isteklo
  {
    alert("Vreme je isteklo");
    game_on = 0;
    dugme[0].disabled = false;
  }
}


function iscrtajTablu(){
  tabla.innerHTML="";
  arrayValue =initArray.slice(0, 16);
  console.log(arrayValue);
	for (var i = 0; i < 16; i++) {
		var rand=Math.floor(Math.random()*arrayValue.length);
		var t= arrayValue[rand];
		arrayValue.splice(rand,1);
		kreirajPolje(t);
		polje.addEventListener('click', obradaKlika);
	}
}

function release(){
    if(fname.value.trim().length > 0){
      fname.style.border = 'none';
      dugme[0].disabled = false;
    }else{
      dugme[0].disabled = true;
    }
  
}
function pocinje(){
	dugme[0].innerHTML = "Nova igra";
	dugme[0].disabled = true;
  move_allowed = 1;
  game_on= 1;
  time_remaining = 60;
  score = 0;
  points.innerHTML = "0";
	iscrtajTablu();
  pokreniTajmer();
	//game();
}



var boxes= document.getElementsByClassName('box');
var the_end = 0;

	
   function obradaKlika(){
   
     //console.log(game_on,move_allowed, this.getAttribute("data-selected"));
    if((game_on == 1) && (move_allowed == 1) && (this.getAttribute("data-selected") == 0)){  

     arrayDraw.push(this); // "this" je ono na sta smo kliknuli
            
        testClicks++;
        
           this.getElementsByClassName('front')[0].style.visibility = "hidden";
           this.getElementsByClassName('front')[0].style.transition = "0.1s";

           /* sledeca 2 reda su za slucaj da neko preferira znakove. Ja bih igrao sa brojevima */
          // var urlLocation = 'url("img/'+this.getElementsByClassName("back")[0].innerHTML+'.png")'
          // this.style.backgroundImage = urlLocation;
		  this.getElementsByClassName('back')[0].style.visibility = "visible";
        
           this.setAttribute("data-selected",1);  //da ne bi moglo dvaput da se klikne na isto polje. Neznamkako je Danilo to resio
          
           if(testClicks ===2)
           {  //sme da se klikne samo dvaput
           //move_allowed=0; // iskljucujemo klik na kvadratice jer smo vec kliknuli na 2
            if (arrayDraw[0].getElementsByClassName("back")[0].innerHTML === arrayDraw[1].getElementsByClassName("back")[0].innerHTML)
            {
               
               the_end++;
               score +=10;
               points.innerHTML = score;
               if(the_end==8){ setTimeout(function(){ alert("POBEDA!!!"); }, 500);dugme[0].disabled = false;}
               testClicks=0;
               move_allowed=1;
               arrayDraw.length=0;
              
             }else{
              // alert('nisu iste');
               move_allowed=0;
               setTimeout(function(){
                
                  
               arrayDraw[0].getElementsByClassName('front')[0].style.visibility = "visible";
               arrayDraw[0].getElementsByClassName('front')[0].style.transition = "0.1s";
               arrayDraw[0].getElementsByClassName('back')[0].style.visibility = "hidden";
                arrayDraw[1].getElementsByClassName('front')[0].style.visibility = "visible";
               arrayDraw[1].getElementsByClassName('front')[0].style.transition = "0.1s";
               arrayDraw[1].getElementsByClassName('back')[0].style.visibility = "hidden";
               move_allowed=1;
                arrayDraw[0].setAttribute("data-selected",0); 
                arrayDraw[1].setAttribute("data-selected",0); 
               arrayDraw.length=0; //da nismo ispraznili ovaj array polja bi mogla da se otvaraju jer testiramo samo prva 2 otvorena
               testClicks=0;
               },800); 
                
            }
          }
        }
    		
      };
    	
   