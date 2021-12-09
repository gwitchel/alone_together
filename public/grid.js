
class Sqr{
    constructor(x, y) {
        this.x = x;
        this.y = y; 
        this.min_d = 7;
        this.max_d = 20; 
        this.diameter = this.min_d; 
      //  this.colors = [ "#4CC9F0","#4895EF","#4361EE","#3F37C9","#3A0CA3","#480CA8","#560BAD","#7209B7","#B5179E","#F72585","#fa7cb5","#fb92c2", ]
        this.colors = ["#ffb3ba","#FFBEBA","#FFC9BA","#FFD4BA", "#ffdfba","#FFE7BA","#FFEFBA","#FFF7BA","#ffffba","#EEFFBE","#DDFFC2","#CBFFC5","#baffc9","#BAF8D7","#BAF0E4","#BAE9F2","#bae1ff"]
       // this.colors = this.colors.reverse(); // reverse the colors for asthetic
        this.excitment = 0;
        this.fill = this.colors[this.excitment]
    }

    show(){
        noStroke();
        fill(this.fill)
        rect(this.x,this.y,this.diameter,this.diameter,this.diameter/2)

    }
    update(points){
        /* takes in a set of points (the face) and 
        updates the excitment score of each square 
        accordingly */ 
        for (let i = 0; i < points.length; i++) {
            if (abs(this.x - points[i]._x) < 10 && abs(this.y-points[i]._y) < 10) this.incrementColor(random(-0.4,4))
        }
    }

    incrementColor(amount){
        this.excitment += amount;
        this.diameter += amount; 
        if (round(this.diameter) > this.max_d) this.diameter = this.max_d
        if (round(this.diameter) < this.min_d) this.diameter = this.min_d
        if (round(this.excitment) >= this.colors.length) this.excitment = this.colors.length-1
        if (round(this.excitment) < 0 ) this.excitment = 0 
        this.fill = this.colors[round(this.excitment)]
    }

}

function drawGrid(squareArr){
    for(var i = 0; i < squareArr.length; i++)  squareArr[i].show();
}

function updateGrid(face,squareArr){
    for(var i = 0; i < squareArr.length; i++){
        squareArr[i].update(face)
        squareArr[i].incrementColor(-0.2)
    }
    return squareArr
}
