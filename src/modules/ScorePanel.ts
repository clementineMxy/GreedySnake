//记分牌类
class ScorePanel{
    score=0;
    level=1;
    scoreEle:HTMLElement;
    levelEle:HTMLElement;

    //最高等级限制
    maxLevel:number;
    //每获得多少分升级
    upScore:number;

    constructor(maxLevel:number=10,upScore:number=10){
        this.scoreEle=document.getElementById("score")!;
        this.levelEle=document.getElementById("level")!;
        this.maxLevel=maxLevel;
        this.upScore=upScore;
    }
    //加分方法
    addScore(){
        this.scoreEle.innerHTML=++this.score+'';
        //判断分数是否升级
        if(this.score % this.upScore==0){
            this.levelUp();
        }
    }
    //升级方法
    levelUp(){
        if(this.level<this.maxLevel){
        this.levelEle.innerHTML=++this.level + '';
        }
    }
}

export default ScorePanel;