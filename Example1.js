class Example1 extends Phaser.Scene {
  constructor(){
    super({key:"Example1"});
  }

  preload() {
    this.load.image('cat', 'assets/cat.png');
  }
  create() {
    this.image = this.add.image(400,300,'cat');
    
    this.input.keyboard.on('keyup-D', function(event){
      this.image.x +=10;
    }, this);

    this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A) 

    this.input.on('pointerdown', function(event){
      this.image.x = event.x; 
      this.image.y = event.y; 
    }, this);

    this.input.keyboard.on('keyup-P', function(event){
      var physicsImage = this.physics.add.image(this.image.x, this.image.y, 'cat');
      physicsImage.setVelocity(Phaser.Math.RND.integerInRange(-100,100), -300);
    }, this); 

    this.input.keyboard.on('keyup', function(e){
      if(e.key == "2") {
        this.scene.start("Example2");
      }

      if(e.key == "3") {
        this.scene.start("Example3");
      }
    }, this);

  }
  update(delta) {
    if(this.key_A.isDown)
      this.image.x--;
  }
}