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

    this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

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
  update(time, delta_ms) {
    let pixels_per_ms = 0.5;
    if(this.key_A.isDown)
      this.image.x -= pixels_per_ms * delta_ms;
    if(this.key_D.isDown)
      this.image.x += pixels_per_ms * delta_ms;
    if(this.key_W.isDown)
      this.image.y -= pixels_per_ms * delta_ms;
    if(this.key_S.isDown)
      this.image.y += pixels_per_ms * delta_ms;
  }
}