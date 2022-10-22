class Friend {
    constructor(stream, id) {
        this.id = id;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.stream = stream;
    }

    update(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    show() {

        //avatar draft
        push();
        translate(this.x, this.y, this.z);
        noStroke();
        let avatarColor = color(`hsla(38, 42%,    ${Math.abs(sin(Date.now() / 2000) * 80)}%, 0.6)`);
        fill(avatarColor);
        rotateY(millis() / 1000);
        rotateX(PI / 2);
        rotateY(PI / 2);
        rotateZ(PI / 2);
        translate(0, Math.abs(sin(Date.now() / 1000) * 15), 0);
        cone(60, 100);
        pop();


        push();
        translate(0, -50, 0);
        translate(this.x, this.y, this.z);
        translate(0, -Math.abs(sin(Date.now() / 1000) * 15), 0);
        noStroke();
        let headColor = color(`rgb(255, 255, 255)`);
        fill(headColor);
        sphere(30);
        pop();
    }
}