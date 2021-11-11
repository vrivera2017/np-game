// This class helps you keep a tile of images around some moving point.
// The idea is to move the images around as the point moves,
// but not to have any in-frame images move.
class InfiniteBackground {
  constructor(key, cam_width, cam_height) {
    // This is a string: the key to the image that we're tiling.
    this.key = key;
    this.cam_height = cam_height;
    this.cam_width = cam_width;

    // The number of images to render to the right of the center one
    this.r_horizontal = 0; // reset on img load
    // The number of images to render above of the center one
    this.r_vertical = 0; // reset on img load
    // Each image has tiling-based coordinates.
    // tile_x in {-r_horizontal, .., r_horizontal}
    // tile_y in {-r_horizontal, .., r_horizontal}
    // Map (tile_x, tile_y) -> image object
    this.images = {};
  }

  // Create the initial tiling of images, centered aroudn (x,y)
  // Call this during scene creation
  createImages(scene, x, y) {
    this.center = scene.add.image(x,y,this.key);
    this.images[JSON.stringify([0,0])] = this.center;
    this.img_height = this.center.height;
    this.img_width = this.center.width;

    // Compute the radius of the tiling
    this.r_horizontal = Math.round(this.cam_width / this.img_width / 2) + 1;
    this.r_vertical = Math.round(this.cam_height / this.img_height / 2) + 1;

    // Create all the images
    for (let tile_x = -this.r_horizontal; tile_x <= this.r_vertical; tile_x++) {
      for (let tile_y = -this.r_vertical; tile_y <= this.r_vertical; tile_y++) {
        if (tile_x != 0 || tile_y != 0) {
          const xx = tile_x * this.img_width + x;
          const yy = tile_y * this.img_height + y;
          const tile = scene.add.image(xx,yy,this.key);
          this.images[JSON.stringify([tile_x,tile_y])] = tile;
        }
      }
    }
  }


  // Potentially re-center the tiling around (x, y)
  // Call this during scene update
  updateImages(x, y) {
    const w = this.center.width;
    const h = this.center.height;
    const cx = this.center.x;
    const cy = this.center.y;
    if (
      x > cx + w/2 ||
      x < cx - w/2 ||
      y > cy + h/2 ||
      y < cy - h/2) {
      const deltaX = x - cx;
      const relativeDeltaX = deltaX / w;
      const roundedRDX = Math.round(relativeDeltaX);
      const new_x = roundedRDX * w + cx;
      const deltaY = y - cy;
      const relativeDeltaY = deltaY / h;
      const roundedRDY = Math.round(relativeDeltaY);
      const new_y = roundedRDY * h + cy;
      for (let key in this.images) {
        const [tile_x, tile_y] = JSON.parse(key);
        this.images[key].x = new_x + tile_x * w;
        this.images[key].y = new_y + tile_y * h;
      }
    }
  }

}