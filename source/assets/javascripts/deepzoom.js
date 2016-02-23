//= require vendor/leaflet
//= require vendor/underscore-min

// Deep Zoom Class
// ----------------------------------------------------------------------------
function DeepZoom(catnum, zoomData) {
  this.baseurl = "http://gettypubs.github.io/maptiles/mosaics/";
  this.bounds  = {};
  this.cat     = catnum;
  this.height  = zoomData.height;
  this.map     = {};
  this.maxZoom = zoomData.max_zoom;
  this.minZoom = 2;
  this.width   = zoomData.width;

  // Run on instantiation
  this.init();
  this.addTiles();
}

DeepZoom.prototype = {
  init: function() {
    // Create map
    this.map = L.map('plate', {
      maxZoom: this.maxZoom,
      minZoom: this.minZoom,
      crs: L.CRS.Simple,
      attributionControl: false
    }).setView([0, 0], this.maxZoom);
    // Set bounds
    this.bounds = new L.LatLngBounds(
      this.map.unproject([0, this.height], this.maxZoom),
      this.map.unproject([this.width, 0], this.maxZoom)
    );
    this.map.fitBounds(this.bounds);
    this.map.scrollWheelZoom.disable();
  },
  addTiles: function() {
    L.tileLayer(this.baseurl + this.cat + "/{z}/{x}/{y}.png",
      {
        bounds: this.bounds,
        errorTileUrl: "/mosaics/assets/images/empty.png",
        maxZoom: this.maxZoom,
        minZoom: this.minZoom,
        noWrap: true,
        tms: false
      }
    ).addTo(this.map);
  }
};
