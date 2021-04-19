class BOID {
    constructor () {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2,5))
        this.acceleration = createVector(0,0);
        this.color = `rgb(${int(random(255))},${int(random(255))},${int(random(255))})`
        this.size = 5;
        this.angle = 0;
        this.MAX_FORCE = 1;
        this.MAX_SPEED = 4;
    }

    EDGES () {
        if (this.position.x < 0) {
            this.position.x = width;
        }
        if (this.position.x > width) {
            this.position.x = 0;
        }
        if (this.position.y < 0) {
            this.position.y = height;
        }
        if (this.position.y > height) {
            this.position.y = 0;
        }
    }

    ALIGNMENT(boids) {

        let RANGE = ALIGNMENT_RANGE;
        let TARGET = createVector();
        let LENGTH = 0;
        for (let boid of boids) {
            let DISTANCE = dist(this.position.x, this.position.y, boid.position.x, boid.position.y);
            if (boid != this && DISTANCE < RANGE) {
                TARGET.add(boid.velocity)
                LENGTH++;
            }
        }
        if (LENGTH > 0) {
            TARGET.div(LENGTH);
            TARGET.setMag(this.MAX_SPEED)
            TARGET.sub(this.velocity);
            TARGET.limit(this.MAX_FORCE);
           
        }

        return TARGET

    }

    COHESION(boids) {

        let RANGE = COHESION_RANGE;
        let TARGET = createVector();
        let LENGTH = 0;
        for (let boid of boids) {
            let DISTANCE = dist(this.position.x, this.position.y, boid.position.x, boid.position.y);
            if (boid != this && DISTANCE < RANGE) {
                TARGET.add(boid.position)
                LENGTH++;
            }
        }
        if (LENGTH > 0) {
            TARGET.div(LENGTH);
            TARGET.sub(this.position);
            TARGET.setMag(1)
            TARGET.sub(this.velocity);
            TARGET.limit(this.MAX_FORCE);
           
        }

        return TARGET

    }

    SEPARATION(boids) {

        let RANGE = SEPARATION_RANGE;
        let TARGET = createVector();
        let LENGTH = 0;
        for (let boid of boids) {
            let DISTANCE = dist(this.position.x, this.position.y, boid.position.x, boid.position.y);
            if (boid != this && DISTANCE < RANGE) {
                let DIFF = p5.Vector.sub(this.position, boid.position);
                DIFF.div(DISTANCE)
                TARGET.add(DIFF)
                LENGTH++;
            }
        }
        if (LENGTH > 0) {
            TARGET.div(LENGTH);
            TARGET.setMag(this.MAX_SPEED)
            TARGET.sub(this.velocity);
            TARGET.limit(this.MAX_FORCE);
           
        }

        return TARGET

    }

    FLOCK(boids) {
        let ALIGNMENT = this.ALIGNMENT(boids);
        let COHESION = this.COHESION(boids);
        let SEPARATION = this.SEPARATION(boids);
        this.acceleration.add(ALIGNMENT);
        this.acceleration.add(COHESION);
        this.acceleration.add(SEPARATION);
    }

    UPDATE () {
    
        this.velocity.add(this.acceleration)
        this.position.add(this.velocity);
        this.velocity.limit(this.MAX_SPEED)

    }

    RENDER () {
        push();
        this.angle = this.velocity.heading() + PI / 2;
        translate(this.position.x, this.position.y);
        rotate(this.angle);
        fill(this.color);
        noStroke();
        beginShape();
        vertex(0, -this.size * 2);
        vertex(-this.size, this.size * 2);
        vertex(this.size, this.size * 2);
        endShape(CLOSE);
        pop();        
    }
}