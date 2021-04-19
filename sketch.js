let boids = [];
let SEPARATION_slider,ALIGNMENT_slider,COHESION_slider, UI_GAP,UI_WIDTH;

let SEPARATION_RANGE, ALIGNMENT_RANGE, COHESION_RANGE

function setup() {
	createCanvas(windowWidth, windowHeight);
	
	UI_GAP = 10;
	UI_WIDTH = floor((windowWidth - UI_GAP*5)/4)

	
	SEPARATION_slider = createSlider(0, 100, 50, 1);
	SEPARATION_slider.position(UI_GAP, windowHeight - 50);
	SEPARATION_slider.style('width', UI_WIDTH+'px');
	SEPARATION_RANGE = SEPARATION_slider.value();

	ALIGNMENT_slider = createSlider(0, 100, 100, 1);
	ALIGNMENT_slider.position(UI_GAP+UI_WIDTH+UI_GAP, windowHeight - 50);
	ALIGNMENT_slider.style('width',UI_WIDTH+'px');
	ALIGNMENT_RANGE = ALIGNMENT_slider.value();

	COHESION_slider = createSlider(0, 100, 40, 1);
	COHESION_slider.position(UI_GAP+UI_WIDTH+UI_GAP+UI_WIDTH+UI_GAP, windowHeight - 50);
	COHESION_slider.style('width', UI_WIDTH+'px');
	COHESION_RANGE = COHESION_slider.value();
	  
	ADD_button = createButton('Add Bird');
	ADD_button.position(windowWidth-UI_GAP-UI_WIDTH, windowHeight - 50);
	ADD_button.style('width', UI_WIDTH+'px');
	ADD_button.attribute('class', 'btn waves-effect waves-teal')
	ADD_button.mouseClicked(()=>{
		boids.push(new BOID())
	})

	for (let i = 0; i < floor(windowWidth/30); i++) {
		boids.push(new BOID());
	}
  	
}

function draw() {
	background('#e4e3e3');

	SEPARATION_RANGE = SEPARATION_slider.value();
	ALIGNMENT_RANGE = ALIGNMENT_slider.value();
	COHESION_RANGE = COHESION_slider.value();

	//text
	fill('black');
	textSize(14)
	text(`Separation range: ${SEPARATION_RANGE}`,SEPARATION_slider.x, SEPARATION_slider.y - UI_GAP*4, UI_WIDTH,UI_WIDTH)
	text(`Alignment range: ${ALIGNMENT_RANGE}`,ALIGNMENT_slider.x, ALIGNMENT_slider.y - UI_GAP*4,  UI_WIDTH,UI_WIDTH)
	text(`Cohesion range: ${COHESION_RANGE}`,COHESION_slider.x, COHESION_slider.y - UI_GAP*4,  UI_WIDTH,UI_WIDTH)
	text(`Number of Birds: ${boids.length}`,ADD_button.x, ADD_button.y - UI_GAP*4,  UI_WIDTH,UI_WIDTH)



	for (let boid of boids) {
		boid.EDGES();
		boid.UPDATE();
		boid.RENDER();
		boid.FLOCK(boids);
	}

}