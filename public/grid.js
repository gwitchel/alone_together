
class Sqr{
    constructor(x, y) {
        this.x = x;
        this.y = y; 
        this.diameter = 10; 
        this.min_d = 5;
        this.max_d = 15; 
        this.time_since_excitement = 0; 
        this.colors = ["#6699cc", "#4CC9F0","#4895EF","#4361EE","#3F37C9","#3A0CA3","#480CA8","#560BAD","#7209B7","#B5179E","#F72585"]
        this.excitment = 0;
        this.fill = this.colors[this.excitment]
    }

    show(){
        noStroke();
        fill(this.fill)
        rect(this.x,this.y,this.diameter,this.diameter)

    }
    update(points){
        /* takes in a set of points (the face) and 
        updates the excitment score of each square 
        accordingly */ 
        for (let i = 0; i < points.length; i++) {
            if (abs(this.x - points[i]._x) < 10 && abs(this.y-points[i]._y) < 10){
                console.log("OVERLAP")
                this.incrementColor(2)
            } 
        }
    }

    incrementColor(amount){
        this.excitment += amount;
        if (round(this.excitment) >= this.colors.length) this.excitment = this.colors.length-1
        if (round(this.excitment) < 0 ) this.excitment = 0 
        console.log("excitement",round(this.excitment))
        this.fill = this.colors[round(this.excitment)]
    }

}

function drawGrid(squareArr){
    for(var i = 0; i < squareArr.length; i++){

        squareArr[i].show();
    }
}

function updateGrid(face,squareArr){
    for(var i = 0; i < squareArr.length; i++){
        squareArr[i].update(face)
        squareArr[i].incrementColor(-0.2)
    }
    return squareArr
}
