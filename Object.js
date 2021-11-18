class Object {
  constructor(scene, key, size, x, y) {
    this.key = key;
    this.size = size;
    this.image = scene.add.image(x, y, key);
    const maxDim = Math.max(this.image.width, this.image.height);
    const scale = size / maxDim;
    this.image.setScale(scale);
  }
}