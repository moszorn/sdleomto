
var SlotPoC = cc.Layer.extend({
    machine:null,label:null,
    slot1:null,slot2:null,slot3:null,
    zauthor:'happy.pithon@gmail.com',
    ctor:function () {
        this._super();
        var size = cc.winSize;

        this.setAnchorPoint(0,0);

        slotMachine(this);

        this.bindListener();

        let shakes = [];
        for(let i = 0 ; i < 5 ; i++){
            let isT = i%2===0;
            shakes.push(cc.scaleTo(0.1,isT?1:0.2,isT?1:0.2));
        }
        const a1 = this.machine.getChildByTag(16), a2 = a1.getChildByTag(17), level = a2.getChildByTag(18);
        const coin = a1.getChildByTag(21).getChildByTag(31).getChildByTag(41);
        coin.runAction(cc.sequence(shakes));
        level.runAction(cc.sequence(cc.tintTo(0,38, 39, 38),cc.tintBy(10,213, 212, 11)));

     var creditsArray = [],tempFrame = null;
        for(let i = 1 ; i < 10 ; i++)
            creditsArray.push(cc.spriteFrameCache.getSpriteFrame(`Number${i}.png`));

        const ani = new cc.Animation(creditsArray,0.2),
              mate = new cc.Animate(ani);

        this.machine.$.runAction(mate.repeatForever());

        this.scheduleUpdate();

       // return true;
    }
    ,
    bindListener(){
        this.bindSpinListener();
        this.bindSettingListener();
    },
    bindSpinListener(){
        this.spinBtn = new cc.MenuItemImage(
            '#spin_button',
            '#spin_button_active',
            '#spin_button_gray',
            this.startSpin,
            this
        );
        let spinMenu = new cc.Menu(this.spinBtn);
        spinMenu.setPosition(cc.p(798,73));
        this.machine.addChild(spinMenu,100);
    }
    ,
    bindSettingListener(){
        Setting_Mouse_Arg.target = this;
        const listener = cc.EventListener.create(Setting_Mouse_Arg);
        cc.eventManager.addListener(listener,this.settingBtn);
    }
    ,
    rellSpeed1:40,r1:0,
    rellSpeed2:40,r2:0,
    rellSpeed3:40,r3:0,
    rellLength:860,
    forward(){
        this.spinBtn.setEnabled(false);
        this.slot1.y += 5;
        this.slot2.y += 5;
        this.slot3.y += 5;
        this.rellSpeed1 = this.rellSpeed2 = this.rellSpeed3 = 39;
    },
    update1(dt){
        cc.audioEngine.playEffect(res.roll_eff);
        cc.audioEngine.setEffectsVolume(0.1);
        if(this.r1 % 25 === 0)
            this.rellSpeed1 -= 5;
        if(this.rellSpeed1 < 0) {
            this.rellSpeed1 = 0;
            this.scheduleOnce(()=> this.unschedule(this.update1), 0);
        }

        this.r1 += 1;

        if (this.slot1.y <= -this.rellLength)
            this.slot1.y = 0;

        this.slot1.y -= this.rellSpeed1;
    },
    update2(dt){

        if(this.r2 % 35 === 0)
            this.rellSpeed2 -= 5;
        if(this.rellSpeed2 < 0) {
            this.rellSpeed2 = 0;
            this.scheduleOnce(()=> this.unschedule(this.update2), 0);
        }

        this.r2 -= 1;

        if (this.slot2.y <= -this.rellLength)
            this.slot2.y = 10;


        this.slot2.y -= this.rellSpeed2;
    },
    update3(dt){
        if(this.r3 % 45 === 0)
            this.rellSpeed3 -= 5;
        if(this.rellSpeed3 < 0) {
            this.rellSpeed3 = 0;
            this.scheduleOnce(()=> this.unschedule(this.update3), 0);
            this.spinBtn.setEnabled(true);
        }

        this.r3 -= 1;

        if (this.slot3.y <= -this.rellLength)
            this.slot3.y = 10;

        this.slot3.y -= this.rellSpeed3;
    },
    startSpin(event){
        cc.audioEngine.playEffect(res.spin_eff);
      //  this.scheduleOnce(()=>cc.audioEngine.stopEffect(res.spin_eff),1);

        this.pause();
        this.schedule(this.forward ,0 , 30 , 0);
        this.schedule(this.update1 , 0 , cc.REPEAT_FOREVER, 0.3);
        this.schedule(this.update2 , 0 , cc.REPEAT_FOREVER, 1);
        this.schedule(this.update3 , 0 , cc.REPEAT_FOREVER, 1.2);
        this.resume();
    },

    update(r){

        let lx = this.label.getPositionX() , ly = this.label.getPositionY();
        if(lx - this.lhw <= 0 || lx +this.lhw > cc.winSize.width)this.vx *= -1;
        if(ly - this.lhh <= 0 || ly +this.lhh > cc.winSize.height)this.vy *= -1;
        this.label.setPosition(cc.p(lx+this.vx,ly+this.vy));
        this.label.setRotation(this.vy/2 * -this.vx/2);

    }
    ,
    isSettingWindowPop:false
    ,
    popSetting(){

        if(this.isSettingWindowPop) return;

       this.isSettingWindowPop = true;
       const thisLayer = this;
       const label = new cc.LabelTTF('Demo only','Verdana',8);

       const pop = new cc.Sprite( cc.textureCache.getTextureForKey(res.pop_background_png));
        pop.name = "Setting Pop Window";
               pop.setScale(0.001,0.001);

        label.setPosition(cc.p(pop.width/2,pop.height/2));
        pop.addChild(label);
        this.addChild(pop,100);

        let rote = cc.rotateBy(1,360),
            scal = cc.scaleBy(0.7,5004,5004),
            spawn = cc.spawn([rote,scal]),
            act = cc.sequence(spawn);
        speed = cc.speed(act,1);
        pop.runAction(speed);

        this.scheduleOnce(()=>{
            pop.runAction(speed.reverse());
            this.isSettingWindowPop = false;
        },2);

        const pop_window_touch_Arg = {
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            target: null,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var size = target.getContentSize();
                var rect = cc.rect(0, 0, size.width, size.height);
                if (!(cc.rectContainsPoint(rect, locationInNode))) {
                    return false;
                }
                target.setOpacity(180);
                return true;
            },
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();
                var delta = touch.getDelta();
                target.x += delta.x;
                target.y += delta.y;
            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
                target.opacity = 255;
            }
        }

        pop_window_touch_Arg.target = this;
        cc.eventManager.addListener(cc.EventListener.create(pop_window_touch_Arg),pop);

        pop.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));


    }
});


















































var HelloWorldScene = cc.Scene.extend({
    ctor:function(){
        this._super();
        cc.audioEngine.playMusic(res.bg_mp3);
    },
    onEnter:function () {

        this._super();

        //get ui location & position
        this.name = 'HelloWorldScene';
        this.setAnchorPoint(0.5,0.5);
       // this.ui();

        //preload plist
        this.loadPlist();

        //add layer
        //var layer = new BlackJack();
       // var layer = new BridgePoker();
        var layer = new SlotPoC();
        this.addChild(layer);
    }
    ,
    loadPlist(){
        cc.spriteFrameCache.addSpriteFrames(res.machine_plist,res.machine_PNG);
        cc.spriteFrameCache.addSpriteFrames(res.rell_plist,res.rell_PNG);
        cc.spriteFrameCache.addSpriteFrames(res.top_bar_plist,res.top_bar_PNG);
        cc.spriteFrameCache.addSpriteFrames(res.slot_assets_plist,res.slot_assets_PNG);
        cc.spriteFrameCache.addSpriteFrames(res.number_plist,res.number_PNG);


        cc.spriteFrameCache.addSpriteFrames(res.cherries_plist,res.cherries_PNG);
        cc.spriteFrameCache.addSpriteFrames(res.one_bars_plist,res.one_bars_PNG);
        cc.spriteFrameCache.addSpriteFrames(res.sevens_plist,res.sevens_PNG);
        cc.spriteFrameCache.addSpriteFrames(res.three_bars_plist,res.three_bars_PNG);
        cc.spriteFrameCache.addSpriteFrames(res.three_diamonds_plist,res.three_diamonds_PNG);
        cc.spriteFrameCache.addSpriteFrames(res.two_bars_plist,res.two_bars_PNG);
        cc.spriteFrameCache.addSpriteFrames(res.two_diamonds_plist,res.two_diamonds_PNG);

        cc.textureCache.addImage(res.pop_background_png);
        cc.textureCache.addImage(res.close_btn_png);
    },
    onExit: function () {
        cc.textureCache.removeAllTextures();
        cc.textureCache.dumpCachedTextureInfo();
        cc.Node.prototype.onExit.call(this);
    },
    ui(){
        const contentSize = this.getContentSize(),
            position = this.getPosition(),
            anchor = this.getAnchorPoint();
        const spriteNameColor='color:#fe9ad6',normalColor='color:#fff', valueColor = 'color:lightyellow';
        cc.log(`WinSize.width = ${cc.winSize.width} , WinSize.height = ${cc.winSize.height}
Sprite: %c${this.name}
 %clocat at %c(${position.x} , ${position.y})
 %csize  is %c${contentSize.width} x ${contentSize.height}
 %canchor at %c(${anchor.x} , ${anchor.y});
`,spriteNameColor,normalColor,valueColor,normalColor,valueColor,normalColor,valueColor);
    }
});

