import Snake from "./Snake"
import Food from "./Food"
import ScorePanel from "./ScorePanel"

//游戏控制器，控制其他所有类
class GameControl{
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;
    //存储蛇的移动方向
    direction: string= '';
    //游戏是否结束
    isLive = true;

    constructor(){
        this.snake=new Snake();
        this.food=new Food();
        this.scorePanel=new ScorePanel(10,2);

        this.init();

    }

    //游戏初始化
    init(){
        // 绑定键盘按键按下的事件
        //将键盘响应函数this绑定为gc对象
        document.addEventListener('keydown',this.keydownHandler.bind(this));
        this.run();
    }

    //键盘按下的响应函数
    keydownHandler(event: KeyboardEvent){
        this.direction= event.key;
        // console.log(this.direction);
        // this.run();
    }

    //蛇头移动方法
    run(){
        //获取蛇坐标
        let X = this.snake.X;
        let Y = this.snake.Y;
        switch(this.direction){
            case "ArrowUp":
            case "Up":
                Y-=10;
                break;
            case "ArrowDown":
            case "Down":
                Y+=10;
                break;
            case "ArrowLeft":
            case "Left":
                X-=10;
                break;
            case "ArrowRight":
            case "Right":
                X+=10;
                break;
        }

        this.checkEat(X,Y);

        try{
            this.snake.X=X;
            this.snake.Y=Y;
        }catch(e){
            const error=e as Error;
            alert(error.message+' Game Over! ');
            this.isLive=false;
        }
        

        if(this.isLive){
          //每次调用run都会在最后再次调用run，所以不用settimeinterval
          setTimeout(this.run.bind(this),300 - 30 * (this.scorePanel.level - 1));
        }
    }


    //检查是否吃到食物
    checkEat(X:Number, Y:number){
        if(X===this.food.X && Y===this.food.Y){
            this.food.change();
            this.scorePanel.addScore();
            this.snake.addBody();
        }
    }

}

export default GameControl;