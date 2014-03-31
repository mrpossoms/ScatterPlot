var QuadChart = function(id, config){
	if(!typeof(id)==='string' || !config){
		throw new UserException(
			'Must provide non null configuration object and vaild element id.'
		);
	}
	var viewCamera = QuadCamera(0, 0, 1);
	var data = QuadData(config);
	var view = QuadView(id, config, data, viewCamera);


	data.onBoundsChanged(function(){
		console.log('bounds changed');
		viewCamera.goHome(view.paper, data);
	});

	// construct the chart object, with references to
	// all it's consitituent objects
	var chart = {
		data: data,
		background: QuadBackground(id, config),
		axes: QuadAxes(id, config, data, viewCamera),
		view: view,
		camera: viewCamera,
		resize: function(){
			this.background.resize();
			this.axes.x.resize();
			this.axes.y.resize();
			this.view.resize();
		}
	};

	return chart;
}