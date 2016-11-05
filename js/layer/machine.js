
const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
},onlyFOrPoC="demo only";
class Machine extends cc.Layer{

    ctor(thisLayer){
        this.host = thisLayer;
        thisLayer.vx = randomInt(3,5);
        thisLayer.vy = randomInt(2,6);

        thisLayer.label = new cc.LabelTTF(onlyFOrPoC, "Arial", 42);
        thisLayer.label.setPosition(cc.p(cc.winSize.width / 2+25,cc.winSize.height / 2 + 250));
        thisLayer.label.setFontFillColor(cc.color(246, 246, 136, 0));
        thisLayer.lhw = thisLayer.label.getContentSize().width/2;
        thisLayer.lhh = thisLayer.label.getContentSize().height/2;
        thisLayer.addChild(thisLayer.label, 5);
        thisLayer.setAnchorPoint(0,0);

        thisLayer.machine = new cc.Sprite('#SlotMachine');
        thisLayer.machine.setPosition(cc.p(553, 311.5));
        thisLayer.addChild(thisLayer.machine);


        new ReelLayer(thisLayer);
        this.loadMachine();
        this.buildMachine(thisLayer.machine);

        thisLayer.settingBtn = new cc.Sprite('#setting_button');
        thisLayer.settingBtn.name = 'Setting Button';
        thisLayer.settingBtn.setPosition(cc.p(975 , 38));
        this.top_bar.addChild(thisLayer.settingBtn);
    }
    loadMachine(){
        this.top_bar = new cc.Sprite('#SlotTopBar');
        this.bonusBtn = new cc.Sprite('#bonus_button');
        this.level_title = new cc.Sprite('#level_title');
        this.level_bar_base = new cc.Sprite('#level_bar_base');
        this.level_bar_top_layer = new cc.Sprite('#level_bar_top_layer');
        this.level_bar = new cc.Sprite('#level_bar');
        this.credits_title = new cc.Sprite('#credits_title');
        this.credits_display_base = new cc.Sprite('#credits_display_base');
        this.credit_display_top_layer = new cc.Sprite('#credit_display_top_layer');
        this.coin_icon_static = new cc.Sprite('#coin_icon_static');
        this.buyBtn = new cc.Sprite('#buy_button');
        this.reel_top_layer = new cc.Sprite('#reel_top_layer');
        this.bet_title = new cc.Sprite('#bet_title');
        this.bet_display_base = new cc.Sprite('#bet_display_base');
        this.win_display_base = new cc.Sprite('#level_bar_base');
        this.minusBtn = new cc.Sprite('#minus_button');
        this.minusBtnActive = new cc.Sprite('#minus_button_active');
        this.minusBtnInactive = new cc.Sprite('#minus_button_gray');
        this.plusBtn = new cc.Sprite('#plus_button');
        this.plusBtnActive = new cc.Sprite('#plus_button_active');
        this.plusBtnInactive = new cc.Sprite('#plus_button_gray');
    }
    buildMachine(machine){

        this.reel_top_layer.setPosition(cc.p(552 , 335));
        machine.addChild(this.reel_top_layer,2);

        this.top_bar.setPosition(cc.p(552,574));
        this.top_bar.setTag(16);
        this.top_bar.setName('top bar');
        machine.addChild((this.top_bar));

        this.bonusBtn.setPosition(cc.p(222,38));
        this.top_bar.addChild(this.bonusBtn);

        this.level_bar_base.setPosition(cc.p(373 , 42));
        this.level_bar_base.setTag(17);
        this.level_bar_base.setName('level_bar_base');
        this.top_bar.addChild(this.level_bar_base);

        this.level_bar_top_layer.setPosition(cc.p(109,24));

        this.level_bar.setPosition(cc.p(134,26));
        this.level_bar.setTag(18);
        this.level_bar.setName('level bar');
        this.level_bar_base.addChild(this.level_bar);


        this.level_bar_base.addChild(this.level_bar_top_layer);

        this.level_title.setPosition(cc.p( 126,64 ));
        this.level_bar_base.addChild(this.level_title);


        this.credits_display_base.setPosition(cc.p(805, 42));
        this.credits_display_base.setTag(21);//16->21

        machine.$ = new cc.Sprite();
        machine.$.setPosition(cc.p(799, 42));


        this.top_bar.addChild(this.credits_display_base);
        this.top_bar.addChild(machine.$);

        this.credit_display_top_layer.setPosition(cc.p(126,23));
        this.credit_display_top_layer.setTag(31);//16->21-31
        this.credits_display_base.addChild(this.credit_display_top_layer);


        this.coin_icon_static.setPosition(cc.p(40,25));
        this.coin_icon_static.setTag(41);//16->21-31->41
        this.credit_display_top_layer.addChild(this.coin_icon_static);

        this.credits_title.setPosition(cc.p(108, 62));
        this.credits_display_base.addChild(this.credits_title);

        this.buyBtn.setPosition(cc.p(223,25));
        this.credit_display_top_layer.addChild(this.buyBtn);

        this.win_display_base.setPosition(cc.p(330 , -29));
        this.bet_display_base.setPosition(cc.p(554 , -21));
        this.bet_title.setPosition(cc.p(555 , -55));
        this.reel_top_layer.addChild(this.win_display_base);
        this.reel_top_layer.addChild(this.bet_display_base);
        this.reel_top_layer.addChild(this.bet_title);

        this.minusBtn.setPosition(cc.p(-24 , 11));
        this.plusBtn.setPosition(cc.p(153 , 11));
        this.bet_display_base.addChild(this.minusBtn);
        this.bet_display_base.addChild(this.plusBtn);
    }
}

function slotMachine(mainLayer){
    return new Machine(mainLayer);
}