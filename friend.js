class Friend {
    constructor(stream, id) {
        this.id = id;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.message = "hi";
        this.stream = stream;
    }

    update(x, y, z, message) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.message = message;
    }

    draw() {
        // push();
        // text(this.message, this.x, 200, this.z);
        // pop();
    }

    show() {

        //avatar draft
        push();
        translate(this.x, 300, this.z);
        noStroke();
        let avatarColor = color(`hsla(38, 42%,    ${Math.abs(sin(Date.now() / 2000) * 80)}%, 0.6)`);
        fill(avatarColor);
        rotateY(millis() / 1000);
        rotateX(PI / 2);
        rotateY(PI / 2);
        rotateZ(PI / 2);
        translate(0, Math.abs(sin(Date.now() / 1000) * 15), 0);
        cone(110, 190);
        pop();

        push();
        translate(0, -150, 0);
        translate(this.x, 300, this.z);
        translate(0, -Math.abs(sin(Date.now() / 1000) * 15), 0);
        noStroke();
        texture(this.stream);
        cylinder(80, 5);
        pop();


        push();
        translate(0, -90, 0);
        translate(this.x, 300, this.z);
        translate(0, -Math.abs(sin(Date.now() / 1000) * 15), 0);
        noStroke();
        let headColor = color(`rgb(255, 255, 255)`);
        fill(headColor);
        sphere(50);
        pop();

        push();
        textSize(25);
        translate(-493, -290, 700);
        rotateY(PI / 2);
        fill(187, 216, 221);
        text(this.message, 0, 0, 600, 300);
        pop();
    }
}