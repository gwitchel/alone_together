
class Sqr{
    constructor(x, y) {
        this.x = x;
        this.y = y; 
        this.width = 10; 
        this.height = 10; 
        this.colors = ["#4CC9F0","#4895EF","#4361EE","#3F37C9","#3A0CA3","#480CA8","#560BAD","#7209B7","#B5179E","#F72585"]
        this.excitment = 0
        this.fill = this.colors[this.excitment]
    }

    show(){
        noStroke();
        fill(this.fill)
        rect(this.x,this.y,this.width,this.height)
    }
    update(points){
        /* takes in a set of points (the face) and 
        updates the excitment score of each square 
        accordingly */ 
        for (let i = 0; i < points.length; i++) {
            if (abs(this.x - points[i]._x) < 10 && abs(this.y-points[i]._y) < 10){
                console.log("OVERLAP")
                point(points[i]._x,points[i]._y)
                this.excitment += 1;
                if (this.excitment >= this.colors.length){
                    this.excitment = 0
                }
                this.fill = this.colors[this.excitment]
            }
        }
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
    }
    return squareArr
}
