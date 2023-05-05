class Snake{
    //蛇的容器
    element:HTMLElement;
    head:HTMLElement;
    //整个🐍身体（包括头）
    bodies:HTMLCollection;

    constructor(){
        this.element=document.getElementById("snake")!;
        this.head=document.querySelector("#snake>div")!;
        this.bodies=this.element.getElementsByTagName("div");  
    }

    //获取蛇头坐标
    get X(){
        return this.head.offsetLeft;
    }
    get Y(){
        return this.head.offsetTop;
    }
    //设置蛇头坐标
    set X(X:number){
        if(this.X==X) return;
        //判断是否撞墙
        if(X < 0||X > 290){
            throw new Error("蛇撞墙了");
        }
        //若蛇第二节存在且第二节坐标等于第一节即将到达坐标，则让蛇继续按原方向运动
        if(this.bodies[1]&&(this.bodies[1] as HTMLElement).offsetLeft==X){
            if(X > this.X){
                X = this.X - 10;
            }
            else{
                X = this.X + 10;
            }
        }
        this.moveBody();
        this.head.style.left=X+'px';
        this.checkHeadBody();
        
    }
    set Y(Y:number){
        if(this.Y==Y) return;
        //判断是否撞墙
        if(Y < 0||Y > 290){
            throw new Error("蛇撞墙了");
        }
        //若蛇第二节存在且第二节坐标等于第一节即将到达坐标，则让蛇继续按原方向运动
        if(this.bodies[1]&&(this.bodies[1] as HTMLElement).offsetTop==Y){
            if(Y > this.Y){
                Y = this.Y - 10;
            }
            else{
                Y = this.Y + 10;
            }
        }
        this.moveBody();
        this.head.style.top=Y+"px";
        this.checkHeadBody();
        
    }


    addBody(){
        this.element.insertAdjacentHTML("beforeend","<div></div>");
    }
    //蛇身体移动
    //第n节移动到第n-1节的位置，第1节（蛇头）移动在run中实现
    moveBody(){
        for(let i=this.bodies.length - 1;i > 0;i--){
            let X=(this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y=(this.bodies[i-1] as HTMLElement).offsetTop;
            (this.bodies[i] as HTMLElement).style.left=X+'px';
            (this.bodies[i] as HTMLElement).style.top=Y+'px';
        }
    }

    //检查头和身体是否相撞
    checkHeadBody(){
        //获取所有身体，检查是否和头重合
        for(let i=1;i<this.bodies.length;i++){
            let body=this.bodies[i] as HTMLElement;
            if(this.X==body.offsetLeft && this.Y==body.offsetTop){
                throw new Error("撞到自己了");
            }
        }
    }
}

export default Snake;