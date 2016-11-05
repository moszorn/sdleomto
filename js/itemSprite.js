class SlotItem extends cc.Sprite{
    ctor(name){
        super.ctor();
        this.itemName = name;
        this.action = (()=>{
            const frames = [];
            for(let i = 0 ; i < 60 ; i++)
                frames.push(cc.spriteFrameCache.getSpriteFrame(`${this.itemName + (i<10?"0"+i:i.toString())}`));

            const animation = new cc.Animation(frames,0.02);
            return new cc.Animate(animation);
        })();
        let randomInt = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        this.scheduleOnce(()=>this.runAction(this.action),0);

        const time = randomInt(0,10);

        this.schedule(
            ()=>this.runAction(this.action),
            randomInt(3,10),
            (new cc.ActionInterval(0)).repeatForever(),
            0);
    }
}

