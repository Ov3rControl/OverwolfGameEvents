define(["../scripts/services/drag-service.js"], function (DragService) {
  class SampleAppView {
    constructor() {

      // Inittialize
      this.init();
    }

    init() {

    }

    _showExitMinimizeModal() {
      this._modal.style.display = "block";
    }

    _hideExitMinimizeModal() {
      this._modal.style.display = "none";
    }
  }

  return SampleAppView;
});