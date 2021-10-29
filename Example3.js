class Example3 extends Phaser.Scene{
  constructor(){
    super({key:"Example3"});
  }
  preload(){
    this.load.audio('audio',['assets/angry-meow.mp3']);
  }
  create(){
    this.soundFX = this.sound.add("audio", {loop: "true"});
    this.soundFX.play();
    this.soundFX.rate = 0.75; 

    this.input.keyboard.on('keydown-L', function(e){
      this.soundFX.loop = !this.soundFX.loop; 
      if(this.soundFX.loop) 
        this.soundFX.play();
    }, this);

    this.input.keyboard.on("keydown-P", function(e){
      if(this.soundFX.isPlaying)
        this.soundFX.pause();
      else  
        this.soundFX.resume();
    },this); 
  }
}