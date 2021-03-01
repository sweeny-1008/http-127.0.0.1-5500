class Game {
    constructor(){
    this.question = createElement("h2")

    this.input1  = createInput("Enter correct answer");
    this.button1 = createButton("Submit")
    
    this.A = createElement("h2");
    this.A.html("A. 2");

    this.B = createElement("h2");
    this.B.html("B. Window");

    this.C = createElement("h2");
    this.C.html("C. 11");

    this.D = createElement("h2");
    this.D.html("C. 3-1");
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();

        this.A.hide();
        this.B.hide();
        this.C.hide();
        this.D.hide();

      this.button1.hide();
      this.input1.hide();
      }
  
      
    }
  
    play(){
      form.hide();
      
      Player.getPlayerInfo();
      
      if(allPlayers !== undefined){
        background(rgb(198,135,103));

    
        
    this.question.html("What does 1 + 1 equal?")
    this.question.position(300, 100);

    this.A.show();
    this.A.position(200, 150);

    this.B.show();
    this.B.position(350, 150);

    this.C.show();
    this.C.position(200, 250);

    this.D.show();
    this.D.position(350, 250);

    this.input1.show();
    this.input1.position(200, 350);

    this.button1.show();
    this.button1.position(350, 350);
    }
      
    this.button1.mousePressed(()=>{

        //this.result1 = createElement("h2");
        //this.result1.html(this.name)
        //this.result1.position(200, 300)
      
        
        player.answer = this.input1.value();
      
        player.update();
        form.display();
        this.button1.hide();
        this.input1.hide();
        
        
      })
  
      if(player.answer != null){
        gameState = 2;
      }
     
      
    
    }
    
      end(){
      console.log("Game Ended");
      Player.getPlayerInfo();
      if(allPlayers !== undefined){
       var x = 20;
       var y = 300;

        for(var plr in allPlayers){

          index = index + 1;
  
          x = x + 100;
  
          
  
          if(rightA === allPlayers[plr].answer){
  
              fill("green")
              
          }
  
          else{
              fill("red")
             
          }
  
          text(allPlayers[plr].name + " : " + allPlayers[plr].answer, x, y);
  
      }
      }

     
    }
  
}